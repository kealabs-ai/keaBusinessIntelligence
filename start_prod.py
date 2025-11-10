import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.api.app import app

if __name__ == '__main__':
    print("PRODUCAO - Porta 6000")
    print("Frontend: http://localhost:6000/")
    print("API: http://localhost:6000/api/test")
    print("Login: http://localhost:6000/api/auth/login")
    app.run(debug=False, host='0.0.0.0', port=6000)