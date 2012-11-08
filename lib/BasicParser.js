//basic parser


var BasicParser = function (p) {
	this.lexer = p;
};

//教科書リスト5.1のprogramに対応
BasicParser.prototype.program = function(){
	var statement;
	if(this.isToken(';') || this.isToken(Token.EOL)){
	}else{
		//空文の場合でも、それを示す専用のオブジェクトNullStmntを作る
	}
	return;
}

//statementに対応
BasicParser.prototype.statement = function(){
	if(this.isToken('if')){
	}
	else if(this.isToken('while'))
	}
	else{
	
	}


// 教科書のリスト4.7のexpressionに対応、ASTree(BinaryExprかNumberLiteral)を返す
// BNF文法規則: term { ('+' | '-') term }
ExprParser.prototype.expression = function () {
	var op, right;
	var left = this.term();

	while (this.isToken('+') || this.isToken('-')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.term();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

// 教科書のリスト4.7のtermに対応、ASTree(BinaryExprかNumberLiteral)を返す
// BNF文法規則: factor { ( '*' | '/' ) factor }
ExprParser.prototype.term = function () {
	var op, right;
	var left = this.factor();

	while (this.isToken('*') || this.isToken('/')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.factor();
		left = new BinaryExpr([left, op, right]);
	}

	return left;
};

// 教科書のリスト4.7のfactorに対応、ASTree(BinaryExprかNumberLiteral)を返す
// BNF文法規則: NUMBER | '(' expression ')'
ExprParser.prototype.factor = function () {
	var e, t, n;

	if (this.isToken('(')) {
		this.token('(');
		e = this.expression();
		this.token(')');
		return e;
	} else {
		t = this.lexer.read();
		if (t.isNumber) {
			n = new NumberLiteral(t);
			return n;
		} else {
			this.parseError(t);
		}
	}
};


// パースに失敗した時用の関数 エラーを投げる
BasicParser.prototype.parseError = function (errorToken) {
	throw new Error(
		'parse error. invalid token "' + errorToken +  '" ' +
			'at line ' + errorToken.lineNumber + '.'
	);
};

// lexerよりtokenをひとつもらってくる
// 指定したnameと異なるtokenが返ってきたらエラーを出す
// nameを指定せずにtokenを取得したいときは、直接 lexer.read() を使っている
BasicParser.prototype.token = function (name) {
	var t = this.lexer.read();
	if (!(t.isIdentifier() && name == t.getText())) {
		this.parseError(t);
	}

};

// lexerが次に出してくるtokenが何なのか確認する
BasicParser.prototype.isToken = function (name) {
	var t = this.lexer.peek(0);
	return t.isIdentifier() && name == t.getText();
};