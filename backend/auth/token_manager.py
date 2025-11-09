import jwt
import datetime
from functools import wraps
from flask import request, jsonify
from backend.data.mysql_connection import MySQLConnection

class TokenManager:
    def __init__(self, secret_key='kea-bi-secret-key'):
        self.secret_key = secret_key
    
    def generate_token(self, user_id, payment_status='active'):
        payload = {
            'user_id': user_id,
            'payment_status': payment_status,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            'iat': datetime.datetime.utcnow()
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def verify_token(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def check_payment_status(self, user_id):
        db = MySQLConnection()
        db.connect()
        try:
            query = "SELECT payment_status FROM users WHERE id = %s"
            result = db.execute_query(query, (user_id,))
            return result[0][0] if result else 'inactive'
        finally:
            db.close()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token requerido'}), 401
        
        if token.startswith('Bearer '):
            token = token[7:]
        
        token_manager = TokenManager()
        payload = token_manager.verify_token(token)
        
        if not payload:
            return jsonify({'error': 'Token inválido'}), 401
        
        payment_status = token_manager.check_payment_status(payload['user_id'])
        if payment_status != 'active':
            return jsonify({'error': 'Algo deu erro, contato o administrador'}), 403
        
        request.current_user = payload
        return f(*args, **kwargs)
    
    return decorated