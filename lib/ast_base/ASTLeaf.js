//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

//葉っぱ


//ASTreeの抽象クラスを実装
var ASTLeaf = function(t){
	this.empty = [];
	//トークンフィールド
	this.token = t;
};

//ASTLeafは、ASTreeのサブクラス
ASTLeaf.prototype = new ASTree();

//葉っぱには子はないので、numChildrenは常に0を返す
ASTLeaf.prototype.numChildren = function(){ return 0; }

//引数i番目の子を返す
ASTLeaf.prototype.child = function(i){
	throw new Error('IndexOutOfBoundsException');
}
ASTLeaf.prototype.children = function () {
};

//文字列を返す
ASTLeaf.prototype.toString = function () {
	return this.token.getText();
};
//行番号を返す
ASTLeaf.prototype.location = function () {
	return 'at line ' + this.token.getLineNumber();
};
//トークンを返す
ASTLeaf.prototype.token = function () {
	return this.token;
};

