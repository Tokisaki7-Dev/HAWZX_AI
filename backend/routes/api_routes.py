from flask import Blueprint, jsonify
from services.auth_service import token_required
import os
from dotenv import load_dotenv

load_dotenv()

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'HAWZX-AI',
        'version': '1.0.0'
    }), 200

@api_bp.route('/info', methods=['GET'])
def info():
    return jsonify({
        'name': 'HAWZX-AI',
        'version': '1.0.0',
        'description': 'Advanced AI Conversational Platform',
        'endpoints': {
            'auth': '/api/auth',
            'ai': '/api/ai',
            'admin': '/api/admin'
        }
    }), 200

@api_bp.route('/status', methods=['GET'])
@token_required
def status(payload):
    return jsonify({
        'user_id': payload['user_id'],
        'authenticated': True,
        'service_status': 'operational'
    }), 200
