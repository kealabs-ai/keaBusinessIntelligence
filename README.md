# keaBusinessIntelligence
Labs - create in the Business Intelligence

## Configuração de Portas por Ambiente

- **Produção**: Porta 6000
  - Frontend: http://localhost:6000/
  - API: http://localhost:6000/api/test
  - Login: http://localhost:6000/api/auth/login

- **Homologação**: Porta 6001
  - Frontend: http://localhost:6001/
  - API: http://localhost:6001/api/test
  - Login: http://localhost:6001/api/auth/login

- **Desenvolvimento**: Porta 6002
  - Frontend: http://localhost:6002/
  - API: http://localhost:6002/api/test
  - Login: http://localhost:6002/api/auth/login

## Como Executar

```bash
# Produção
python start_prod.py

# Homologação
python start_hml.py

# Desenvolvimento
python start_dev.py
```
