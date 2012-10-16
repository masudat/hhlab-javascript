function run() {
	form.out.value = lex(form.src.value);
}
function lex(str) {
	var rc = [];
	var defs = [
		/(^\/{2,}[^\r\n]*(?:\r\n|\r|\n|))|(^\/\*[\s\S]*?\*\/)/, function () { return "COMMENT";},
		/(^[a-zA-Z_][a-zA-Z_0-9]*)|^[&][&]|^[\|][\|]|^[\+][\+]|^[\-][\-]|^[<][<]|^[>][>]|^[=][=][=]|^[=][=]|^[!][=][=]|^[<][=]|^[>][=]|(^[\=\+\-\*\/<>{}])|\p{P}/, function () { return "IDENTIER";},
		/^[0-9]+(\.[0-9]+)?/, function () { return "NUMBER";},
		/(^"(?:\\[\s\S]|[^"\r\n\\])*")|(^'(?:\\[\s\S]|[^'\r\n\\])*')/, function () { return "STRING";},
		///^[\=\+\-\*\/]/, function () { return "OPERATOR";},
		/^\(/, function () { return "LPAREN";},
		/^\)/, function () { return "RPAREN";},
		/^[ \t\r\n]+/, function () {}
	];
	for (var i = 0; i < defs.length; i+=2) {
		var m = str.match(defs[i]);
		if (m != null && m.length > 0 && m[0].length > 0) {
			str = str.substring(m[0].length);
			var type = defs[i+1]();
			if (type != null) {
				rc[rc.length] = m[0] + ":" + type;
			}
			i = -2;
			continue;
		}
	}
	if (str.length > 0) rc[rc.length] = "error " + str;
	return rc.join("\n");
}

