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
	return this.token.getText();
};