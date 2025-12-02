from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import get_db
from models import User, APIKey
from services.auth_service import hash_password, verify_password, create_token, token_required
import uuid

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not all([username, email, password]):
            return jsonify({'error': 'Missing fields'}), 400
        
        db = next(get_db())
        
        if db.query(User).filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409
        
        if db.query(User).filter_by(username=username).first():
            return jsonify({'error': 'Username already taken'}), 409
        
        user = User(
            username=username,
            email=email,
            password_hash=hash_password(password)
        )
        db.add(user)
        db.commit()
        
        return jsonify({
            'message': 'User registered successfully',
            'user_id': user.id
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({'error': 'Missing credentials'}), 400
        
        db = next(get_db())
        user = db.query(User).filter_by(email=email).first()
        
        if not user or not verify_password(password, user.password_hash):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        token = create_token(user.id, user.email)
        
        return jsonify({
            'access_token': token,
            'token_type': 'Bearer',
            'user_id': user.id,
            'username': user.username
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(payload):
    try:
        db = next(get_db())
        user = db.query(User).filter_by(id=payload['user_id']).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_active': user.is_active,
            'created_at': user.created_at.isoformat()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(payload):
    try:
        data = request.json
        db = next(get_db())
        user = db.query(User).filter_by(id=payload['user_id']).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        if 'username' in data:
            user.username = data['username']
        
        db.commit()
        
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
