#!/usr/bin/env python3
import sys
import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import hashlib
import datetime
import base64

# Adicionar path do projeto
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

class KeaHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        
        if path == '/api/test':
            self.send_json({'status': 'success', 'message': 'API funcionando', 'version': '1.0'})
        elif path == '/api/debug/routes':
            routes = [
                {'endpoint': '/api/test', 'method': 'GET'},
                {'endpoint': '/api/auth/login', 'method': 'POST'},
                {'endpoint': '/api/sales-data', 'method': 'GET'},
                {'endpoint': '/', 'method': 'GET'}
            ]
            self.send_json({'routes': routes})
        elif path == '/api/sales-data':
            self.send_json([
                {'month': '2024-01', 'total_sales': 15000, 'transaction_count': 120},
                {'month': '2024-02', 'total_sales': 18000, 'transaction_count': 145}
            ])
        elif path == '/':
            self.send_html('<h1>Kea Business Intelligence</h1><p>API funcionando - Frontend em construção</p>')
        else:
            self.send_error(404, 'Endpoint não encontrado')
    
    def do_POST(self):
        path = urlparse(self.path).path
        
        if path == '/api/auth/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                username = data.get('username')
                password = data.get('password')
                
                # Validação simples para teste
                if username and password:
                    token = self.generate_token(1, 'active')
                    self.send_json({
                        'success': True,
                        'token': token,
                        'user_id': 1,
                        'payment_status': 'active'
                    })
                else:
                    self.send_json({'error': 'Username e password requeridos'}, 400)
            except Exception as e:
                self.send_json({'error': 'Dados inválidos'}, 400)
        else:
            self.send_error(404, 'Endpoint não encontrado')
    
    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def send_html(self, content, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(content.encode())
    
    def generate_token(self, user_id, payment_status):
        # Token simples para teste (sem JWT)
        payload = f"{user_id}:{payment_status}:{datetime.datetime.utcnow().isoformat()}"
        return base64.b64encode(payload.encode()).decode()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

if __name__ == '__main__':
    port = 5000
    server = HTTPServer(('0.0.0.0', port), KeaHandler)
    print(f"=== KEA BUSINESS INTELLIGENCE - SERVIDOR SIMPLES ===")
    print(f"Servidor rodando na porta {port}")
    print(f"URLs:")
    print(f"- http://0.0.0.0:{port}/api/test")
    print(f"- http://0.0.0.0:{port}/api/auth/login")
    print(f"- http://0.0.0.0:{port}/api/debug/routes")
    print("Pressione Ctrl+C para parar")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor parado")
        server.shutdown()