//������\���I�u�W�F�N�g

//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

var NumberLiteral = function(t){
	this.empty = [];
	this.token = t;
};
//�C���X�^���X����
NumberLiteral.prototype = new ASTLeaf();
//���l��Ԃ�
NumberLiteral.prototype.value = function(){
	//�g�[�N���t�B�[���h���琮�����e���������o���ĕԂ�
	return this.token.getNumber();
}