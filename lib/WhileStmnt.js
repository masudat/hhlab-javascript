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

var WhileStmnt = function (list) {
	this.children = list;
};
WhileStmnt.prototype = new ASTList();
//����
WhileStmnt.prototype.condition = function () {
	return this.child(0);
};
//����
WhileStmnt.prototype.body = function () {
	return this.child(1);
};
//�o��
WhileStmnt.prototype.toString = function () {
	//return '(while ' + this.condition() + ' ' + this.body() + ')';
	return '(while ' + this.condition() + ' ' + this.body() + ')';
};
