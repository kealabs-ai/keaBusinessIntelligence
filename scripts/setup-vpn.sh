#!/bin/bash

# Script para configurar OpenVPN e conectar ao SQL Server via VPS

echo "🔧 Configurando OpenVPN para SQL Server..."

# Verificar se os certificados existem
if [ ! -f "docker/openvpn/ca.crt" ]; then
    echo "❌ Certificado CA não encontrado!"
    echo "📋 Coloque os seguintes arquivos em docker/openvpn/:"
    echo "   - ca.crt (Certificado da CA)"
    echo "   - client.crt (Certificado do cliente)"
    echo "   - client.key (Chave privada do cliente)"
    exit 1
fi

# Configurar variáveis de ambiente
if [ ! -f ".env.vpn" ]; then
    echo "❌ Arquivo .env.vpn não encontrado!"
    echo "📋 Configure as variáveis de ambiente em .env.vpn"
    exit 1
fi

# Iniciar containers com VPN
echo "🚀 Iniciando containers com OpenVPN..."
docker-compose -f docker/docker-compose-vpn.yml --env-file .env.vpn up -d

# Verificar conexão VPN
echo "🔍 Verificando conexão VPN..."
sleep 10
docker exec kea-bi-vpn ping -c 3 10.8.0.1

# Testar conexão com SQL Server
echo "🗄️ Testando conexão com SQL Server..."
docker exec kea-bi-app python -c "
from backend.data.connection import SQLServerConnection
db = SQLServerConnection()
if db.connect():
    print('✅ Conexão com SQL Server estabelecida!')
    db.close()
else:
    print('❌ Falha na conexão com SQL Server')
"

echo "✅ Configuração OpenVPN concluída!"
echo "🌐 Aplicação disponível em: http://localhost:3000"