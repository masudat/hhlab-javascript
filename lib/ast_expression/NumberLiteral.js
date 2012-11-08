//数字を表すオブジェクト

//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

var NumberLiteral = function(t){
	this.empty = [];
	this.token = t;
};
//インスタンス生成
NumberLiteral.prototype = new ASTLeaf();
//数値を返す
NumberLiteral.prototype.value = function(){
	//トークンフィールドから整数リテラルを取り出して返す
	return this.token.getNumber();
}