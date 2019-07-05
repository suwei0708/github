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
	$('.v-tab').on('click', '.btn-zan', function() {
	    var _this = $(this);
	    if (!$(this).hasClass('cur')) {
	        _this.addClass('cur');
	        _this.find('i').html(+_this.find('i').html() + 1);
	    }
	});

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

	// 回复内容 250180921
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
});

// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentdate = month + '月' + strDate + "日 " + hours + seperator2 + minutes + seperator2 + seconds;
    return currentdate;
}

function timepicker() {
	// $('.timepicker').datetimepicker('remove');
	$.datetimepicker.setLocale('ch');
	$.each($('.timepicker'), function() {
	    if ($(this).data('format')) {
			data = $(this).data('format');
			var _this = $(this);
			$(this).datetimepicker({
			    // lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
				format: data, //格式化日期
			    timepicker: false, //关闭时间选项
				todayButton: false, //关闭选择今天按钮
				validateOnBlur: false // 失去焦点时验证datetime值输入,。如果值是无效的datetime,然后插入当前日期时间值
			});
		}
		else {
			data = 'Y-m-d';
			$(this).datetimepicker({
			    format: data, //格式化日期
			    timepicker: false, //关闭时间选项
			    todayButton: false //关闭选择今天按钮
			});
	    }
	});

}

// radio选中效果
function radioBeautify(obj) {
    $.each($(obj).find('input[type=radio]'), function(index) {
        if (!$(this).parents('label').find('.ico-radio').length) {
            $(this).wrap('<span class="ico-radio"></span>');
        }
        if ($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur');
        }
        $(this).on('change', function() {
            $(obj).find('input[type=radio][name=' + $(this).attr('name') + ']').parents('span').removeClass('ico-radio-cur');
            if ($(this).prop('checked')) {
                $(this).parents('span').addClass('ico-radio-cur');
            }
        });
    });
}

// 字数判断
function numbox() {
	if ($('.num-box').length) {
	    $.each($('.num-box'), function(i) {
	        monitorVal($(this).parent().find('.input'), $(this).find('.num').text(), 'minus');
	    });
	}
}