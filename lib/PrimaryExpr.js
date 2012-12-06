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

var PrimaryExpr = function (list){
	this.children = list;
}
PrimaryExpr.prototype = new ASTList();
PrimaryExpr.prototype.create = function(c){
	return c.length() == 1 ? c.get(0) : new PrimaryExpr(c);
};