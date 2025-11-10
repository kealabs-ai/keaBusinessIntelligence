@echo off
echo === DEPLOY PRODUCAO - KEA BUSINESS INTELLIGENCE ===
echo Porta: 6000
echo Ambiente: production

REM Parar container se estiver rodando
docker-compose -f docker/docker-compose.prod.yml down

REM Construir e iniciar
docker-compose -f docker/docker-compose.prod.yml up --build -d

echo Deploy concluido!
echo Acesse: http://localhost:6000
echo API: http://localhost:6000/api/test
echo Login: http://localhost:6000/api/auth/login
pause