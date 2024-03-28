module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
  settings: {
    react: {
      version: 'detect'
    }
  },
	extends: [
		'standard',
		'plugin:react/jsx-runtime',
		'plugin:react/recommended',
		'eslint-config-prettier',
		"react-app/jest",
		'plugin: jest-dom/recommended'
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'testing-library'],
	rules: {
		'testing-library/await-async-query': 'error',
    'testing-library/await-async-utils': 'error',
    'testing-library/await-fire-event': 'error',
    'testing-library/consistent-data-testid': 'warn',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-debug': 'warn',
    'testing-library/no-dom-import': 'error',
    'testing-library/no-wait-for-empty-callback': 'error',
    'testing-library/no-wait-for-multiple-assertions': 'error',
    'testing-library/no-wait-for-side-effects': 'error',
    'testing-library/prefer-explicit-assert': 'error',
    'testing-library/prefer-find-by': 'warn',
    'testing-library/prefer-presence-queries': 'warn',
    'testing-library/prefer-query-by-disappearance': 'error',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/prefer-user-event': 'warn',
	},
};
