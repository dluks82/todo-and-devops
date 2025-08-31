module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never'], // Desativando a regra de case para o subject
    'body-max-line-length': [0, 'always', 100],
  },
}
