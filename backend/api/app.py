from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
from backend.auth.token_manager import TokenManager, token_required
from backend.api.auth_endpoints import auth_bp
import os
import hashlib
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Detectar se está rodando em container
IS_CONTAINER = os.path.exists('/.dockerenv')

# Definir caminhos baseado no ambiente
if IS_CONTAINER:
    FRONTEND_BUILD_PATH = '/app/frontend/build'
    FRONTEND_STATIC_PATH = '/app/frontend/build/static'
else:
    FRONTEND_BUILD_PATH = '../../frontend/businessIntelligence/build'
    FRONTEND_STATIC_PATH = '../../frontend/businessIntelligence/build/static'

app = Flask(__name__, 
                    template_folder=FRONTEND_BUILD_PATH,
                    static_folder=FRONTEND_STATIC_PATH)
CORS(app)

# Registrar blueprint de autenticação
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/')
def index():
    try:
        return send_from_directory(FRONTEND_BUILD_PATH, 'index.html')
    except:
        return '<h1>Kea Business Intelligence</h1><p>Frontend em construção</p>'

@app.route('/dashboard')
def dashboard():
    try:
        return send_from_directory(FRONTEND_BUILD_PATH, 'index.html')
    except:
        return '<h1>Dashboard</h1><p>Frontend em construção</p>'

@app.route('/static/<path:filename>')
def static_files(filename):
    try:
        return send_from_directory(FRONTEND_STATIC_PATH, filename)
    except:
        return 'File not found', 404

@app.route('/<path:path>')
def catch_all(path):
    try:
        return send_from_directory(FRONTEND_BUILD_PATH, 'index.html')
    except:
        return '<h1>Kea Business Intelligence</h1><p>Página não encontrada</p>'

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



@app.route('/estilos/<path:filename>')
def estilos(filename):
    return send_from_directory('../../frontend/estilos', filename)

@app.route('/javascript/<path:filename>')
def javascript(filename):
    return send_from_directory('../../frontend/javascript', filename)

@app.route('/api/sales-data')
@token_required
def get_sales_data():
    # Mock data para teste
    return jsonify([
        {'month': '2024-01', 'total_sales': 15000, 'transaction_count': 120},
        {'month': '2024-02', 'total_sales': 18000, 'transaction_count': 145},
        {'month': '2024-03', 'total_sales': 22000, 'transaction_count': 180}
    ])

@app.route('/api/top-products')
@token_required
def get_top_products():
    # Mock data para teste
    return jsonify([
        {'product': 'Produto A', 'quantity': 50, 'revenue': 5000},
        {'product': 'Produto B', 'quantity': 35, 'revenue': 3500},
        {'product': 'Produto C', 'quantity': 28, 'revenue': 2800}
    ])

@app.route('/api/customer-metrics')
@token_required
def get_customer_metrics():
    # Mock data para teste
    return jsonify({
        'total_customers': 1250,
        'avg_order_value': 125.50,
        'total_revenue': 55000
    })

if __name__ == '__main__':
    port = int(os.getenv('SERVER_PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    environment = os.getenv('ENVIRONMENT', 'development')
    
    print(f"Servidor iniciando - {environment.upper()}...")
    print(f"API: http://0.0.0.0:{port}/api/test")
    print(f"Auth: http://0.0.0.0:{port}/api/auth/login")
    print(f"Frontend: http://0.0.0.0:{port}/")
    app.run(debug=debug, host='0.0.0.0', port=port)