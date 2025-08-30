# Integração com Coolify

Este documento descreve como configurar a integração do projeto com o Coolify para implantação automática.

## Pré-requisitos

1. Acesso a uma instância do Coolify
2. Acesso ao repositório GitHub do projeto
3. Permissões para configurar secrets no GitHub

## Configuração do Coolify

### 1. Criar um Token de API

1. Acesse sua instância do Coolify
2. Navegue até "Keys & Tokens" / "API tokens"
3. Crie um novo token com nome descritivo (ex: "GitHub Actions")
4. Selecione a permissão "\*" para acesso completo
5. Copie o token gerado (ele será mostrado apenas uma vez)

### 2. Configurar Aplicação no Coolify

1. Crie uma nova aplicação no Coolify do tipo "Docker Image"
2. Configure a aplicação para usar a imagem do GitHub Container Registry:

   ```bash
   ghcr.io/dluks82/todo-and-devops-api:latest
   ```

3. Configure as variáveis de ambiente necessárias para a aplicação
4. Configure a porta exposta (3000)
5. Obtenha a URL do webhook da aplicação na seção "Webhook" da aplicação

## Configuração do GitHub

### 1. Adicionar Secrets ao Repositório

1. Acesse as configurações do repositório no GitHub
2. Navegue até "Settings" > "Secrets and variables" > "Actions"
3. Adicione os seguintes secrets:
   - `COOLIFY_TOKEN`: O token de API gerado no Coolify
   - `COOLIFY_WEBHOOK`: A URL do webhook da aplicação no Coolify

### 2. Workflow do GitHub Actions

O workflow do GitHub Actions já está configurado no arquivo `.github/workflows/coolify-deploy.yml`. Ele realiza as seguintes ações:

1. Executa os testes da aplicação
2. Constrói a imagem Docker da API
3. Publica a imagem no GitHub Container Registry
4. Aciona o webhook do Coolify para iniciar o deploy

## Fluxo de Trabalho

Após configurar a integração:

1. Quando um commit é enviado para as branches `main` ou `config-project`, o workflow é acionado
2. Se os testes passarem, a imagem é construída e publicada
3. O Coolify é notificado via webhook
4. O Coolify baixa a nova imagem e a implanta automaticamente

## Solução de Problemas

Se o deploy não ocorrer automaticamente:

1. Verifique os logs do workflow no GitHub Actions
2. Verifique se os secrets estão configurados corretamente
3. Verifique os logs do Coolify para identificar possíveis erros
4. Certifique-se de que o token do Coolify tem as permissões corretas
