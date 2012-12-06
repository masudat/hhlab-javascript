// 作った言語をデモとして、試しに動かすためのjs
require(['jquery', '../../lib/main'], function ($) {
	$(function () {
		// フォームがsubmitされたらlexerを走らせる
		$('#demo-form-lexer').submit(function (e) {
			e.preventDefault();

			// ソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';

			// lexer生成
			var lexer = new Lexer(sourcecode);

			// readでtokenを取得して、ひとつひとつフォームのresult欄に出力
			var token;
			
			//resultのテキストエリアをリセット
			$('*[name="result"]', this).first().html('');
			//readでtokenを取得
			while (token = lexer.read()) {
				if (token.lineNumber < 0) {
					break;
				}
				//ひとつひとつ出力していく。=>[lineNumber]token
				$('*[name="result"]', this).first().append(
					'=> [' + token.lineNumber + '] ' + token + '\n'
				);
			}
		});

		// ExprParserを走らせる
		$('#demo-form-exprparser').submit(function (e) {
			e.preventDefault();
			
			//同様にソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';
			
			//Lexer生成
			var lexer = new Lexer(sourcecode);
			//ExprParser生成
			var p = new ExprParser(lexer);
			//
			var t = p.expression();
			
			//resultのテキストエリアをリセット
			$('*[name="result"]', this).first().html('');
			//結果を文字列にして出力
			$('*[name="result"]', this).first().html(t.toString());
		});

		// BasicParserを走らせる
		$('#demo-form-basicparser').submit(function (e) {
		e.preventDefault();

			//同様にソースコードはフォームのsourcecode欄から取得
			var sourcecode = $('*[name="sourcecode"]', this).first().val() || '';
			var $result = $('*[name="result"]', this).first();
			
			//Lexer生成
			var lexer = new Lexer(sourcecode);
			//BasicParser生成
			var p = new BasicParser(lexer);
			var t;

			$result.html('');
			
			//ファイルの最後まで読む
			while (lexer.peek(0) != Token.EOF) {
				t = p.program();
				$result.append(t.toString() + '\n');
			}
		});
	});
});