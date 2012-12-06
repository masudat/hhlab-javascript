// �����������f���Ƃ��āA�����ɓ��������߂�js
require(['jquery', '../../lib/main'], function ($) {
	$(function () {
		// �t�H�[����submit���ꂽ��lexer�𑖂点��
		$('#demo-form-lexer').submit(function (e) {
			e.preventDefault();

			// �\�[�X�R�[�h�̓t�H�[����sourcecode������擾
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

			// lexer����
			var lexer = new Lexer(sourcecode);

			// read��token���擾���āA�ЂƂЂƂt�H�[����result���ɏo��
			var token;
			
			//result�̃e�L�X�g�G���A�����Z�b�g
			$('*[name="result"]', this).first().html('');
			//read��token���擾
			while (token = lexer.read()) {
				if (token.lineNumber < 0) {
					break;
				}
				//�ЂƂЂƂo�͂��Ă����B=>[lineNumber]token
				$('*[name="result"]', this).first().append(
					'=> [' + token.lineNumber + '] ' + token + '\n'
				);
			}
		});

		// ExprParser�𑖂点��
		$('#demo-form-exprparser').submit(function (e) {
			e.preventDefault();
			
			//���l�Ƀ\�[�X�R�[�h�̓t�H�[����sourcecode������擾
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';
			
			//Lexer����
			var lexer = new Lexer(sourcecode);
			//ExprParser����
			var p = new ExprParser(lexer);
			//
			var t = p.expression();
			
			//result�̃e�L�X�g�G���A�����Z�b�g
			$('*[name="result"]', this).first().html('');
			//���ʂ𕶎���ɂ��ďo��
			$('*[name="result"]', this).first().html(t.toString());
		});

		// BasicParser�𑖂点��
		$('#demo-form-basicparser').submit(function (e) {
		e.preventDefault();

			//���l�Ƀ\�[�X�R�[�h�̓t�H�[����sourcecode������擾
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';
			var $result = $('*[name="result"]', this).first();
			
			//Lexer����
			var lexer = new Lexer(sourcecode);
			//BasicParser����
			var p = new BasicParser(lexer);
			var t;

			$result.html('');
			
			//�t�@�C���̍Ō�܂œǂ�
			while (lexer.peek(0) != Token.EOF) {
				t = p.program();
				$result.append(t.toString() + '\n');
			}
		});
	});
});