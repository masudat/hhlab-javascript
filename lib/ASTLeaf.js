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
//ASTLeaf.prototype.numChildren = function(){ return 0; }

//����i�Ԗڂ̎q��Ԃ�
//ASTLeaf.prototype.child = function(i){
//	throw new Error('IndexOutOfBoundsException');
//}

//


