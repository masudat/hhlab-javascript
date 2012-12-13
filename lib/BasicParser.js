//basic parser


var BasicParser = function (p) {
	this.lexer = p;
};

//primary
//基本構成要素は、括弧で囲まれた式か、整数リテラルか、識別子（変数）か、文字列リテラル
BasicParser.prototype.primary = function () {
	var e, t, n, i, s;

	//"(" expr ")"
	if (this.isToken('(')) {
		this.token('(');
		e = this.equation();
		this.token(')');
		return e;
	} else {
		t = this.lexer.read();
		//NUMBER
		if (t.isNumber()) {
			n = new NumberLiteral(t);
			return n;
		//IDENTIFIER
		} else if (t.isIdentifier()){
			i = new Name(t);
			return i;
		//STRING
		} else if (t.isString()){
			s = new StringLiteral(t);
			return s;
		//それ以外ならエラーを返す
		} else {
			this.parseError(t);
		}
	}
};

//方程式、不等式、足し引き、掛け割り　の優先順位。

// factor
//因子は、primaryそのものか、primaryに-がついたもの
BasicParser.prototype.factor = function () {
	//"-" primary
	if(this.isToken('-')){
		var op = new ASTLeaf(this.token('-'));
		return new NegativeExpr([this.primary()]);
	//primary
	} else {
		return this.primary();
	}
};

//教科書の文法規則を参照

//term
//優先度4 掛け算と割り算（"*" | "/"）
BasicParser.prototype.term = function () {
	var op, right;
	var left = this.factor();

	while (this.isToken('*') || this.isToken('/') || this.isToken('%')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.factor();
		left = new BinaryExpr([left, op, right]);
	}
	return left;
};

//expression
//式は、factorを2項演算子で結びつけたもの
//優先度3 足し算と引き算 ( "+" | "-")
BasicParser.prototype.expression = function(){
	var op, right;
	var left = this.term();

	while (this.isToken('+') || this.isToken('-')) {
		op = new ASTLeaf(this.lexer.read());
		right = this.term();
		left = new BinaryExpr([left, op, right]);
	}
	return left;
};

//inequality
//優先度2 不等式
BasicParser.prototype.inequality = function(){
	var op, right;
	var left = this.expression();
	
	while(this.isToken('==') || this.isToken('>')|| this.isToken('<')){
		op = new ASTLeaf(this.lexer.read());
		right = this.expression();
		left = new BinaryExpr([left, op, right]);
	}
	return left;
};

//equation
//優先度1 方程式
BasicParser.prototype.equation = function(){
	var op, right;
	var left = this.inequality();
	
	while(this.isToken('=')){
		op = new ASTLeaf(this.lexer.read());
		right = this.equation();
		left = new BinaryExpr([left, op, right]);
	}
	return left;
};



//block
//{}で囲まれたstatementのかたまり。文と文の間は";"か改行。
BasicParser.prototype.block = function(){
	var statements =[];
	this.token('{');
	
	//
	if (!(this.isToken(';') || this.isToken(Token.EOL))) {
		statements.push(this.statement());
	}

	//ブロックの終わりまで
	while (!this.isToken('}')) {
		if (!(this.isToken(';') || this.isToken(Token.EOL))) {
			this.parseError(this.lexer.read());
		}
		// (';' | EOL)
		this.lexer.read();

		if (!(this.isToken(';') || this.isToken(Token.EOL) || this.isToken('}'))) {
			statements.push(this.statement());
		}
	}
	this.token('}');
	return new BlockStmnt(statements);
};


//simple
//単純な式文。equation(->inequality ->expression ->term ->factor)
BasicParser.prototype.simple = function(){
	var e;
	e = this.equation();
	return e;
};

//statement
//if文か、while文か、単純な式文(simple。式からなる文)。
BasicParser.prototype.statement = function () {
	var i, e, b1, b2, s, t;
	if (this.isToken('if')) {
		this.token('if');
		if(this.isToken('(')){
			this.token('(');
			e = this.equation();
			this.token(')');
			b1 = this.block();
			i = new IfStmnt([e, b1]);
			if ( this.isToken('else')) {
				this.token('else');
				b2 = this.block();
				i = new IfStmnt([e, b1, b2]);
			}
			return i;
		}
		else{
			//this.parseError(this.lexer.read());
			this.parseError(this.lexer.read());
		}
	} else if (this.isToken('while')) {
		this.token('while');
		if(this.isToken('(')){
			this.token('(');
			e = this.equation();
			this.token(')');
			b1 = this.block();
			i = new WhileStmnt([e, b1]);
			return i;
		}
		else{
			this.parseError(this.lexer.read());
		}
	} else {
		s = this.simple();
		return s;
	}
};


//program
//このままだと空行も含む。ブロックの最後のセミコロンや改行不要に対応している
BasicParser.prototype.program = function(){
	var s, n;
	//;だけにする…？？
	//空文の場合でも、それを示す専用のオブジェクトNullStmntを作る
	if(this.isToken(';') || this.isToken(Token.EOL)){
		n = this.lexer.read();
		return new NullStmnt();
	}else{
		s = this.statement();
		n = this.lexer.read();
		return s;
	}
};


/////////////////////////

//errorToken
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
// 実際にパースを行う
BasicParser.prototype.parse = function () {
	return this.program();
};