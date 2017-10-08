module.exports = {
	extends: [
		'eslint:recommended'
	],

	env: {
		browser: true,
		node: true
	},

	rules: {
		'brace-style': 'error',
		'comma-dangle': ['error', 'always-multiline'],
		'comma-style': 'error',
		'eqeqeq': ['error', 'allow-null'],
		'guard-for-in': 'error',
		'indent': ['error', 'tab'],
		'newline-after-var': ['error', 'always'],
		'newline-before-return': 'error',
		'no-bitwise': 'error',
		'no-console': 'warn',
		'no-floating-decimal': 'error',
		'no-lonely-if': 'error',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-nested-ternary': 'error',
		'no-self-compare': 'error',
		'no-throw-literal': 'error',
		'no-undef': 'error',
		'no-unused-vars': ['error', { argsIgnorePattern : '^_' }],
		'no-use-before-define': ['error', 'nofunc'],
		'no-useless-concat': 'error',
		'operator-linebreak': 'error',
		'padded-blocks': ['error', 'never'],
		'prefer-const': ['off', { destructuring: 'all' }],
		'prefer-template': 'off',
		'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
		'radix': 'error',
		'semi': ['error', 'always'],
		'strict': ['error', 'function'],
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
		'object-curly-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
		'computed-property-spacing': ['error', 'never'],
		'space-in-parens': ['error', 'never'],
		'space-unary-ops': 'error',
		'vars-on-top': 'error',
		'wrap-iife': ['error', 'inside'],
		'yoda': ['error', 'never', { exceptRange: true}]
	}
};
