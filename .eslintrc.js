module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ["./tsconfig.json"],
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    extends: [
        'prettier',
        'eslint-config-airbnb-base',
        'airbnb-typescript/base',
        'plugin:react/recommended',
        "eslint:recommended"
    ],
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    "rules": {
        "import/extensions": ["off"]
    },
};
