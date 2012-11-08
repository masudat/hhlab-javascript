//ASTree -> ASTLeaf -> NumberLiteral
//                  -> Name
//       -> ASTList -> BinaryExpr

//������

var ASTList = function(){
	//�q�̏W��������
	this.children= [];
};

//�C���X�^���X�𐶐�
ASTList.prototype = new ASTree();

//i�Ԗڂ̎q��Ԃ�
ASTList.prototype.child = function (i) {
	return this.children[i] || null;
};

//�q�̐���Ԃ�
ASTList.prototype.numChildren = function () {
	//�z��children�̒����i���q�̐��j��Ԃ�
	return this.children.length;
};

//�q��Ԃ�
ASTList.prototype.toString = function () {
	//��̔z�������
	var strings = [];
	//�z��children�i�q�̏W���j�𑖍�
	//�֐�child���Ăяo��
	this.children.forEach(
		function (child) {
			strings.push(child.toString());
		}
	);
	//()��t���ďo��
	return '(' + strings.join(' ') + ')';

};

//�ʒu��\���������Ԃ�
ASTList.prototype.location = function () {
	//null������
	var result = null;
	//�z��children�i�q�̏W���j�𑖍�
	this.children.forEach(
		function (child) {
			if (result) {
				return;
			}
			//�ċA
			var s = child.location();
			if (s) {
				result = s;
			}
		}
	);
	//���ʂ�Ԃ�
	return result;
};