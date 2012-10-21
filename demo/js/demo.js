// 作った言語をデモとして、試しに動かすためのjs
require(['jquery', '../../lib/main'], function ($) {
	$(function () {
		// lexerを走らせる
		$('#demo-form-lexer').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

			// lexer生成
			var lexer = new Lexer(sourcecode);

			// readでtokenを取得して、ひとつひとつ出力
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

		// ExprParserを走らせる
		//$('#demo-form-exprparser').submit(function (e) {
		//});

		// BasicParserを走らせる
		//$('#demo-form-basicparser').submit(function (e) {
		//});
	});
});