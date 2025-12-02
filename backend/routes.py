from flask import Blueprint, jsonify, request
from models import Response

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/health', methods=['GET'])
def health():
    response = Response(
        success=True,
        message='HAWZX-AI Backend está funcionando',
        data={'status': 'online', 'timestamp': __import__('datetime').datetime.now().isoformat()}
    )
    return jsonify(response.to_dict())

@api_bp.route('/version', methods=['GET'])
def version():
    response = Response(
        success=True,
        data={'version': '1.0.0', 'name': 'HAWZX-AI'}
    )
    return jsonify(response.to_dict())

@api_bp.route('/info', methods=['GET'])
def info():
    response = Response(
        success=True,
        data={
            'name': 'HAWZX-AI',
            'version': '1.0.0',
            'description': 'Sistema Inteligente de Gerenciamento',
            'endpoints': {
                '/health': 'GET',
                '/version': 'GET',
                '/info': 'GET',
                '/projects': 'GET, POST',
                '/tasks': 'GET, POST'
            }
        }
    )
    return jsonify(response.to_dict())

@api_bp.route('/projects', methods=['GET', 'POST'])
def projects():
    if request.method == 'GET':
        response = Response(
            success=True,
            message='Projetos recuperados com sucesso',
            data={'projects': [], 'total': 0}
        )
    else:
        data = request.get_json()
        response = Response(
            success=True,
            message='Projeto criado com sucesso',
            data={'id': 1, 'name': data.get('name', 'Novo Projeto')}
        )
    return jsonify(response.to_dict())

@api_bp.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        response = Response(
            success=True,
            message='Tarefas recuperadas com sucesso',
            data={'tasks': [], 'total': 0}
        )
    else:
        data = request.get_json()
        response = Response(
            success=True,
            message='Tarefa criada com sucesso',
            data={'id': 1, 'title': data.get('title', 'Nova Tarefa')}
        )
    return jsonify(response.to_dict())

@api_bp.errorhandler(404)
def not_found(error):
    response = Response(
        success=False,
        message='Recurso não encontrado',
        status_code=404
    )
    return jsonify(response.to_dict()), 404

@api_bp.errorhandler(500)
def internal_error(error):
    response = Response(
        success=False,
        message='Erro interno do servidor',
        status_code=500
    )
    return jsonify(response.to_dict()), 500
