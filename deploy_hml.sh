#!/bin/bash

echo "=== DEPLOY HOMOLOGAÇÃO - KEA BUSINESS INTELLIGENCE ==="
echo "Porta: 6001"
echo "Ambiente: homologation"

# Parar container se estiver rodando
docker-compose -f docker/docker-compose.hml.yml down

# Construir e iniciar
docker-compose -f docker/docker-compose.hml.yml up --build -d

echo "Deploy concluído!"
echo "Acesse: http://localhost:6001"
echo "API: http://localhost:6001/api/test"
echo "Login: http://localhost:6001/api/auth/login"