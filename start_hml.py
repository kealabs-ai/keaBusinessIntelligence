import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.api.app import app

if __name__ == '__main__':
    print("HOMOLOGACAO - Porta 6001")
    print("Frontend: http://localhost:6001/")
    print("API: http://localhost:6001/api/test")
    print("Login: http://localhost:6001/api/auth/login")
    app.run(debug=False, host='0.0.0.0', port=6001)