$(function() {
	// 幻灯片
	if ($('#sld-kc').length) {
	    $('#sld-kc').slides({
	        generatePagination: true,
	        generateNextPrev: true,
	        play: 3000,
	        pause: 2500,
	        hoverPause: true,
	        next: 'icon-youjiantou',
	        prev: 'icon-zuojiantou'
	    });
	}

	// 首页切换
	$('.zsj-kc').on('click', '.tit h2', function() {
		console.log($(this).index());
		$(this).find('a').addClass('cur').parent().siblings('h2').find('a').removeClass('cur');
		$('.tab-kccont').find('.zsj-kc').hide().eq($(this).index()).show();
	});

	// 点击购买
	$('body').on('click', '.btn-buy', function() {
		$('.popup-buy').show();
	})

	// 播放页分享
	$('.v-share').on('click', function() {
		$('.popup-share').show();
	});
	// 复制
	$('body').on('click', '.btn-copy', function() {
	    copyToClipboard();
	    alertMsg('复制成功！');
	});

	// 视频页tab切换
	$('.v-tab').on('click', 'li', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.v-tab-cont').hide().eq($(this).index()).show();
	});

	// 视频页点赞
	if ($('.v-tab').length) {
		var $parents = $('.v-tab');
		var $btnCai = $parents.find('.btn-cai');
		var $cai = $btnCai.find('i');
		var $caiNum = $cai.html() ? +$cai.html() : 0;
		var $btnZan = $parents.find('.btn-zan');
		var $zan = $btnZan.find('i');
		var $zanNum = $zan.html() ? +$zan.html() : 0;
		zanPer($('.v-tab').find('.per'));
		function zanPer(dom) {
			var num;
			$zanNum == 0 || $caiNum == 0 ? num = 0 : num = $zanNum * 100 / (+$zanNum + +$caiNum) + '%'
			dom.find('span').animate({
				'width': num
			}, 100);
		}

		$('.v-tab').on('click', '.btn-zan', function() {
			if ($btnZan.hasClass('cur')) {
				$btnZan.removeClass('cur');
				$zanNum - 1 ? $zanNum = $zanNum - 1 : $zanNum = 0;
				$zan.html($zanNum);
			} else {
				if ($btnCai.hasClass('cur')) {
					$btnCai.removeClass('cur');
					$caiNum - 1 ? $caiNum = $caiNum - 1 : $caiNum = 0;
					$cai.html($caiNum);
				}
				$(this).addClass('cur');
				$zanNum = $zanNum + 1
				$zan.html($zanNum);
			}
			zanPer($('.v-tab').find('.per'));
		})
		// 视频页踩
		.on('click', '.btn-cai', function() {
			if ($btnCai.hasClass('cur')) {
				$btnCai.removeClass('cur');
				$caiNum - 1 ? $caiNum = $caiNum - 1 : $caiNum = 0;
				$cai.html($caiNum);
			}
			else {
				if ($btnZan.hasClass('cur')) {
					$btnZan.removeClass('cur');
					$zanNum - 1 ? $zanNum = $zanNum - 1 : $zanNum = 0;
					$zan.html($zanNum);
				}
				$(this).addClass('cur');
				$caiNum = $caiNum + 1
				$cai.html($caiNum);
			}
			zanPer($('.v-tab').find('.per'));
		});
	}


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

	// checkbox美化
	if ($('.checkbox').length) {
	    checkboxSelect('.checkbox');
	};

	// 课程通用下拉
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

	// 删除视频课程
	$('.form-spgl').on('click', '.icon-del', function() {
		var _this = $(this);
		$.msgBox.Confirm(null, '确定删除该视频吗？', function() {
			_this.parents('li').remove();
		});
	});

	// 删除课程课程
	$('.form-kcgl').on('click', '.icon-del', function() {
		var _this = $(this);
		$.msgBox.Confirm(null, '确定删除该课程吗？', function() {
			_this.parents('li').remove();
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