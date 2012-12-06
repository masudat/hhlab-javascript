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

var IfStmnt = function (list) {
	this.children = list;
};
IfStmnt.prototype = new ASTList();

//����
IfStmnt.prototype.condition = function () {
	return this.child(0);
};
//����
IfStmnt.prototype.thenBlock = function() {
	return this.child(1);
};

//else
IfStmnt.prototype.elseBlock = function() {
        return this.numChildren() > 2 ? this.child(2) : null;
}
//�o��
IfStmnt.prototype.toString = function() {
        return '(if ' + this.condition() + ' ' + this.thenBlock()
		+ ' else ' + this.elseBlock() + ')';
}