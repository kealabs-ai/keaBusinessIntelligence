import socket
import requests
import sys

def check_port(host, port):
    """Verifica se uma porta está aberta"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False

def check_service(url):
    """Verifica se o serviço está respondendo"""
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200, response.text[:100]
    except Exception as e:
        return False, str(e)

def main():
    print("=== VERIFICAÇÃO VPS - KEA BUSINESS INTELLIGENCE ===")
    
    # IPs para testar
    ips = ['127.0.0.1', 'localhost']
    if len(sys.argv) > 1:
        ips.append(sys.argv[1])  # IP da VPS passado como argumento
    
    ports = [5000, 5001, 5002, 5003]
    
    for ip in ips:
        print(f"\n--- Testando {ip} ---")
        
        for port in ports:
            port_open = check_port(ip, port)
            print(f"Porta {port}: {'ABERTA' if port_open else 'FECHADA'}")
            
            if port_open:
                # Testa endpoints
                base_url = f"http://{ip}:{port}"
                
                # Test API
                is_ok, response = check_service(f"{base_url}/api/test")
                print(f"  /api/test: {'OK' if is_ok else 'ERRO'}")
                
                # Test routes
                is_ok, response = check_service(f"{base_url}/api/debug/routes")
                print(f"  /api/debug/routes: {'OK' if is_ok else 'ERRO'}")

if __name__ == "__main__":
    main()