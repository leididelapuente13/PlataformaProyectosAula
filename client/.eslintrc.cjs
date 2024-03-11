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
		"react-app/jest"
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
	plugins: ['react'],
	rules: {},
};
