//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

// �񍀉��Z��\������
// ExprPerser�����ʂƂ��ĕԂ��̂͂���BinaryExpr�̏W�܂�

// �p���֌W: ASTree > ASTList > BinaryExpr
// �\���؂�1�v�f(=�� =ASTree)�̒��ŁA�q�v�f��������(=�� =ASTList)�̒��ŁA�񍀉��Z��\�����̂��ABinaryExpr

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
