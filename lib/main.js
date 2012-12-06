define([
	// ast base
	'./ast_base/ASTree',
	'./ast_base/ASTLeaf',
	'./ast_base/ASTList',

	// ast expressions
	'./ast_expression/NumberLiteral',
	'./ast_expression/BinaryExpr',
	'./ast_expression/Name',
	
	//
	'./NullStmnt',
	'./PrimaryExpr',
	'./NegativeExpr',
	'./BlockStmnt',
	'./IfStmnt',
	'./WhileStmnt',
	'./StringLiteral',

	// lexer & parser
	'./Lexer',
	'./ExprParser',
	'./BasicParser'
	//'./BasicParser-o'

], function () {
	return {};
});