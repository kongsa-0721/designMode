module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	globals: {
		module: true,
		exports: true,
		require: true,
		window: true,
		process: true,
		location: true,
		__locals: true,
		__dirname: true,
		ENV: true,
	},
	rules: {
		"@typescript-eslint/ban-ts-comment": "off", //允许ts-ignore
		"@typescript-eslint/no-unused-vars": "off", //允许未使用
		"@typescript-eslint/no-explicit-any": "off", //允许any
		"@typescript-eslint/no-extra-semi": "error", //额外的分号 报错
		"@typescript-eslint/no-var-requires": "off", //允许使用var
		"no-extra-semi": "error", //禁止不必要的分号
		"@typescript-eslint/no-this-alias": "off", //允许this别名
	},
};
