//テスト環境の設定ファイル
//http://azu.github.com/slide/Kamakura/busterJS.html#slide16
var config = module.exports;

config['stone test'] = {
	rootPath: '../',
	environment: 'browser', // or 'node'
	sources: [
		// ast base
		'./ASTree',
		'./ASTLeaf',
		'./ASTList',

		// ast expressions
		'./BinaryExpr',
		'./NumberLiteral',
		'./BlockStmnt',
		'./IfStmnt',
		'./Name',
		'./NullStmnt',
		'./NegativeExpr',
		'./PrimaryExpr',
		'./StringLiteral',
		'./WhileStmnt',

		// lexer & parser
		'./Lexer',
		'./ExprParser',
		'./BasicParser'
	],
	tests: [
		't/*-test.js'
	]
};