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

### Execução Local (Python)
```bash
# Produção
python start_prod.py

# Homologação
python start_hml.py

# Desenvolvimento
python start_dev.py
```

### Execução em Container (Docker)

#### Linux/Mac:
```bash
# Produção
./deploy_prod.sh

# Homologação
./deploy_hml.sh

# Desenvolvimento
./deploy_dev.sh
```

#### Windows:
```cmd
REM Produção
deploy_prod.bat

REM Homologação
deploy_hml.bat

REM Desenvolvimento
deploy_dev.bat
```

#### Docker Compose Manual:
```bash
# Produção
docker-compose -f docker/docker-compose.prod.yml up --build -d

# Homologação
docker-compose -f docker/docker-compose.hml.yml up --build -d

# Desenvolvimento
docker-compose -f docker/docker-compose.dev.yml up --build -d
```

### Parar Containers
```bash
# Parar produção
docker-compose -f docker/docker-compose.prod.yml down

# Parar homologação
docker-compose -f docker/docker-compose.hml.yml down

# Parar desenvolvimento
docker-compose -f docker/docker-compose.dev.yml down

# Parar todos os containers do projeto
docker stop kea-bi-production kea-bi-homologation kea-bi-development
```

## Deploy via Jenkins (DevOps)

### Jenkinsfiles Disponíveis

- `jenkins/Jenkinsfile` - Pipeline principal com parâmetros
- `jenkins/Jenkinsfile.prod` - Deploy específico para produção
- `jenkins/Jenkinsfile.hml` - Deploy específico para homologação
- `jenkins/Jenkinsfile.dev` - Deploy específico para desenvolvimento

### Parâmetros do Pipeline Principal

- **ENVIRONMENT**: `all`, `development`, `homologation`, `production`
- **FORCE_REBUILD**: Forçar rebuild das imagens Docker

### Script de Deploy Automatizado

```bash
# Via Jenkins
./jenkins/deploy-environment.sh [prod|hml|dev|all] [true|false]

# Exemplos:
./jenkins/deploy-environment.sh prod        # Deploy produção
./jenkins/deploy-environment.sh all true    # Deploy todos com rebuild
```

### Configuração no Jenkins

1. Criar pipeline job no Jenkins
2. Configurar SCM para o repositório
3. Definir `jenkins/Jenkinsfile` como pipeline script
4. Configurar parâmetros do build

## Estrutura do Projeto

- `backend/` - API Flask
- `frontend/businessIntelligence/` - Frontend React
- `docker/` - Arquivos Docker e docker-compose
- `jenkins/` - Pipelines e scripts de DevOps
- `scripts/` - Scripts de deploy e configuração
- `.env.*` - Arquivos de configuração por ambiente
