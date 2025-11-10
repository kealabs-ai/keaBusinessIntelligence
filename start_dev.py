import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.api.app import app

if __name__ == '__main__':
    print("DESENVOLVIMENTO - Porta 6002")
    print("Frontend: http://localhost:6002/")
    print("API: http://localhost:6002/api/test")
    print("Login: http://localhost:6002/api/auth/login")
    app.run(debug=True, host='0.0.0.0', port=6002)