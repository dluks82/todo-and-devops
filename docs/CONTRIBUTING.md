# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o projeto Todo & DevOps! Este documento fornece diretrizes para contribuições.

## 📋 Como Contribuir

### 1. Configuração do Ambiente

```bash
# Clone o repositório
git clone <repository-url>
cd todo-and-devops

# Instale as dependências
pnpm install

# Verifique se tudo está funcionando
pnpm dev:api
```

### 2. Fluxo de Trabalho

1. **Crie uma branch** para sua feature/fix:

   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Faça suas alterações** seguindo os padrões do projeto

3. **Teste suas mudanças**:

   ```bash
   pnpm typecheck
   pnpm build
   ```

4. **Commit suas mudanças** com mensagens descritivas:

   ```bash
   git commit -m "feat: adiciona endpoint de listagem de tarefas"
   ```

5. **Push para sua branch**:

   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Abra um Pull Request** com descrição detalhada

### 3. Padrões de Commit

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de manutenção

### 4. Padrões de Código

- Use TypeScript para tipagem estática
- Siga as configurações do ESLint e Prettier
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada

### 5. Estrutura de Branches

- `main` - Código de produção
- `develop` - Código em desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `docs/*` - Documentação

## 🐛 Reportando Bugs

1. Use o template de issue para bugs
2. Inclua passos para reproduzir
3. Descreva o comportamento esperado vs atual
4. Inclua informações do ambiente (OS, Node.js, etc.)

## 💡 Sugerindo Melhorias

1. Use o template de issue para features
2. Descreva o problema que a feature resolve
3. Proponha uma solução
4. Discuta alternativas consideradas

## 📝 Checklist do Pull Request

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Build passa sem erros
- [ ] TypeScript não apresenta erros

## 🎯 Áreas de Contribuição

- **Backend**: Melhorias na API
- **Frontend**: Interface do usuário
- **DevOps**: CI/CD, Docker, Kubernetes
- **Documentação**: Melhorias na documentação
- **Testes**: Cobertura de testes

## 📞 Suporte

Se você tiver dúvidas, abra uma issue ou entre em contato com a equipe.

---

Obrigado por contribuir! 🚀
