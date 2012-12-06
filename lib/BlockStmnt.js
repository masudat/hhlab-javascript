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

var BlockStmnt = function (list) {
	this.children = list;
};
BlockStmnt.prototype = new ASTList();