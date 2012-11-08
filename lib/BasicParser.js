//basic parser


var BasicParser = function (p) {
	this.lexer = p;
};

//���ȏ����X�g5.1��program�ɑΉ�
BasicParser.prototype.program = function(){
	var statement;
	if(this.isToken(';') || this.isToken(Token.EOL)){
	}else{
		//�󕶂̏ꍇ�ł��A�����������p�̃I�u�W�F�N�gNullStmnt�����
	}
	return;
}

//statement�ɑΉ�
BasicParser.prototype.statement = function(){
	if(this.isToken('if')){
	}
	else if(this.isToken('while'))
	}
	else{
	
	}


// ���ȏ��̃��X�g4.7��expression�ɑΉ��AASTree(BinaryExpr��NumberLiteral)��Ԃ�
// BNF���@�K��: term { ('+' | '-') term }
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

// ���ȏ��̃��X�g4.7��term�ɑΉ��AASTree(BinaryExpr��NumberLiteral)��Ԃ�
// BNF���@�K��: factor { ( '*' | '/' ) factor }
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

// ���ȏ��̃��X�g4.7��factor�ɑΉ��AASTree(BinaryExpr��NumberLiteral)��Ԃ�
// BNF���@�K��: NUMBER | '(' expression ')'
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


// �p�[�X�Ɏ��s�������p�̊֐� �G���[�𓊂���
BasicParser.prototype.parseError = function (errorToken) {
	throw new Error(
		'parse error. invalid token "' + errorToken +  '" ' +
			'at line ' + errorToken.lineNumber + '.'
	);
};

// lexer���token���ЂƂ�����Ă���
// �w�肵��name�ƈقȂ�token���Ԃ��Ă�����G���[���o��
// name���w�肹����token���擾�������Ƃ��́A���� lexer.read() ���g���Ă���
BasicParser.prototype.token = function (name) {
	var t = this.lexer.read();
	if (!(t.isIdentifier() && name == t.getText())) {
		this.parseError(t);
	}

};

// lexer�����ɏo���Ă���token�����Ȃ̂��m�F����
BasicParser.prototype.isToken = function (name) {
	var t = this.lexer.peek(0);
	return t.isIdentifier() && name == t.getText();
};