#!/bin/bash

# Script de deploy do frontend sem Docker

echo "Iniciando deploy do frontend..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -
    sudo apt-get install -y nodejs
fi

echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Build do frontend
echo "Construindo frontend..."
cd frontend/businessIntelligence
npm install
npm run build

# Deploy para desenvolvimento
echo "Fazendo deploy para desenvolvimento..."
sudo mkdir -p /var/www/kea-bi-dev
sudo cp -r build/* /var/www/kea-bi-dev/
sudo chown -R www-data:www-data /var/www/kea-bi-dev

# Configurar nginx se necessário
if [ -f /etc/nginx/sites-available/default ]; then
    echo "Configurando nginx..."
    sudo tee /etc/nginx/sites-available/kea-bi > /dev/null <<EOF
server {
    listen 80;
    server_name _;
    
    location /kea-bi-dev {
        alias /var/www/kea-bi-dev;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
    
    sudo ln -sf /etc/nginx/sites-available/kea-bi /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
fi

# Obter IP do servidor
SERVER_IP=$(curl -s ifconfig.me)
echo "✅ Deploy concluído!"
echo "🌐 Frontend disponível em: http://$SERVER_IP/kea-bi-dev"