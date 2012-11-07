// 二項演算を表現する
// ExprPerserが結果として返すのはこのBinaryExprの集まり

// 継承関係: ASTree > ASTList > BinaryExpr
// 構文木の1要素(=節 =ASTree)の中で、子要素を持つもの(=根 =ASTList)の中で、二項演算を表すものが、BinaryExpr

var BinaryExpr = function (list) {
	this.children = list;
};
BinaryExpr.prototype = new ASTList();
BinaryExpr.prototype.left = function () {
	return this.child(0);
};
BinaryExpr.prototype.operator = function () {
	return this.child(1).token.getText();
};
BinaryExpr.prototype.right = function () {
	return this.child(2);
};
