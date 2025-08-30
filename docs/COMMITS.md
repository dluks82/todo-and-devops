# Conventional Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit.

## Formato das Mensagens

```bash
<tipo>(<escopo opcional>): <descrição>

<corpo opcional>

<rodapé opcional>
```

## Tipos de Commit

Os seguintes tipos são permitidos:

- `feat`: Novas funcionalidades
- `fix`: Correção de bugs
- `docs`: Alterações em documentação
- `style`: Alterações que não afetam o código (formatação, espaços em branco, etc.)
- `refactor`: Refatoração de código sem alterar funcionalidade
- `perf`: Melhorias de performance
- `test`: Adição ou correção de testes
- `build`: Alterações no sistema de build ou dependências externas
- `ci`: Alterações em arquivos de CI e scripts
- `chore`: Outras alterações que não modificam código fonte ou testes
- `revert`: Reverte um commit anterior

## Exemplos

```bash
feat: adiciona função de autenticação
```

```bash
fix(api): corrige tratamento de erro na rota de usuários
```

```bash
docs: atualiza documentação de instalação
```

```bash
style: formata código de acordo com padrões
```

## Validação Automática

Este projeto utiliza `commitlint` e `husky` para validar automaticamente as mensagens de commit.

Se sua mensagem de commit não seguir as convenções, o commit será rejeitado com uma mensagem de erro.

## Dicas

1. Use o tempo presente ("adiciona", não "adicionou")
2. A primeira linha deve ter no máximo 72 caracteres
3. Descreva o que a alteração faz, não o que você fez
4. Use o corpo para explicar o "porquê" e o "como" (se necessário)
