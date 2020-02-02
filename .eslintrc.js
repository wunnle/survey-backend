module.exports = {
	'env': {
		'es6': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		"plugin:prettier/recommended"
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		"prettier/prettier": [
      "error",
      {
        "trailingComma": "none",
        "singleQuote": true,
        "printWidth": 90,
				"endOfLine":"auto",
				"semi": false
      }
    ],
		'linebreak-style': [
			'error',
			'unix'
		],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
		'semi': 0,
		"comma-dangle": 0,
    "max-len": 0,
    "multiline-ternary": ["error", "always-multiline"],
    "no-console": 0
	}
}