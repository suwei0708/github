$(function() {
	// 监听input字数
	if ($('.ct-comment').length) {
	    $.each($('.ct-comment .textarea'), function(i) {
	        monitorVal($(this), 500, 'minus');
	    });
	    $.each($('.ct-comment .text'), function(i) {
	        monitorVal($(this), 500, 'minus');
	    });
	}
	// 点击回复
	$('.ct-comment').on('click', '.btn-replay', function() {
	    var replayForm = $(this).parents('.com-box').find('.reply-form');
	    if (replayForm.is(':visible')) {
	        $('.ct-comment .reply-form').hide();
	    } else {
	        $('.ct-comment .reply-form').hide();
	        replayForm.show();
	    }
	});
	// 点击取消
	$('.ct-comment').on('click', '.btn-cancel', function() {
	    var replayForm = $(this).parents('.reply-form');
	    replayForm.hide();
	});

	// 回复内容
	$('.ct-comment').on('click', '.btn-sure', function() {
	    // 判断文本内容非空
	    if ($(this).hasClass('dis')) {
	        return false;
	    }
	    // 判断回复盒子是否存在，不存在创造追加
	    if (!$(this).parents('li').find('.reply-box').length) {
	        $(this).parents('li').append('<div class="reply-box"></div>');
	    }

	    var msgHtml = '<div class="com-box">' +
	        '<a href="#" class="fll avatar">' +
	        '<img src="images/avatar.gif" height="30" width="30">' +
	        '</a>' +
	        '<div class="info"><strong><a href="#">痞先森</a></strong>  回复 <strong><a href="#">木白的白目</a></strong><span class="time">8小时前</span></div>' +
	        '<div class="info">' +
	        '梵高展的时候有看过油画动画的部分展示，很遗憾没认真仔细的去研究。' +
	        '<div class="btn-box">' +
	        '<a href="javascript:;" class="btn-replay"><span class="icon-comment"></span><span class="btn-replay-txt"> 回复</span></a>' +
	        '<a href="javascript:;" class="btn-praise"><span class="icon-praise2"></span> 赞</a>' +
	        '<a href="javascript:;" class="btn-selected">精选</a>' +
	        '<a href="javascript:;" class="btn-report report"><span class="icon-jubao"></span> 举报</a>' +
	        '<a href="javascript:;" class="btn-del">删除</a>' +
	        '</div>' +
	        '</div>' +
	        '<div class="reply-form" style="display: none;">' +
	        '<textarea class="text" placeholder="回复 痞先森 :"></textarea>' +
	        '<div class="btn-box">' +
	        '<div class="fr">' +
	        '<a href="javascript:;" class="btn btn-sure">回复</a>' +
	        '</div>' +
	        '</div>' +
	        '</div>' +
	        '</div>';
	    $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);
	    $(this).parents('.reply-form').find('.text').val('');
	});

	// 判断评论框字数是否输入
	$('.ct-comment-box .textarea').bind('input propertychange', function() {
	    var _this = $(this);
	    if (_this.val().length > 0) {
	        _this.css('background', '#fff');
	        _this.parents('.ct-comment-box').find('.btn-comment').removeClass('dis');
	    } else {
	        _this.css('background', '#f7f8fa');
	        _this.parents('.ct-comment-box').find('.btn-comment').addClass('dis');
	    }
	});
	// 判断回复框字数是否输入
	$.each($('.ct-comment').find('.text'), function(index, val) {
	    var _this = $(this);
	    _this.bind('input propertychange', function() {
	        if (_this.val().length > 0) {
	            _this.parents('.reply-form').find('.btn-sure').removeClass('dis');
	        } else {
	            _this.parents('.reply-form').find('.btn-sure').addClass('dis');
	        }
	    });
	});

	// 监听input字数
	if($('.kc-form').length) {
		numbox();
	}

	// 监听input字数
	if ($('#form').length) {
	    numbox();
	}

	// 贺图通用下拉
	$('body').on('mouseover', '.item-select dd', function() {
		if($(this).find('.select-list').is(':hidden')) {
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