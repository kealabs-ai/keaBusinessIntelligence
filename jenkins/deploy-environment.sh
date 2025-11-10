#!/bin/bash

# Script para deploy automatizado via Jenkins
# Uso: ./deploy-environment.sh [prod|hml|dev|all]

ENVIRONMENT=${1:-all}
FORCE_REBUILD=${2:-false}

echo "=== KEA BUSINESS INTELLIGENCE - DEPLOY JENKINS ==="
echo "Ambiente: $ENVIRONMENT"
echo "Force Rebuild: $FORCE_REBUILD"
echo "=================================================="

# Função para verificar saúde da aplicação
check_health() {
    local port=$1
    local env_name=$2
    
    echo "Verificando saúde do $env_name (porta $port)..."
    
    for i in {1..15}; do
        if curl -f http://localhost:$port/api/test > /dev/null 2>&1; then
            echo "✅ $env_name respondendo na porta $port"
            return 0
        else
            echo "Tentativa $i/15 - Aguardando $env_name..."
            sleep 10
        fi
    done
    
    echo "❌ $env_name não está respondendo na porta $port"
    return 1
}

# Parar containers existentes
echo "Parando containers existentes..."
docker-compose -f docker/docker-compose.dev.yml down 2>/dev/null || true
docker-compose -f docker/docker-compose.hml.yml down 2>/dev/null || true
docker-compose -f docker/docker-compose.prod.yml down 2>/dev/null || true

# Limpar imagens se forçado
if [ "$FORCE_REBUILD" = "true" ]; then
    echo "Limpando imagens antigas..."
    docker system prune -f
    docker rmi $(docker images kea* -q) 2>/dev/null || true
fi

# Deploy por ambiente
case $ENVIRONMENT in
    "dev"|"development")
        echo "🟢 Iniciando deploy DESENVOLVIMENTO..."
        docker-compose -f docker/docker-compose.dev.yml up --build -d
        check_health 6002 "DESENVOLVIMENTO"
        ;;
    "hml"|"homologation")
        echo "🟡 Iniciando deploy HOMOLOGAÇÃO..."
        docker-compose -f docker/docker-compose.hml.yml up --build -d
        check_health 6001 "HOMOLOGAÇÃO"
        ;;
    "prod"|"production")
        echo "🔴 Iniciando deploy PRODUÇÃO..."
        docker-compose -f docker/docker-compose.prod.yml up --build -d
        check_health 6000 "PRODUÇÃO"
        ;;
    "all")
        echo "🚀 Iniciando deploy TODOS OS AMBIENTES..."
        
        # Desenvolvimento
        echo "🟢 Deploy DESENVOLVIMENTO..."
        docker-compose -f docker/docker-compose.dev.yml up --build -d
        sleep 20
        
        # Homologação
        echo "🟡 Deploy HOMOLOGAÇÃO..."
        docker-compose -f docker/docker-compose.hml.yml up --build -d
        sleep 20
        
        # Produção
        echo "🔴 Deploy PRODUÇÃO..."
        docker-compose -f docker/docker-compose.prod.yml up --build -d
        sleep 20
        
        # Verificar todos
        check_health 6002 "DESENVOLVIMENTO"
        check_health 6001 "HOMOLOGAÇÃO"
        check_health 6000 "PRODUÇÃO"
        ;;
    *)
        echo "❌ Ambiente inválido: $ENVIRONMENT"
        echo "Use: dev, hml, prod ou all"
        exit 1
        ;;
esac

# Resumo final
echo ""
echo "==================== DEPLOY CONCLUÍDO ===================="
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "localhost")

echo "🎉 Deploy realizado com sucesso!"
echo "📅 Data: $(date)"
echo "🎯 Ambiente: $ENVIRONMENT"
echo ""

# Mostrar containers rodando
echo "📦 CONTAINERS ATIVOS:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep kea-bi || echo "Nenhum container kea-bi rodando"

echo ""
echo "🌐 URLs DE ACESSO:"

if docker ps | grep -q kea-bi-development; then
    echo "🟢 DESENVOLVIMENTO: http://$SERVER_IP:6002/"
fi

if docker ps | grep -q kea-bi-homologation; then
    echo "🟡 HOMOLOGAÇÃO: http://$SERVER_IP:6001/"
fi

if docker ps | grep -q kea-bi-production; then
    echo "🔴 PRODUÇÃO: http://$SERVER_IP:6000/"
fi

echo "=========================================================="