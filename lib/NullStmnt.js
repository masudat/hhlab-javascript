//��̏ꍇ�̃I�u�W�F�N�g

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

var NullStmnt = function(){
	this.children = [];
};

NullStmnt.prototype = new ASTList();