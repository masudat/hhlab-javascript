var TabView = function (selector) {

	// �^����ꂽselector�̔z���ɂ���a�^�O�̐����擾
	var f = $('a[href]', selector).size();

	// tab�z���a�^�O��href�̒��g(#xxx)�����Ă������łɁA�S�Ă�section����U��\��
	var tab = [];
	for (var i = 0; i < f; i++) {
		$(tab[i] = $('a[href]:eq(' + i + ')', selector).attr('href')).hide();
	}

	// ��ڂ̃^�u�͍ŏ�����\�����Ă���
	$(tab[0]).show();
	$('a[href=' + tab[0] + ']', selector).addClass("active");

	// �^�u���N���b�N���ꂽ�Ƃ��A
	$('a', selector).click(function () {

		// ��U�S����section���\���ɂ��āA�^�u��a�^�O��.active����菜��
		for (var i = 0; i < f; i++) {
			$(tab[i]).hide();
			$('a[href=' + tab[i] + ']', selector).removeClass("active");
		}

		// �N���b�N���ꂽ�^�u�ɑΉ�����section��\�������āA�^�u��a�^�O��.active��t����
		$($(this).addClass("active").attr("href")).show();

		// �X�N���[�������Ȃ�
		return false;
	});

};

var Tab = function () {

};