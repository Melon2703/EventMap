module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['react-app', 'react-app/jest', 'airbnb', 'airbnb-typescript', 'plugin:import/typescript', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'import/prefer-default-export': 'off',
        'consistent-return': 'off',
    },
};
