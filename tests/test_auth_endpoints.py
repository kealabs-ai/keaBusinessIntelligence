import requests
import json

BASE_URL = "http://localhost:5000/api/auth"

def test_login():
    print("Testando endpoint de login...")
    
    # Dados de login
    login_data = {
        "username": "admin",
        "password": "secret123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login", json=login_data)
        
        if response.status_code == 200:
            data = response.json()
            print("OK - Login realizado com sucesso!")
            print(f"Token: {data.get('token')[:50]}...")
            print(f"User ID: {data.get('user_id')}")
            print(f"Payment Status: {data.get('payment_status')}")
            return data.get('token')
        else:
            print(f"ERRO - Login falhou: {response.status_code}")
            print(f"Resposta: {response.text}")
            return None
            
    except Exception as e:
        print(f"ERRO - Exceção no login: {e}")
        return None

def test_validate_token(token):
    print("\nTestando endpoint de validação de token...")
    
    if not token:
        print("ERRO - Token não disponível para teste")
        return
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/validate", headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            print("OK - Token válido!")
            print(f"User ID: {data.get('user_id')}")
            print(f"Payment Status: {data.get('payment_status')}")
            print(f"Valid: {data.get('valid')}")
        else:
            print(f"ERRO - Validação falhou: {response.status_code}")
            print(f"Resposta: {response.text}")
            
    except Exception as e:
        print(f"ERRO - Exceção na validação: {e}")

if __name__ == "__main__":
    print("Iniciando testes dos endpoints de autenticação...")
    print("Certifique-se de que o servidor está rodando em localhost:5000\n")
    
    # Teste 1: Login
    token = test_login()
    
    # Teste 2: Validação de token
    test_validate_token(token)
    
    print("\nTestes concluídos!")