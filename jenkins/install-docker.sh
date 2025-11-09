#!/bin/bash

# Script para instalar Docker no Jenkins agent

echo "Instalando Docker..."

# Atualizar sistema
sudo apt-get update

# Instalar dependências
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Adicionar chave GPG do Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Adicionar repositório Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Adicionar usuário jenkins ao grupo docker
sudo usermod -aG docker jenkins

# Iniciar e habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verificar instalação
docker --version
docker-compose --version

echo "Docker instalado com sucesso!"