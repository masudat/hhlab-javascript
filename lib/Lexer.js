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
//���ʎq��Ԃ�
IdToken.prototype.getText = function(){
	return this.text;
}


// ������̃g�[�N��
var StrToken = function (line, str) {
	//�s�ԍ�������
	this.lineNumber = line
	//����������o���āAliteral�ɓ����
	this.literal = str
		.replace(/^"|"$/g, '') //"�Ŏn�܂镶����A"�ŏI��镶����͂���"������ē����
		.replace(/\\"/g, '"'); //\"�Ȃ�A�u���������̂܂�"�Ƃ��ē����
};
//������̃g�[�N���𐶐�����(StrToken��Token�̃T�u�N���X)
StrToken.prototype = new Token();
//�����񂩂ǂ����̃t���O��true�ɂ���
StrToken.prototype.isString = function(){
	return true;
}
//�������Ԃ�
StrToken.prototype.getText = function (){
	return this.literal;
}



// sourcecode��token�ɕ�������N���X
var Lexer = function (sourcecode) {
	//�e�L�X�g�G���A�̃t�H�[�����玝���Ă����\�[�X�R�[�h���܂���s���ɕ�������B
	//split���g���āA���s�����ŋ�؂��Ă���
	this.sourcecode = sourcecode.split(/\n/);
	
	//�f�[�^�����邩
	this.hasMore = true;
	//�g�[�N�������邽�߂̔z�񏀔�
	this.queue = [];
	//�s�ԍ��͂O�ŏ�����
	this.lineNo = 0;
	
	//�g�[�N���̎��(num��id��str��)
	this.tokenTypes = [
		{
			//�������e����
			tokenClass: NumToken,
			pattern: /[\d]+/
		},
		{
			//���ʎq	
			tokenClass: IdToken,
			pattern: /[A-Z_a-z][A-Z_a-z0-9]*|==|<=|>=|&&|\\|\||{|}|\+|-|\*|\/|=|<|>/
		},
		{
			//�����񃊃e����	
			tokenClass: StrToken,
			pattern: /"(\\"|\\\\|\\n|[^"])*"/
		}
	];
	
	//���K�\������������
	this.pattern = generateTokensPattern(this.tokenTypes);;
};

// token��ǂݍ����queue�ɂ��߂�
Lexer.prototype.fillQueue = function (i) {
	// i���w�肵�āA�uthis.queue[i]�����݂���v�悤�ɂȂ�܂œǂݍ���
	// (�܂�i�́A�u��ǂ݂��Ă����C���f�b�N�X���v�Ƃ�������)
	
	while (this.queue.length <= i){
		//�f�[�^�����邩
		if(this.hasMore){
			//��������ǂ�
			this.readLine();
		}else{
			//�����������ǂݏI��
			return false;
		}
	}
	return true;
};

// ���ۂ�token�ɕ������āA�z��ɂ��ĕԂ�
Lexer.prototype.read = function () {
	if(this.fillQueue(0)){
		//shift�Ńf�[�^�̎��o��
		return this.queue.shift();
	}else{
		//�t�@�C���̏I���
		return Token.EOF;
	}
};

// �C���f�b�N�Xi��token���擾
Lexer.prototype.peek = function (i) {
	//i�Ԗڂ̃L���[
	if(this.fillQueue(i)){
		return this.queue[0];
	}else{
		//�t�@�C���̏I���
		return Token.EOF;
	}
};


//��s���ǂ�
Lexer.prototype.readLine = function () {
	//�z��sourcecode�̈�ԍŏ��̃f�[�^���Ƃ��Ă���
	var line = this.sourcecode.shift();
	//�f�[�^������������I���̃t���O�𗧂Ă�
	if(typeof line == 'undefined'){
		this.hasMore = false;
		return;
	}
	
	//�s�ԍ����ЂƂ��₷
	this.lineNo++;
	var lineNo = this.lineNo;
	
	//��s�Ԃ�̃f�[�^���琳�K�\���Ƀ}�b�`���������������matcher�ɓ����
	var matcher;
	while (matcher = line.match(this.pattern)){
		this.addToken(lineNo, matcher);
		//�i�񂾃C���f�b�N�X�Ԃ񂩂�Ō�̕����܂ŁA�V�������������������ĕԂ�
		line = line.slice(matcher.index + matcher[0].length);
	}
	//�L���[�ɍs�ԍ��ƃt�@�C���̏I���ڈ��������IdToken�I�u�W�F�N�g������
	this.queue.push(new IdToken(lineNo, Token.EOL));

};


//�g�[�N����ǉ�����
Lexer.prototype.addToken = function (lineNo, matcher) {
	for(var i=0; i < this.tokenTypes.length; i++){
		//�f�[�^��������
		if(matcher[i+1]){
			//�L���[�Ƀg�[�N���i��ނƍs�ԍ��Ɠ��e�j������
			this.queue.push(
				new this.tokenTypes[i].tokenClass(lineNo, matcher[0])
			);
		}
	}
};


//3��ނ̃g�[�N���̐��K�\������������
var generateTokensPattern = function (tokenTypes) {
	//����锠������
	var exps = [];
	//�R��ނ̃g�[�N���̐��K�\�����Ȃ���
	tokenTypes.forEach(function (tokenType) {
		exps.push(
			(tokenType.pattern + '') //���K�\���𕶎���ɂ���
				.replace(/^\//, '(') //�ŏ���/��(�ɒu������
				.replace(/\/$/, ')') //�Ō��/��)�ɒu������
		);
	});
	return new RegExp(exps.join('|')); //|�ł������ĕԂ�
};