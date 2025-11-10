from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.auth.token_manager import TokenManager, token_required
from backend.api.auth_endpoints import auth_bp
import sys
import os

# Adicionar o diretório raiz ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

# Registrar blueprint de autenticação
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/api/test')
def test():
    return jsonify({'status': 'success', 'message': 'API funcionando corretamente', 'version': '1.0'})

@app.route('/api/debug/routes')
def debug_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append({
            'endpoint': rule.endpoint,
            'methods': list(rule.methods),
            'rule': str(rule)
        })
    return jsonify({'routes': routes})

if __name__ == '__main__':
    print("🚀 Iniciando servidor de teste na porta 5001...")
    print("📱 Frontend: http://localhost:5001/")
    print("🔌 API Test: http://localhost:5001/api/test")
    print("🔐 Login: http://localhost:5001/api/auth/login")
    print("📋 Routes: http://localhost:5001/api/debug/routes")
    app.run(debug=True, host='0.0.0.0', port=5001)