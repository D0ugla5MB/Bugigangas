import js from '@eslint/js';

export default {
    ...js.configs.recommended,
    ignores: ['**/node_modules/**', '/dev-tools/**', '**.json', '**.md', '.vscode/**'],
    rules: {
        // Error Prevention
        'no-unused-vars': 'warn',
        'no-await-in-loop': 'warn',
        'no-debugger': 'warn',

        // Best Practices
        'eqeqeq': ['error', 'always'],

        // ES6+
        'prefer-template': 'warn',
        'no-extra-boolean-cast': 'warn',
        'no-extra-bind': 'warn',
    }
};
