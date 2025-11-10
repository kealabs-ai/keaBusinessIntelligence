from flask import Blueprint, request, jsonify
from backend.data.mysql_connection import MySQLConnection
from backend.auth.token_manager import TokenManager, token_required
import hashlib

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username e password requeridos'}), 400
    
    db = MySQLConnection()
    if not db.connect():
        return jsonify({'error': 'Erro de conexão com banco'}), 500
    
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
            'success': True,
            'token': token,
            'user_id': user_id,
            'payment_status': payment_status
        })
    finally:
        db.close()

@auth_bp.route('/validate', methods=['POST'])
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
    
    if payment_status != 'active':
        return jsonify({
            'valid': False, 
            'error': 'Pagamento pendente',
            'payment_status': payment_status
        }), 403
    
    return jsonify({
        'valid': True,
        'user_id': payload['user_id'],
        'payment_status': payment_status,
        'expires': payload['exp']
    })

@auth_bp.route('/deactivate', methods=['POST'])
@token_required
def deactivate_user():
    data = request.get_json()
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'user_id requerido'}), 400
    
    db = MySQLConnection()
    if not db.connect():
        return jsonify({'error': 'Erro de conexão com banco'}), 500
    
    try:
        query = "UPDATE users SET payment_status = 'inactive' WHERE id = %s"
        success = db.execute_non_query(query, (user_id,))
        
        if success:
            return jsonify({'message': 'Usuário desativado com sucesso'})
        else:
            return jsonify({'error': 'Falha ao desativar usuário'}), 500
    finally:
        db.close()