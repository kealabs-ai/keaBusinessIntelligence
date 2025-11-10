from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
from backend.auth.token_manager import TokenManager, token_required
from backend.api.auth_endpoints import auth_bp
import os
import hashlib

app = Flask(__name__, 
                    template_folder='../../frontend/build',
                    static_folder='../../frontend/build/static')
CORS(app)

# Registrar blueprint de autenticação
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/')
def index():
    return send_from_directory('../../frontend/build', 'index.html')

@app.route('/dashboard')
def dashboard():
    return send_from_directory('../../frontend/build', 'index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('../../frontend/build/static', filename)

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
    app.run(debug=True, host='0.0.0.0', port=5000)