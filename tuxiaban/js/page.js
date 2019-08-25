$(function() {
	numbox();

    // 首页banner
    if($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
			effect: 'fade',
			next: 'icon-youjiantou',
			prev: 'icon-zuojiantou'
		});
    };

	// 审核中作品提示
	$('#shenhe').on('click', 'li a', function() {
		tipSave('fail', '此作品正在审核中，请稍后查看');
		return false;
	});

	// 审核成功作品删除
	$('.img-list').on('click', '.btn-shanchu', function() {
		var $li = $(this).parents('li');
		var $title = $li.find('p').text();
		confirmMsg(null, '你确定要删除“ ' + $title + '”吗？<br>删除后将不可恢复 ', function() {
			$li.remove();
		});
	});

	// 审核失败作品删除
	$('.sh-list').on('click', '.btn-shanchu', function() {
	    var $li = $(this).parents('li');
	    var $title = $li.find('.tit').text();
	    confirmMsg(null, '你确定要删除“ ' + $title + '”吗？<br>删除后将不可恢复 ', function() {
	        $li.remove();
	    });
	});

	// form通用下拉
	$('body').on('mouseover', '.item-select dd', function() {
		console.log(111)
		if ($(this).find('.select-list').is(':hidden')) {
		    console.log(222)
			$('.select-list').hide();
			$('.item-select').css('z-index', 'auto');
			$(this).parents('.item-select').css('z-index', '980');
			$(this).find('.select-list').show();
		}
		return false;
	})
	.on('click', '.select-list li', function() {
		var txtDom = $(this).parents('.item-select').find('.input');
		if (txtDom.is('input')) {
			txtDom.val($(this).text());
		} else {
			txtDom.html($(this).text());
		}
		txtDom.focus().blur();
		$(this).parents('.select-list').hide();
		$('.item-select').css('z-index', 'auto');
		return false;
	})
	.on('mouseout', '.item-select dd', function() {
		if ($('.select-list').is(':visible')) {
			$('.select-list').hide();
		}
	});
});

// 字数判断
function numbox() {
    if ($('.num-box').length) {
        $.each($('.num-box'), function(i) {
            monitorVal($(this).parent().find('.input'), $(this).find('.num').text(), 'minus');
        });
    }
}