from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
from backend.data.connection import SQLServerConnection
from backend.data.mysql_connection import MySQLConnection
from backend.queries.sql_queries import SQLQueries
from backend.llm.analytics import AnalyticsLLM
from backend.auth.token_manager import TokenManager, token_required
from backend.api.auth_endpoints import auth_bp
import os
import hashlib

app = Flask(__name__, 
                    template_folder='../../frontend/build',
                    static_folder='../../frontend/build/static')
CORS(app)
analytics_llm = AnalyticsLLM()

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

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username e password requeridos'}), 400
    
    db = MySQLConnection()
    db.connect()
    
    try:
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        query = "SELECT id, payment_status FROM users WHERE username = %s AND password_hash = %s"
        result = db.execute_query(query, (username, password_hash))
        
        if not result:
            return jsonify({'error': 'Credenciais inválidas'}), 401
        
        user_id, payment_status = result[0]
        token_manager = TokenManager()
        token = token_manager.generate_token(user_id, payment_status)
        
        return jsonify({
            'token': token,
            'user_id': user_id,
            'payment_status': payment_status
        })
    finally:
        db.close()

@app.route('/api/auth/validate', methods=['POST'])
def validate_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'valid': False, 'error': 'Token não fornecido'}), 401
    
    if token.startswith('Bearer '):
        token = token[7:]
    
    token_manager = TokenManager()
    payload = token_manager.verify_token(token)
    
    if not payload:
        return jsonify({'valid': False, 'error': 'Token inválido'}), 401
    
    payment_status = token_manager.check_payment_status(payload['user_id'])
    
    return jsonify({
        'valid': True,
        'user_id': payload['user_id'],
        'payment_status': payment_status,
        'expires': payload['exp']
    })

@app.route('/api/auth/deactivate', methods=['POST'])
@token_required
def deactivate_user():
    data = request.get_json()
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'user_id requerido'}), 400
    
    db = MySQLConnection()
    db.connect()
    
    try:
        query = "UPDATE users SET payment_status = 'inactive' WHERE id = %s"
        success = db.execute_non_query(query, (user_id,))
        
        if success:
            return jsonify({'message': 'Usuário desativado com sucesso'})
        else:
            return jsonify({'error': 'Falha ao desativar usuário'}), 500
    finally:
        db.close()

@app.route('/estilos/<path:filename>')
def estilos(filename):
    return send_from_directory('../../frontend/estilos', filename)

@app.route('/javascript/<path:filename>')
def javascript(filename):
    return send_from_directory('../../frontend/javascript', filename)

@app.route('/api/sales-data')
@token_required
def get_sales_data():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_SALES_DATA, (start_date, end_date))
        data = [{'month': row[0], 'total_sales': row[1], 'transaction_count': row[2]} for row in results]
        return jsonify(data)
    finally:
        db.close()

@app.route('/api/top-products')
@token_required
def get_top_products():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_TOP_PRODUCTS, (start_date, end_date))
        data = [{'product': row[0], 'quantity': row[1], 'revenue': row[2]} for row in results]
        return jsonify(data)
    finally:
        db.close()

@app.route('/api/customer-metrics')
@token_required
def get_customer_metrics():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_CUSTOMER_METRICS, (start_date, end_date))
        data = {'total_customers': results[0][0], 'avg_order_value': results[0][1], 'total_revenue': results[0][2]}
        return jsonify(data)
    finally:
        db.close()

@app.route('/api/analyze-sales')
@token_required
def analyze_sales():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_SALES_DATA, (start_date, end_date))
        data = [{'month': row[0], 'total_sales': row[1], 'transaction_count': row[2]} for row in results]
        analysis = analytics_llm.analyze_sales_trend(data)
        return jsonify({'data': data, 'analysis': analysis})
    finally:
        db.close()

@app.route('/api/analyze-products')
@token_required
def analyze_products():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_TOP_PRODUCTS, (start_date, end_date))
        data = [{'product': row[0], 'quantity': row[1], 'revenue': row[2]} for row in results]
        insights = analytics_llm.generate_product_insights(data)
        return jsonify({'data': data, 'insights': insights})
    finally:
        db.close()

@app.route('/api/analyze-metrics')
@token_required
def analyze_metrics():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    db = SQLServerConnection()
    db.connect()
    
    try:
        results = db.execute_query(SQLQueries.GET_CUSTOMER_METRICS, (start_date, end_date))
        metrics = {'total_customers': results[0][0], 'avg_order_value': results[0][1], 'total_revenue': results[0][2]}
        interpretation = analytics_llm.interpret_metrics(metrics)
        return jsonify({'metrics': metrics, 'interpretation': interpretation})
    finally:
        db.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)