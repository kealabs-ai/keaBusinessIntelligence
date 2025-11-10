#!/bin/bash

# Script para deploy por ambiente
# Uso: ./deploy-environment.sh [prod|hml|dev]

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "❌ Erro: Especifique o ambiente (prod, hml ou dev)"
    echo "Uso: $0 [prod|hml|dev]"
    exit 1
fi

case $ENVIRONMENT in
    "prod")
        PORT=6000
        SCRIPT="start_prod.py"
        ENV_FILE=".env.prod"
        LOG_FILE="prod.log"
        ;;
    "hml")
        PORT=6001
        SCRIPT="start_hml.py"
        ENV_FILE=".env.hml"
        LOG_FILE="hml.log"
        ;;
    "dev")
        PORT=6002
        SCRIPT="start_dev.py"
        ENV_FILE=".env.dev"
        LOG_FILE="dev.log"
        ;;
    *)
        echo "❌ Ambiente inválido: $ENVIRONMENT"
        echo "Ambientes válidos: prod, hml, dev"
        exit 1
        ;;
esac

echo "==================== DEPLOY $ENVIRONMENT ===================="
echo "🚀 Iniciando deploy para ambiente: $ENVIRONMENT"
echo "📡 Porta: $PORT"
echo "📄 Script: $SCRIPT"
echo "⚙️  Arquivo env: $ENV_FILE"

# Obter IP do servidor
SERVER_IP=$(curl -s ifconfig.me || echo "localhost")

# Parar serviço existente
echo "🛑 Parando serviços existentes..."
pkill -f "python.*$SCRIPT" || true
sleep 5

# Copiar arquivo de ambiente específico
if [ -f "$ENV_FILE" ]; then
    cp "$ENV_FILE" .env
    echo "✅ Arquivo de ambiente copiado: $ENV_FILE -> .env"
fi

# Instalar dependências
echo "📦 Instalando dependências..."
python3 -m pip install -r requirements.txt

# Iniciar serviço
echo "🚀 Iniciando serviço..."
export PYTHONPATH=$(pwd):$PYTHONPATH
nohup python3 "$SCRIPT" > "$LOG_FILE" 2>&1 &

# Aguardar inicialização
echo "⏳ Aguardando inicialização..."
sleep 15

# Verificar se está rodando
echo "🔍 Verificando serviço..."
if curl -f "http://localhost:$PORT/api/test" > /dev/null 2>&1; then
    echo "✅ Serviço iniciado com sucesso!"
    echo ""
    echo "🌐 URLs DE ACESSO ($ENVIRONMENT):"
    echo "   📱 Frontend: http://$SERVER_IP:$PORT/"
    echo "   🔌 API: http://$SERVER_IP:$PORT/api/test"
    echo "   🔐 Login: http://$SERVER_IP:$PORT/api/auth/login"
    echo ""
    echo "📄 Log: $LOG_FILE"
    echo "========================================================="
else
    echo "❌ Erro ao iniciar serviço"
    echo "📄 Últimas linhas do log:"
    tail -20 "$LOG_FILE"
    exit 1
fi