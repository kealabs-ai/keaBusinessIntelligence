# Configuração OpenVPN para SQL Server

## 📋 Pré-requisitos

1. **Certificados OpenVPN** da sua VPS
2. **Acesso SSH** à VPS
3. **Docker** instalado localmente

## 🔧 Configuração

### 1. Certificados OpenVPN

Coloque os seguintes arquivos em `docker/openvpn/`:

```
docker/openvpn/
├── ca.crt          # Certificado da CA
├── client.crt      # Certificado do cliente  
├── client.key      # Chave privada do cliente
└── client.ovpn     # Configuração (já criada)
```

### 2. Configurar VPS IP

Edite `docker/openvpn/client.ovpn`:
```
remote SEU_IP_VPS 1194
```

### 3. Configurar Banco de Dados

Edite `.env.vpn`:
```env
VPN_DB_SERVER=10.8.0.1  # IP interno da VPN
DB_NAME=business_intelligence
DB_USER=sa
DB_PASSWORD=sua_senha_segura
```

## 🚀 Execução

### Opção 1: Script Automático
```bash
chmod +x scripts/setup-vpn.sh
./scripts/setup-vpn.sh
```

### Opção 2: Manual
```bash
# Iniciar containers
docker-compose -f docker/docker-compose-vpn.yml --env-file .env.vpn up -d

# Verificar logs
docker logs kea-bi-vpn
docker logs kea-bi-app
```

## 🔍 Verificação

### Testar Conexão VPN:
```bash
docker exec kea-bi-vpn ping 10.8.0.1
```

### Testar SQL Server:
```bash
docker exec kea-bi-app python -c "
from backend.data.connection import SQLServerConnection
db = SQLServerConnection()
print('Conectado!' if db.connect() else 'Erro de conexão')
"
```

## 🌐 Acesso

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api/test

## 🛠️ Troubleshooting

### VPN não conecta:
- Verificar certificados em `docker/openvpn/`
- Confirmar IP da VPS em `client.ovpn`
- Verificar porta 1194 aberta na VPS

### SQL Server não conecta:
- Verificar IP interno da VPN (geralmente 10.8.0.x)
- Confirmar credenciais em `.env.vpn`
- Verificar firewall do SQL Server

### Logs detalhados:
```bash
docker logs -f kea-bi-vpn
docker logs -f kea-bi-app
```