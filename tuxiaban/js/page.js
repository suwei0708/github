// 上传页编辑变量存储
var editName;
$(function() {
	numbox();

	// 通用列表下载
	var $down = 0; //模拟会员和非会员
	$('.box .list').on('click', '.btn-down', function() {
		var i = $down++ % 2;
		if(i) {
			window.open('会员下载页面.html');
		}
		else {
			$('.popup-openvip').show();
		}
		return false;
	});

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
		if ($(this).find('.select-list').is(':hidden')) {
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

	// 上传页编辑
	$('.up-form').on('click', '.img-edit span', function() {
		editName = $(this).parents('li');
		$('.popup-edit').find('.up-form-box').html($(this).parents('li').html());
		// 修改标签html
		$('.popup-edit').find('.up-form-box').find('.item').eq(2).find('dd').html($('.popup-edit').find('.up-form-box').find('.input').eq(2))
		$('.popup-edit').find('.up-form-box').find('.input').eq(2).attr('id', 'tagValuePopup');
		// 初始化tag标签
		var tagPopup = new Tag({
		    id: 'tagValuePopup',
		    tagtextMin: 2
		}).initView();
		radioSelect($('.popup-edit').find('.up-form-box .radio'))
		$('.popup-edit').show();
	});

	// 上传页删除
	$('body').on('click', '.popup-edit .btn-shanchu', function() {
		var $title = $(this).parents('.up-form').find('.input').eq(0).val();
		confirmMsg(null, '你确定要删除“ ' + $title + '”吗？<br>删除后将不可恢复 ', function() {
			$('.popup-edit').hide();
		    editName.remove();
		});
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

function topbar(pos) {
	if ($(window).scrollTop() > $('.header').height() && $(window).scrollTop() < pos - $(window).height()) {
		$('.up-btn-box').addClass('up-topbar');
	}
	else {
		$('.up-btn-box').removeClass('up-topbar');
	}
}