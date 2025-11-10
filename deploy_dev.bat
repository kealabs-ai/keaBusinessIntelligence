@echo off
echo === DEPLOY DESENVOLVIMENTO - KEA BUSINESS INTELLIGENCE ===
echo Porta: 6002
echo Ambiente: development

REM Parar container se estiver rodando
docker-compose -f docker/docker-compose.dev.yml down

REM Construir e iniciar
docker-compose -f docker/docker-compose.dev.yml up --build -d

echo Deploy concluido!
echo Acesse: http://localhost:6002
echo API: http://localhost:6002/api/test
echo Login: http://localhost:6002/api/auth/login
pause