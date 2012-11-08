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
	

	// lexer & parser
	'./Lexer',
	'./ExprParser'

], function () {
	return {};
});