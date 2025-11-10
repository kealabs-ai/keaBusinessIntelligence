@echo off
echo === DEPLOY HOMOLOGACAO - KEA BUSINESS INTELLIGENCE ===
echo Porta: 6001
echo Ambiente: homologation

REM Parar container se estiver rodando
docker-compose -f docker/docker-compose.hml.yml down

REM Construir e iniciar
docker-compose -f docker/docker-compose.hml.yml up --build -d

echo Deploy concluido!
echo Acesse: http://localhost:6001
echo API: http://localhost:6001/api/test
echo Login: http://localhost:6001/api/auth/login
pause