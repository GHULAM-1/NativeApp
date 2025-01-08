module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'build', 'ci']
      ],
      'subject-case': [2, 'always', 'sentence-case'],
      'subject-min-length': [2, 'always', 10],
    },
  };
  