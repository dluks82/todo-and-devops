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

**Arquivo**: [.github/workflows/ci.yml](../.github/workflows/ci.yml)

### Build, Publicação e Deploy (CD)

Este workflow constrói, publica imagens Docker e realiza o deploy:

- Acionado apenas por pushes na branch `main`
- Utiliza GitHub Container Registry para armazenar imagens
- Aciona o webhook do Coolify para iniciar a implantação

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
