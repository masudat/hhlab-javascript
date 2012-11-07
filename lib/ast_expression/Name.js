var Name = function (t) {
	this.empty = [];
	this.token = t;
};
Name.prototype = new ASTLeaf();
Name.prototype.name = function () {
	return this.token.getText();
};