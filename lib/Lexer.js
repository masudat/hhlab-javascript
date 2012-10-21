//トークンの定義
var Token = function (line) {
	this.lineNumber = line;
};

//行番号、トークンの種類（IdentifierかNumberかStringか）、中身（NumberかTextかStringか）を持つ
//行番号を取ってくる
Token.prototype.getLineNumber = function () { return this.lineNumber; };
//識別子かどうか
Token.prototype.isIdentifier = function () { return false; };
//整数リテラルかどうか
Token.prototype.isNumber = function () { return false; };
//文字列リテラルかどうか
Token.prototype.isString = function () { return false; };
//数値を返す
Token.prototype.getNumber = function () {
	throw new Error('not number token');
};
//識別子などを返す
Token.prototype.getText = function () {
	return '';
};
//文字列を返す
Token.prototype.toString = function () {
	return this.getText();
};

//ファイルの最後
Token.EOF = new Token(-1);
//一行の最後
Token.EOL = '\\n';


// 数字のトークン
var NumToken = function (line, number) {
	//行番号を入れる
	this.lineNumber = line
	//数字をvalueに入れる
	this.value = number|0;
};
//数字のトークンを生成する(NumTokenはTokenのサブクラス)
NumToken.prototype = new Token();
//整数リテラルかどうかのフラグをtrueにする
NumToken.prototype.isNumber = function(){
	return true;
}
//空白文字と連結して、数値を文字列に変換して返す
NumToken.prototype.getText = function (){
	return this.value + '';
}
//数字を数値として返す
NumToken.prototype.getNumber = function (){
	return this.value;
}


// 識別子のトークン
var IdToken = function (line, id) {
	//行番号を入れる
	this.lineNumber =  line;
	//識別子をtextに入れる
	this.text = id;
};
//識別子のトークンを生成する（IdTokenはTokenのサブクラス）
IdToken.prototype = new Token();
//識別子かどうかのフラグをtrueにする
IdToken.prototype.isIdentifier = function(){
	return true;
}
//


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