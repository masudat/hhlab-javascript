//�g�[�N���̒�`
//������A��ށA�s�ԍ�������
var Token = function (line) {
	this.lineNumber = line;
};

//�s�ԍ�
Token.prototype.getLineNumber = function () { return this.lineNumber; };
//���ʎq
Token.prototype.isIdentifier = function () { return false; };
//�������e����
Token.prototype.isNumber = function () { return false; };
//�����񃊃e����
Token.prototype.isString = function () { return false; };

Token.prototype.getNumber = function () {
	throw new Error('not number token');
};
Token.prototype.getText = function () {
	return '';
};
Token.prototype.toString = function () {
	return this.getText();
};

Token.EOF = new Token(-1);
Token.EOL = '\\n';


// �����̃g�[�N��
var NumToken = function (line, number) {
	
};


// ���ʎq�̃g�[�N��
var IdToken = function (line, id) {

};


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