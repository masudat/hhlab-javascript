//二項演算を表現するオブジェクト

//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

// ExprPerserはBinaryExprの集まりを結果として返す

var BinaryExpr = function (list) {
	this.children = list;
};
//インスタンスを生成
BinaryExpr.prototype = new ASTList();
//左辺
BinaryExpr.prototype.left = function () {
	return this.child(0);
};
//演算子
BinaryExpr.prototype.operator = function () {
	return this.child(1).token.getText();
};
//右辺
BinaryExpr.prototype.right = function () {
	return this.child(2);
};
