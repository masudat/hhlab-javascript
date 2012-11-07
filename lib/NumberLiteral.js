//������\��ASTLeaf

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
	//���l�g�[�N����getNumber���\�b�h���Ă�
	return this.token.getNumber();
}