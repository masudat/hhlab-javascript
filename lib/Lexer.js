//トークンの定義
//文字列、種類、行番号を持つ
var Token = function (line) {
	this.lineNumber = line;
};

//行番号
Token.prototype.getLineNumber = function () { return this.lineNumber; };
//識別子
Token.prototype.isIdentifier = function () { return false; };
//整数リテラル
Token.prototype.isNumber = function () { return false; };
//文字列リテラル
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


// 数字のトークン
var NumToken = function (line, number) {
	
};


// 識別子のトークン
var IdToken = function (line, id) {

};


// 文字列のトークン
var StrToken = function (line, str) {
	
};


// sourcecodeをtokenに分割するクラス
var Lexer = function (sourcecode) {
	
};

// 実際にtokenに分割して、配列にして返す
Lexer.prototype.read = function () {

};

// インデックスiのtokenを取得
Lexer.prototype.peek = function (i) {

};

// tokenを読み込んでqueueにためる
Lexer.prototype.fillQueue = function (i) {

};

Lexer.prototype.readLine = function () {

};

Lexer.prototype.addToken = function (lineNo, matcher) {

};

var generateTokensPattern = function (tokenTypes) {

};