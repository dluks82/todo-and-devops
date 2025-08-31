#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}=== Teste de Build Local ===${NC}\n"

# Limpar diretórios de build
echo -e "${YELLOW}Limpando diretórios de build...${NC}"
rm -rf packages/shared/dist apps/api/dist
echo -e "${GREEN}✓ Diretórios limpos${NC}\n"

# Etapa 1: Build do pacote shared
echo -e "${YELLOW}Etapa 1: Compilando pacote shared...${NC}"
pnpm --filter @todo-and-devops/shared build
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Falha ao compilar pacote shared${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Pacote shared compilado com sucesso${NC}\n"

# Verificar arquivos do shared
echo -e "${YELLOW}Verificando arquivos gerados no shared...${NC}"
if [ ! -f packages/shared/dist/src/index.js ] || [ ! -f packages/shared/dist/src/index.d.ts ]; then
  echo -e "${RED}✗ Arquivos do pacote shared não foram gerados corretamente${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Arquivos do shared verificados${NC}\n"

# Etapa 2: Build da API
echo -e "${YELLOW}Etapa 2: Compilando API...${NC}"
pnpm --filter @todo-and-devops/api build
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Falha ao compilar API${NC}"
  exit 1
fi
echo -e "${GREEN}✓ API compilada com sucesso${NC}\n"

# Verificar arquivos da API
echo -e "${YELLOW}Verificando arquivos gerados na API...${NC}"
if [ ! -f apps/api/dist/index.js ] || [ ! -f apps/api/dist/routes.js ]; then
  echo -e "${RED}✗ Arquivos da API não foram gerados corretamente${NC}"
  ls -la apps/api/dist
  exit 1
fi
echo -e "${GREEN}✓ Arquivos da API verificados${NC}\n"

# Etapa 3: Verificar se a aplicação inicia
echo -e "${YELLOW}Etapa 3: Testar se a aplicação inicia...${NC}"
echo -e "${YELLOW}Iniciando a API em segundo plano...${NC}"
cd apps/api
node dist/index.js & 
PID=$!
sleep 2

# Verificar se o processo ainda está rodando
if ps -p $PID > /dev/null; then
  echo -e "${GREEN}✓ API iniciou com sucesso${NC}"
  # Testar endpoint de health
  echo -e "${YELLOW}Testando endpoint de health...${NC}"
  RESPONSE=$(curl -s http://localhost:3000/health)
  if [[ $RESPONSE == *"\"status\":\"ok\""* ]]; then
    echo -e "${GREEN}✓ Endpoint de health respondeu corretamente${NC}"
  else
    echo -e "${RED}✗ Endpoint de health não respondeu corretamente${NC}"
    echo -e "${YELLOW}Resposta: $RESPONSE${NC}"
  fi
  # Matar o processo
  kill $PID
else
  echo -e "${RED}✗ API falhou ao iniciar${NC}"
  exit 1
fi
cd ../..
echo -e "\n${GREEN}===== Teste de build local concluído com sucesso! =====${NC}\n"

# Etapa 4: Testar build do Docker (opcional)
read -p "Deseja testar o build do Docker também? (s/n) " test_docker
if [[ $test_docker == "s" || $test_docker == "S" ]]; then
  echo -e "\n${YELLOW}Etapa 4: Testando build do Docker...${NC}"
  docker build -f apps/api/Dockerfile -t todo-api-test .
  if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Falha ao construir imagem Docker${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ Imagem Docker construída com sucesso${NC}\n"
  
  echo -e "${YELLOW}Iniciando container Docker...${NC}"
  echo -e "${YELLOW}(O container será executado em segundo plano e removido após o teste)${NC}"
  docker run -d -p 3001:3000 --name todo-api-test-container --rm todo-api-test
  
  sleep 2
  
  echo -e "${YELLOW}Testando endpoint de health no container...${NC}"
  RESPONSE=$(curl -s http://localhost:3001/health)
  if [[ $RESPONSE == *"\"status\":\"ok\""* ]]; then
    echo -e "${GREEN}✓ Container Docker funcionando corretamente${NC}"
  else
    echo -e "${RED}✗ Container Docker não respondeu corretamente${NC}"
    echo -e "${YELLOW}Resposta: $RESPONSE${NC}"
  fi
  
  # Parar o container
  docker stop todo-api-test-container
  
  echo -e "\n${GREEN}===== Teste Docker concluído com sucesso! =====${NC}"
fi

echo -e "\n${GREEN}Todos os testes concluídos com sucesso!${NC}\n"
