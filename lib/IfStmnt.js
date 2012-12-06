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

//èåè
IfStmnt.prototype.condition = function () {
	return this.child(0);
};
//èàóù
IfStmnt.prototype.thenBlock = function() {
	return this.child(1);
};

//else
IfStmnt.prototype.elseBlock = function() {
        return this.numChildren() > 2 ? this.child(2) : null;
}
//èoóÕ
IfStmnt.prototype.toString = function() {
        return '(if ' + this.condition() + ' ' + this.thenBlock()
		+ ' else ' + this.elseBlock() + ')';
}