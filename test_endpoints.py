import requests
import json

def test_endpoints():
    base_urls = [
        "http://localhost:5001",
        "http://localhost:5002", 
        "http://localhost:5003"
    ]
    
    for i, base_url in enumerate(base_urls, 1):
        env_name = ["DESENVOLVIMENTO", "HOMOLOGACAO", "PRODUCAO"][i-1]
        print(f"\n=== TESTANDO {env_name} - {base_url} ===")
        
        try:
            # Test API
            response = requests.get(f"{base_url}/api/test", timeout=5)
            if response.status_code == 200:
                print(f"✓ API Test: {response.json()}")
            else:
                print(f"✗ API Test falhou: {response.status_code}")
        except Exception as e:
            print(f"✗ Servidor não está rodando: {e}")
            continue
            
        try:
            # Test Login
            login_data = {"username": "admin", "password": "123456"}
            response = requests.post(f"{base_url}/api/auth/login", 
                                   json=login_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=5)
            print(f"Login Status: {response.status_code}")
            if response.status_code == 200:
                print(f"✓ Login: {response.json()}")
            else:
                print(f"✗ Login: {response.text}")
        except Exception as e:
            print(f"✗ Login falhou: {e}")

if __name__ == "__main__":
    test_endpoints()