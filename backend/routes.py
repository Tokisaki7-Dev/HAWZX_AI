from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'API de teste funcionando'})
