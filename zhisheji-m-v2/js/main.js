$(function() {
	function bodyScroll(event) {
	    event.preventDefault();
	}
	// 头部下拉
	$('body').on('click', '.menu-down', function() {
		if ($(this).find('.menu-sub').is(':hidden')) {
			$(this).find('.menu-sub').slideDown();
			$(this).find('.icon-gengduo').attr('class', 'icon-guanbi1');
			// 防止拖动出现黑块
			document.body.addEventListener('touchmove', bodyScroll, { passive: false });
		}
		else {
			$('.menu-sub').slideUp();
			$(this).find('.icon-guanbi1').attr('class', 'icon-gengduo');
			// 允许拖动出现黑块
			document.body.removeEventListener('touchmove', bodyScroll, { passive: false });
		}
	})
	// 下拉收起
	.on('click', '.menu-sub', function(e) {
		$('.menu-sub').slideUp();
		e.stopPropagation();
	})
	// 下拉阻止冒泡
	.on('click', '.menu-sub ul', function(e) {
	    e.stopPropagation();
	});

	// 招聘弹窗
	$('.tip-zp').on('click', function() {
		$('.popup-zp').show();
	});
	$('body').on('click', '.popup', function() {
		$(this).hide();
	})
	.on('click', '.popup > div', function(e) {
	    e.stopPropagation();
	})

	// 评论展示更多
	$('.content-comment').on('click', '.more-comment', function() {
	    if ($(this).find('.more-comment-text').text() == '收起评论') {
	        $(this).find('.more-comment-text').text('查看更多评论');
	        $(this).parents('.reply-box').find('.more-comment-box').hide();
	    } else {
	        $(this).find('.more-comment-text').text('收起评论');
	        $(this).parents('.reply-box').find('.more-comment-box').show();
	    }
	});

	// 评论点赞
	$('.content-comment').on('click', '.btn-praise', function() {
		var _this = $(this);
		if (!_this.hasClass('praise-ok')) {
		    if (!_this.find('.add').length) {
		        _this.append('<span class="add">+1</span>');
		    }
		    _this.find('.add').fadeIn();
		    setTimeout(function() {
		        _this.find('.add').fadeOut();
		    }, 800);

		    var num = 0;
		    if (_this.find('.num').length) {
		        var num = _this.find('.num').text();
		    } else {
		        _this.append(' <span class="num"></span>');
		    }
		    num = parseInt(num) + 1;
		    $(this).addClass('praise-ok').find('.num').text(num);
		}
	});

	if ($('.so-box').length) {
	    // 搜索页 是否展示删除按钮
		comInput($('.so-box .input'));
		$('.so-box .input').bind('input propertychange', function() {
			comInput($(this));
		});
		//	搜索页 点击删除按钮
		$('.so-box').on('click', '.icon-quxiao', function() {
			$(this).hide();
			$('.so-box .input').val('');
		})
		//	搜索页 点击提交按钮
		.on('click', '.btn', function() {
		    if (!$.trim($('.so-box .input').val()).length) {
				alertTips('搜索内容不能为空！');
				return false;
			}
			else {
				// 模拟无结果
				if ($.trim($('.so-box .input').val()).length > 5) {
					$('.so-noresult, .so-footer').removeClass('hide');
					$('.so-result').addClass('hide');
				}
				// 模拟有结果
				else {
					$('.so-result').removeClass('hide');
					$('.so-footer, .so-noresult').addClass('hide');
				}

				return false;
			}
		});

		function comInput(obj) {
			if ($.trim(obj.val()).length > 0) {
				$('.so-box').find('.icon-quxiao').show();
			}
			else {
				$('.so-box').find('.icon-quxiao').hide();
			}
		}
	}
});
// 通用alert美化
var alertTimes;
function alertTips(txt, times) {
    if (!$('.alerttips-box').length) {
        $('body').append('<div class="alerttips-box"><div class="alerttips"></div></div>');
    }
    $('.alerttips').html(txt);
    $('.alerttips-box').show();
    times ? time = times : time = 2000;
    clearTimeout(alertTimes);
    alertTimes = setTimeout(function() {
        $('.alerttips-box').hide();
    }, time);
}