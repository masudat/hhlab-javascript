//basic parser


var BasicParser = function (p) {
	this.lexer = p;
};

//primary
//��{�\���v�f�́A���ʂň͂܂ꂽ�����A�������e�������A���ʎq�i�ϐ��j���A�����񃊃e����
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
		//����ȊO�Ȃ�G���[��Ԃ�
		} else {
			this.parseError(t);
		}
	}
};

//�������A�s�����A���������A�|������@�̗D�揇�ʁB

// factor
//���q�́Aprimary���̂��̂��Aprimary��-����������
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

//���ȏ��̕��@�K�����Q��

//term
//�D��x4 �|���Z�Ɗ���Z�i"*" | "/"�j
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
//���́Afactor��2�����Z�q�Ō��т�������
//�D��x3 �����Z�ƈ����Z ( "+" | "-")
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
//�D��x2 �s����
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
//�D��x1 ������
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
//{}�ň͂܂ꂽstatement�̂����܂�B���ƕ��̊Ԃ�";"�����s�B
BasicParser.prototype.block = function(){
	var statements =[];
	this.token('{');
	
	//
	if (!(this.isToken(';') || this.isToken(Token.EOL))) {
		statements.push(this.statement());
	}

	//�u���b�N�̏I���܂�
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
//�P���Ȏ����Bequation(->inequality ->expression ->term ->factor)
BasicParser.prototype.simple = function(){
	var e;
	e = this.equation();
	return e;
};

//statement
//if�����Awhile�����A�P���Ȏ���(simple�B������Ȃ镶)�B
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
//���̂܂܂��Ƌ�s���܂ށB�u���b�N�̍Ō�̃Z�~�R��������s�s�v�ɑΉ����Ă���
BasicParser.prototype.program = function(){
	var s, n;
	//;�����ɂ���c�H�H
	//�󕶂̏ꍇ�ł��A�����������p�̃I�u�W�F�N�gNullStmnt�����
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
// ���ۂɃp�[�X���s��
BasicParser.prototype.parse = function () {
	return this.program();
};