//�g�[�N���̒�`
var Token = function (line) {
	this.lineNumber = line;
};

//�s�ԍ��A�g�[�N���̎�ށiIdentifier��Number��String���j�A���g�iNumber��Text��String���j������
//�s�ԍ�������Ă���
Token.prototype.getLineNumber = function () { return this.lineNumber; };
//���ʎq���ǂ���
Token.prototype.isIdentifier = function () { return false; };
//�������e�������ǂ���
Token.prototype.isNumber = function () { return false; };
//�����񃊃e�������ǂ���
Token.prototype.isString = function () { return false; };
//���l��Ԃ�
Token.prototype.getNumber = function () {
	throw new Error('not number token');
};
//���ʎq�Ȃǂ�Ԃ�
Token.prototype.getText = function () {
	return '';
};
//�������Ԃ�
Token.prototype.toString = function () {
	return this.getText();
};

//�t�@�C���̍Ō�
Token.EOF = new Token(-1);
//��s�̍Ō�
Token.EOL = '\\n';


// �����̃g�[�N��
var NumToken = function (line, number) {
	//�s�ԍ�������
	this.lineNumber = line
	//������value�ɓ����
	this.value = number|0;
};
//�����̃g�[�N���𐶐�����(NumToken��Token�̃T�u�N���X)
NumToken.prototype = new Token();
//�������e�������ǂ����̃t���O��true�ɂ���
NumToken.prototype.isNumber = function(){
	return true;
}
//�󔒕����ƘA�����āA���l�𕶎���ɕϊ����ĕԂ�
NumToken.prototype.getText = function (){
	return this.value + '';
}
//�����𐔒l�Ƃ��ĕԂ�
NumToken.prototype.getNumber = function (){
	return this.value;
}


// ���ʎq�̃g�[�N��
var IdToken = function (line, id) {
	//�s�ԍ�������
	this.lineNumber =  line;
	//���ʎq��text�ɓ����
	this.text = id;
};
//���ʎq�̃g�[�N���𐶐�����iIdToken��Token�̃T�u�N���X�j
IdToken.prototype = new Token();
//���ʎq���ǂ����̃t���O��true�ɂ���
IdToken.prototype.isIdentifier = function(){
	return true;
}
//


// ������̃g�[�N��
var StrToken = function (line, str) {
	
};


// sourcecode��token�ɕ�������N���X
var Lexer = function (sourcecode) {
	
};

// ���ۂ�token�ɕ������āA�z��ɂ��ĕԂ�
Lexer.prototype.read = function () {

};

// �C���f�b�N�Xi��token���擾
Lexer.prototype.peek = function (i) {

};

// token��ǂݍ����queue�ɂ��߂�
Lexer.prototype.fillQueue = function (i) {

};

Lexer.prototype.readLine = function () {

};

Lexer.prototype.addToken = function (lineNo, matcher) {

};

var generateTokensPattern = function (tokenTypes) {

};