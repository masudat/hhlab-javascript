//数字を表すASTLeaf

var NumberLiteral = function(t){
	this.empty = [];
	this.token = t;
};
//インスタンス生成
NumberLiteral.prototype = new ASTLeaf();
//数値を返す
NumberLiteral.prototype.value = function(){
	//数値トークンのgetNumberメソッドを呼ぶ
	return this.token.getNumber();
}