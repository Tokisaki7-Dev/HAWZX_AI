import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from datetime import datetime

load_dotenv()

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Importar blueprints
from routes.api_routes import api_bp
from routes.auth_routes import auth_bp
from routes.ai_routes import ai_bp
from database import init_db

app = Flask(__name__)

# Configurações
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False') == 'True'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['JSON_SORT_KEYS'] = False

# CORS - permitir requisições cruzadas
CORS(app, resources={
    r'/api/*': {
        'origins': os.getenv('CORS_ORIGINS', '*').split(','),
        'methods': ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        'allow_headers': ['Content-Type', 'Authorization'],
        'supports_credentials': True,
        'max_age': 3600
    }
})

# Inicializar banco de dados
try:
    init_db()
    logger.info('✓ Database initialized')
except Exception as e:
    logger.error(f'✗ Database initialization failed: {e}')

# Registrar blueprints
app.register_blueprint(api_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(ai_bp)

# Rota raiz
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'service': 'HAWZX-AI',
        'version': '1.0.0',
        'status': 'online',
        'timestamp': datetime.utcnow().isoformat(),
        'endpoints': {
            'health': '/api/health',
            'info': '/api/info',
            'auth': '/api/auth',
            'ai': '/api/ai'
        }
    }), 200

# Tratamento de erros 404
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Not Found',
        'status': 404,
        'message': 'The requested resource was not found'
    }), 404

# Tratamento de erros 500
@app.errorhandler(500)
def internal_error(error):
    logger.error(f'Internal server error: {error}')
    return jsonify({
        'error': 'Internal Server Error',
        'status': 500,
        'message': 'An unexpected error occurred'
    }), 500

# Tratamento de exceções gerais
@app.errorhandler(Exception)
def handle_exception(error):
    logger.error(f'Unhandled exception: {error}')
    return jsonify({
        'error': 'Server Error',
        'status': 500
    }), 500

# Middleware de logging
@app.before_request
def log_request():
    logger.info(f'{request.method} {request.path}')

@app.after_request
def log_response(response):
    logger.info(f'Response: {response.status_code}')
    return response

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    debug = os.getenv('FLASK_DEBUG', 'False') == 'True'

    print('\n' + '='*50)
    print('🚀 HAWZX-AI Backend')
    print('='*50)
    print(f'📡 Host: {host}:{port}')
    print(f'🔍 Debug: {debug}')
    print(f'🌐 API: http://localhost:{port}/api')
    print(f'💬 AI Chat: http://localhost:{port}/api/ai/chat')
    print(f'🔐 Auth: http://localhost:{port}/api/auth')
    print('='*50 + '\n')

    app.run(host=host, port=port, debug=debug)
