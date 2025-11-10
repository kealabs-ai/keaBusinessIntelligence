#!/bin/bash

# Script para instalar Docker no Jenkins
echo "=== INSTALANDO DOCKER NO JENKINS ==="

# Verificar se já está instalado
if command -v docker &> /dev/null; then
    echo "✅ Docker já instalado: $(docker --version)"
    exit 0
fi

echo "📦 Instalando Docker..."

# Atualizar sistema
apt-get update -y

# Instalar dependências
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Adicionar chave GPG do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar e instalar Docker
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Iniciar Docker
systemctl start docker
systemctl enable docker

# Adicionar usuário jenkins ao grupo docker
usermod -aG docker jenkins || true

# Verificar instalação
docker --version
docker compose version

echo "✅ Docker instalado com sucesso!"