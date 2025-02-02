import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';

export default {
    ...js.configs.recommended,
    ignores: ['**/node_modules/**', '/dev-tools/**', '**.json', '**.md', '.vscode/**'],
    plugins: ['import', 'security'],
    rules: {
        // Error Prevention
        'no-unused-vars': 'warn',
        'no-await-in-loop': 'warn',
        'no-debugger': 'warn',

        // Best Practices
        'eqeqeq': ['error', 'always'],
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/no-absolute-path': 'error',

        // Security
        'security/detect-eval-with-expression': 'error',
        'security/detect-unsafe-regex': 'warn',
        'security/detect-non-literal-require': 'warn',
        'security/detect-non-literal-fs-filename': 'warn',

        // ES6+
        'prefer-template': 'warn',
        'no-extra-boolean-cast': 'warn',
        'no-extra-bind': 'warn',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    cache: true
};
