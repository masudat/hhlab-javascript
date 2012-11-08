//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

//根っこ

var ASTList = function(){
	//子の集合を持つ
	this.children= [];
};

//インスタンスを生成
ASTList.prototype = new ASTree();

//i番目の子を返す
ASTList.prototype.child = function (i) {
	return this.children[i] || null;
};

//子の数を返す
ASTList.prototype.numChildren = function () {
	//配列childrenの長さ（＝子の数）を返す
	return this.children.length;
};

//子を返す
ASTList.prototype.toString = function () {
	//空の配列を準備
	var strings = [];
	//配列children（子の集合）を走査
	//関数childを呼び出し
	this.children.forEach(
		function (child) {
			strings.push(child.toString());
		}
	);
	//()を付けて出力
	return '(' + strings.join(' ') + ')';

};

//位置を表す文字列を返す
ASTList.prototype.location = function () {
	//nullを入れる
	var result = null;
	//配列children（子の集合）を走査
	this.children.forEach(
		function (child) {
			if (result) {
				return;
			}
			//再帰
			var s = child.location();
			if (s) {
				result = s;
			}
		}
	);
	//結果を返す
	return result;
};