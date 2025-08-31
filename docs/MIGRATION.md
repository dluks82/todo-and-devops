# Migração de Monorepo para Projeto Único

Este documento detalha as mudanças realizadas para simplificar a estrutura do projeto, migrando de um monorepo com pnpm para um projeto único de API.

## Mudanças Realizadas

1. **Simplificação da Estrutura**
   - Movida a API de `apps/api` para a raiz do projeto
   - Movidos os tipos de `packages/shared` para `src/types.ts`
   - Removidos diretórios `apps` e `packages`

2. **Configuração do TypeScript**
   - Ajustado o `tsconfig.json` para usar CommonJS em vez de ESM
   - Simplificado o sistema de módulos para evitar problemas de importação

3. **Simplificação do Docker**
   - Reescrito o Dockerfile para a nova estrutura
   - Adicionada verificação de arquivos compilados para evitar falhas no build

4. **Gerenciamento de Dependências**
   - Migrado de pnpm para npm
   - Simplificado o arquivo package.json
   - Removidos pacotes desnecessários

5. **Documentação**
   - Atualizado o README.md para refletir a nova estrutura
   - Atualizado o Roadmap para incluir a etapa de simplificação

## Próximos Passos

1. **Testar a Build e Deploy**
   - Verificar o processo de build
   - Testar o deploy no Coolify

2. **Implementar CRUD de Tarefas**
   - Adicionar modelos e rotas para tarefas
   - Integrar com banco de dados

3. **Melhorar Documentação**
   - Atualizar documentação técnica
   - Adicionar exemplos de uso da API
