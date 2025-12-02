from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import get_db
from models import Conversation, Message, User
from services.auth_service import token_required
from services.ai_service import ai_service
import uuid

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

@ai_bp.route('/chat', methods=['POST'])
@token_required
def chat(payload):
    try:
        data = request.json
        user_id = payload['user_id']
        message_content = data.get('message')
        conversation_id = data.get('conversation_id')
        
        if not message_content:
            return jsonify({'error': 'Message is required'}), 400
        
        db = next(get_db())
        
        # Criar ou obter conversa
        if conversation_id:
            conversation = db.query(Conversation).filter_by(
                id=conversation_id,
                user_id=user_id
            ).first()
        else:
            conversation = Conversation(user_id=user_id)
            db.add(conversation)
            db.commit()
        
        # Adicionar mensagem do usuário
        user_msg = Message(
            conversation_id=conversation.id,
            role='user',
            content=message_content
        )
        db.add(user_msg)
        db.commit()
        
        # Obter histórico de mensagens
        messages_history = db.query(Message).filter_by(
            conversation_id=conversation.id
        ).all()
        
        messages_for_api = [
            {'role': m.role, 'content': m.content}
            for m in messages_history
        ]
        
        # Obter resposta da IA
        ai_response = ai_service.get_completion(messages_for_api)
        
        if not ai_response['success']:
            return jsonify({'error': ai_response.get('error')}), 500
        
        # Adicionar resposta da IA
        assistant_msg = Message(
            conversation_id=conversation.id,
            role='assistant',
            content=ai_response['content'],
            tokens_used=ai_response.get('tokens_used', 0)
        )
        db.add(assistant_msg)
        
        conversation.message_count += 2
        conversation.updated_at = db.func.now()
        
        db.commit()
        
        return jsonify({
            'conversation_id': conversation.id,
            'message': ai_response['content'],
            'tokens_used': ai_response.get('tokens_used', 0)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/conversations', methods=['GET'])
@token_required
def get_conversations(payload):
    try:
        user_id = payload['user_id']
        db = next(get_db())
        
        conversations = db.query(Conversation).filter_by(
            user_id=user_id
        ).order_by(Conversation.updated_at.desc()).all()
        
        return jsonify([{
            'id': c.id,
            'title': c.title,
            'message_count': c.message_count,
            'created_at': c.created_at.isoformat(),
            'updated_at': c.updated_at.isoformat()
        } for c in conversations]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/conversations/<conversation_id>', methods=['GET'])
@token_required
def get_conversation(payload, conversation_id):
    try:
        user_id = payload['user_id']
        db = next(get_db())
        
        conversation = db.query(Conversation).filter_by(
            id=conversation_id,
            user_id=user_id
        ).first()
        
        if not conversation:
            return jsonify({'error': 'Conversation not found'}), 404
        
        messages = db.query(Message).filter_by(
            conversation_id=conversation_id
        ).all()
        
        return jsonify({
            'id': conversation.id,
            'title': conversation.title,
            'messages': [{
                'id': m.id,
                'role': m.role,
                'content': m.content,
                'created_at': m.created_at.isoformat()
            } for m in messages]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/conversations/<conversation_id>', methods=['DELETE'])
@token_required
def delete_conversation(payload, conversation_id):
    try:
        user_id = payload['user_id']
        db = next(get_db())
        
        conversation = db.query(Conversation).filter_by(
            id=conversation_id,
            user_id=user_id
        ).first()
        
        if not conversation:
            return jsonify({'error': 'Conversation not found'}), 404
        
        db.query(Message).filter_by(conversation_id=conversation_id).delete()
        db.delete(conversation)
        db.commit()
        
        return jsonify({'message': 'Conversation deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
