import requests
import sys

def test_vps_connection(vps_ip):
    """Testa conexão com a VPS"""
    
    endpoints = [
        '/api/test',
        '/api/debug/routes',
        '/api/auth/login',
        '/'
    ]
    
    print(f"=== TESTANDO CONEXÃO COM VPS: {vps_ip} ===")
    
    for endpoint in endpoints:
        url = f"http://{vps_ip}:5000{endpoint}"
        
        try:
            if endpoint == '/api/auth/login':
                # POST request para login
                response = requests.post(url, 
                    json={"username": "test", "password": "test"},
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
            else:
                # GET request
                response = requests.get(url, timeout=10)
            
            print(f"✓ {endpoint}: {response.status_code}")
            if response.status_code == 200 and endpoint == '/api/test':
                print(f"  Response: {response.json()}")
                
        except requests.exceptions.ConnectRefused:
            print(f"✗ {endpoint}: Conexão recusada - Serviço não está rodando")
        except requests.exceptions.Timeout:
            print(f"✗ {endpoint}: Timeout - Servidor não responde")
        except requests.exceptions.ConnectionError:
            print(f"✗ {endpoint}: Erro de conexão - Verifique IP/porta")
        except Exception as e:
            print(f"✗ {endpoint}: Erro - {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python test_vps_connection.py <IP_DA_VPS>")
        print("Exemplo: python test_vps_connection.py 72.60.140.128")
        sys.exit(1)
    
    vps_ip = sys.argv[1]
    test_vps_connection(vps_ip)