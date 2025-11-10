@echo off
echo ==================== KEA BUSINESS INTELLIGENCE ====================
echo Iniciando todos os ambientes...
echo.

echo Iniciando DESENVOLVIMENTO (Porta 5001)...
start "KEA-BI-DEV" cmd /k "python start_dev.py"
timeout /t 3

echo Iniciando HOMOLOGACAO (Porta 5002)...
start "KEA-BI-HML" cmd /k "python start_hml.py"
timeout /t 3

echo Iniciando PRODUCAO (Porta 5003)...
start "KEA-BI-PROD" cmd /k "python start_prod.py"
timeout /t 3

echo.
echo ✅ Todos os serviços iniciados!
echo.
echo 🌐 URLs DE ACESSO:
echo 🔧 DESENVOLVIMENTO: http://localhost:5001/
echo 🧪 HOMOLOGAÇÃO:     http://localhost:5002/
echo 🚀 PRODUÇÃO:        http://localhost:5003/
echo.
echo 🔌 Endpoints de API:
echo    /api/test
echo    /api/auth/login
echo    /api/auth/validate
echo    /api/sales-data
echo    /api/top-products
echo    /api/customer-metrics
echo.
pause