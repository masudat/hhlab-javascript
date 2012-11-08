//�񍀉��Z��\������I�u�W�F�N�g

//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

// ExprPerser��BinaryExpr�̏W�܂�����ʂƂ��ĕԂ�

var BinaryExpr = function (list) {
	this.children = list;
};
//�C���X�^���X�𐶐�
BinaryExpr.prototype = new ASTList();
//����
BinaryExpr.prototype.left = function () {
	return this.child(0);
};
//���Z�q
BinaryExpr.prototype.operator = function () {
	return this.child(1).token.getText();
};
//�E��
BinaryExpr.prototype.right = function () {
	return this.child(2);
};
