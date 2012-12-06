//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//                  -> StringLiteral
//       -> ASTList -> BinaryExpr
//                  -> NullStmnt
//                  -> IfStmnt
//                  -> WhileStmnt
//                  -> BlockStmnt
//                  -> NegativeExpr
//                  -> PrimaryExpr

var StringLiteral = function (t) {
	this.empty = [];
	this.token = t;
};
StringLiteral.prototype = new ASTLeaf();

StringLiteral.prototype.value = function() {
	return this.token.getText();
}