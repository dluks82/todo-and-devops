# Integração e Entrega Contínua

Este documento descreve os fluxos de Integração Contínua (CI), Entrega Contínua (CD) e Implantação Contínua (CD) configurados para este projeto.

## Visão Geral

O projeto utiliza GitHub Actions para automatizar os seguintes processos:

1. **Integração Contínua**: Verificação de qualidade de código, testes e segurança
2. **Entrega Contínua**: Construção e publicação de imagens Docker
3. **Implantação Contínua**: Deploy automático para o Coolify

## Workflows

### Integração Contínua (CI)

O workflow de CI é executado em cada push para as branches principais e em pull requests:

- **Validação de Código**: Verifica formatação, linting e tipagem
- **Testes**: Executa testes unitários e gera relatórios de cobertura
- **Segurança**: Executa análise de vulnerabilidades em dependências

**Arquivo**: [.github/workflows/ci.yml](../.github/workflows/ci.yml)

### Build e Publicação (CD)

Este workflow constrói e publica imagens Docker:

- Acionado apenas por pushes na branch `main` ou `develop`
- Utiliza GitHub Container Registry para armazenar imagens
- Constrói usando Docker Buildx com cache otimizado

**Arquivo**: [.github/workflows/ci.yml](../.github/workflows/ci.yml) (job `build-and-push-image`)

### Deploy (CD)

Este workflow realiza o deploy automático:

- Acionado pelo sucesso do workflow de CI na branch `main`
- Envia um webhook para o Coolify iniciar o deploy
- Suporta autenticação via token para segurança adicional

**Arquivo**: [.github/workflows/coolify-deploy.yml](../.github/workflows/coolify-deploy.yml)

## Análise de Segurança

O projeto também inclui um workflow dedicado para análise de segurança:

- **CodeQL**: Analisa o código fonte em busca de vulnerabilidades
- Executado em pushes para a branch `main`, pull requests e semanalmente
- Suporta detecção de problemas em JavaScript/TypeScript

**Arquivo**: [.github/workflows/codeql.yml](../.github/workflows/codeql.yml)

## Configuração Local

Para testar os workflows localmente antes de fazer push:

1. Instale o [Act](https://github.com/nektos/act) para executar GitHub Actions localmente
2. Execute `act push` para simular um evento de push
3. Execute `act pull_request` para simular um pull request

## Variáveis e Segredos

O projeto utiliza as seguintes variáveis e segredos:

### Variáveis de Ambiente

- `NODE_VERSION`: Versão do Node.js (20)
- `REGISTRY`: Registro de contêineres (ghcr.io)
- `IMAGE_NAME`: Nome da imagem Docker

### Segredos

- `GITHUB_TOKEN`: Token do GitHub (automático)
- `COOLIFY_WEBHOOK`: URL do webhook do Coolify
- `COOLIFY_TOKEN`: Token de autenticação do Coolify (opcional)

---

⚠️ **Nota**: Para configurar um novo ambiente, é necessário adicionar os segredos correspondentes nas configurações do repositório no GitHub.

**Arquivo**: [.github/workflows/coolify-deploy.yml](../.github/workflows/coolify-deploy.yml)

## Fluxo de Execução

1. **Em Pull Requests contra a `main`**:
   - Executa apenas o workflow de CI (testes, linting, etc.)
   - Verifica se o código está pronto para ser integrado

2. **Em Push para a branch `main`**:
   - Executa o workflow de CI
   - Se bem-sucedido, executa o workflow de CD:
     - Constrói a imagem Docker
     - Publica a imagem no GitHub Container Registry
     - Aciona o webhook do Coolify para deploy

## Configuração

### Secrets Necessários

Para que os workflows funcionem corretamente, configure os seguintes secrets no repositório:

- **COOLIFY_TOKEN**: Token de API do Coolify para autenticação
- **COOLIFY_WEBHOOK**: URL do webhook do Coolify para iniciar implantações

## Ambientes

O projeto utiliza os seguintes ambientes:

- **Desenvolvimento**: Implantação automática a partir da branch `main`
- **Produção**: (Futuro) Implantação manual após aprovação

## Fluxo de Trabalho Recomendado

1. Desenvolva em uma branch de feature
2. Abra um Pull Request para a branch `main`
3. Aguarde a execução do CI e corrija quaisquer problemas
4. Após aprovação e merge, o CD implantará automaticamente no Coolify

## Implantações Manuais

Para acionar uma implantação manualmente:

1. Acesse a aba "Actions" no GitHub
2. Selecione o workflow "CI/CD com Coolify"
3. Clique em "Run workflow"
4. Selecione a branch `main` e confirme
