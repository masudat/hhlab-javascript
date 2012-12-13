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
	
	//interpreter
	'./BasicEnv',
	'./BasicEvaluator',
	

	// lexer & parser
	'./Lexer',
	'./ExprParser',
	'./BasicParser'

], function () {
	return {};
});