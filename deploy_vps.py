import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.api.app import app

if __name__ == '__main__':
    print("=== KEA BUSINESS INTELLIGENCE - VPS DEPLOY ===")
    print("Servidor rodando em todas as interfaces de rede")
    print("Portas disponiveis:")
    print("- http://0.0.0.0:5000 (Principal)")
    print("- http://localhost:5000 (Local)")
    print("- http://IP_DA_VPS:5000 (Externo)")
    print("")
    print("Endpoints disponiveis:")
    print("- GET  /api/test")
    print("- POST /api/auth/login")
    print("- POST /api/auth/validate")
    print("- GET  /api/sales-data")
    print("- GET  /api/top-products")
    print("- GET  /api/customer-metrics")
    print("- GET  /api/debug/routes")
    print("")
    
    # Configuração para produção
    app.config['DEBUG'] = False
    app.config['ENV'] = 'production'
    
    app.run(
        debug=False,
        host='0.0.0.0',  # Aceita conexões de qualquer IP
        port=5000,
        threaded=True    # Suporte a múltiplas conexões
    )