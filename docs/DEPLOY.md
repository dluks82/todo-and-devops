# Configuração de Deploy

Este documento contém instruções para configurar o deploy da aplicação no ambiente de desenvolvimento usando o Coolify.

## Pré-requisitos

1. Instância do Coolify configurada e em execução
2. Acesso ao repositório GitHub com permissões de administrador

## Configuração no Coolify

### Criando a Aplicação

1. Acesse o Dashboard do Coolify e clique em "New Resource" > "Application"
2. Selecione "Docker Image" como tipo de aplicação
3. Configure a aplicação:
   - **Nome**: todo-api (ou outro nome de sua escolha)
   - **Imagem**: ghcr.io/dluks82/todo-and-devops-api:latest
   - **Porta**: 3000
   - **URL pública**: [definir conforme sua configuração]

### Configurando Variáveis de Ambiente

No Coolify, adicione as seguintes variáveis de ambiente:

- `NODE_ENV`: production
- `PORT`: 3000
- `HOST`: 0.0.0.0

### Configurando Webhook para Deploy

1. No dashboard da sua aplicação no Coolify, vá para "Webhook"
2. Copie a URL do webhook fornecida

## Configuração no GitHub

### Adicionando Secrets

1. Vá para o repositório no GitHub > "Settings" > "Secrets and variables" > "Actions"
2. Adicione os seguintes secrets:
   - `COOLIFY_TOKEN`: [Token de autenticação do Coolify]
   - `COOLIFY_WEBHOOK`: [URL do webhook copiado do Coolify]

## Verificando a Configuração

1. Faça push para a branch `main` ou execute o workflow manualmente no GitHub Actions
2. Verifique se o deploy foi acionado no Coolify
3. Após o deploy, teste acessando a rota `/health` da sua API

## Solução de Problemas

- **Deploy falhou**: Verifique os logs no Coolify para identificar o erro
- **Webhook não funciona**: Verifique se a URL do webhook está corretamente configurada no secret do GitHub
- **API não responde**: Verifique se a aplicação está em execução no Coolify e se as variáveis de ambiente estão corretas
