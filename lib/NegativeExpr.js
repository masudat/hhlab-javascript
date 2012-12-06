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

var NegativeExpr = function (list) {
	this.children = list;
};
NegativeExpr.prototype = new ASTList();

NegativeExpr.prototype.operand = function() {
	return this.child(0);
};
NegativeExpr.prototype.toString = function() {
        return "-" + this.operand();
};