//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

//�t����


//ASTree�̒��ۃN���X������
var ASTLeaf = function(t){
	this.empty = [];
	//�g�[�N���t�B�[���h
	this.token = t;
};

//ASTLeaf�́AASTree�̃T�u�N���X
ASTLeaf.prototype = new ASTree();

//�t���ςɂ͎q�͂Ȃ��̂ŁAnumChildren�͏��0��Ԃ�
ASTLeaf.prototype.numChildren = function(){ return 0; }

//����i�Ԗڂ̎q��Ԃ�
ASTLeaf.prototype.child = function(i){
	throw new Error('IndexOutOfBoundsException');
}
ASTLeaf.prototype.children = function () {
};

//�������Ԃ�
ASTLeaf.prototype.toString = function () {
	return this.token.getText();
};
//�s�ԍ���Ԃ�
ASTLeaf.prototype.location = function () {
	return 'at line ' + this.token.getLineNumber();
};
//�g�[�N����Ԃ�
ASTLeaf.prototype.token = function () {
	return this.token;
};

