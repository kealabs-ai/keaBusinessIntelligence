#!/usr/bin/env python3
import sys
import os
from dotenv import load_dotenv

# Adicionar o diretório raiz ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Carregar variáveis de ambiente
load_dotenv()

from backend.api.app import app

if __name__ == '__main__':
    # Configurações do ambiente
    port = int(os.getenv('SERVER_PORT', 6000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    environment = os.getenv('ENVIRONMENT', 'production')
    
    print(f"=== KEA BUSINESS INTELLIGENCE ===")
    print(f"Ambiente: {environment.upper()}")
    print(f"Porta: {port}")
    print(f"Debug: {debug}")
    print(f"Container: {os.path.exists('/.dockerenv')}")
    print(f"Frontend: http://0.0.0.0:{port}/")
    print(f"API: http://0.0.0.0:{port}/api/test")
    print(f"Login: http://0.0.0.0:{port}/api/auth/login")
    print("=" * 35)
    
    app.run(debug=debug, host='0.0.0.0', port=port)