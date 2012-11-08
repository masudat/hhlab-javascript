//変数名を表すオブジェクト

//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

var Name = function (t) {
	this.empty = [];
	this.token = t;
};
Name.prototype = new ASTLeaf();
Name.prototype.name = function () {
	//トークンフィールドから取り出して返す
	return this.token.getText();
};