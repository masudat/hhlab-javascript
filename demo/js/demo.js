// �����������f���Ƃ��āA�����ɓ��������߂�js
require(['jquery', '../../lib/main'], function ($) {
	$(function () {
		// lexer�𑖂点��
		$('#demo-form-lexer').submit(function (e) {
			e.preventDefault();

			// �\�[�X�R�[�h�̓t�H�[����sourcecode������擾
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

			// lexer����
			var lexer = new Lexer(sourcecode);

			// read��token���擾���āA�ЂƂЂƂo��
			var token;

			$('*[name="result"]', this).first().html('');
			while (token = lexer.read()) {
				if (token.lineNumber < 0) {
					break;
				}
				$('*[name="result"]', this).first().append(
					'=> [' + token.lineNumber + '] ' + token + '\n'
				);
			}
		});

		// ExprParser�𑖂点��
		//$('#demo-form-exprparser').submit(function (e) {
		//});

		// BasicParser�𑖂点��
		//$('#demo-form-basicparser').submit(function (e) {
		//});
	});
});