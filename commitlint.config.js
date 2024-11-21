module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'init',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
