//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

//根っこ

var ASTList = function(){
	this.children= [];
};

//インスタンスを生成
ASTList.prototype = new ASTree();


ASTList.prototype.child = function (i) {
	return this.children[i] || null;
};

ASTList.prototype.numChildren = function () {
	return this.children.length;
};

ASTList.prototype.toString = function () {
	var strings = [];

	this.children.forEach(function (child) {
		strings.push(child.toString());
	});

	return '(' + strings.join(' ') + ')';

};

ASTList.prototype.location = function () {
	var result = null;

	this.children.forEach(function (child) {
		if (result) {
			return;
		}

		var s = child.location();
		if (s) {
			result = s;
		}
	});

	return result;
};