import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'HAWZX-AI Backend está funcionando'})

@app.route('/api/version', methods=['GET'])
def version():
    return jsonify({'version': '1.0.0'})

if __name__ == '__main__':
    debug = os.getenv('FLASK_DEBUG', 'False') == 'True'
    app.run(host='0.0.0.0', port=5000, debug=debug)
