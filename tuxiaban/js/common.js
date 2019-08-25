$(function() {
	// 弹窗关闭
	$('body').on('click', '.popup-box', function() {
		$(this).hide();
	})
	.on('click', '.popup', function(e) {
	    e.stopPropagation();
	})
	.on('click', '.popup-box .popup-close', function(e) {
	    $(this).parents('.popup-box').hide();
	});

	// 头部登录注册
	$('.btn-login, .btn-register').on('click', function() {
		$('.popup-login').show();
		checkboxSelect('.checkbox');
	});

	// 是否显示返回顶部
	goscrollTop();
	$(window).on('scroll', function() {
	    goscrollTop();
	});

	// 判断滚动条底部悬浮
	if (!hasScrollbar()) {
		$('.footer').addClass('footer-fixed');
		$('body').css({
			'padding-bottom': $('.footer').outerHeight()
		});
	}
	$(window).on('resize', function() {
		goscrollTop();
		if (!hasScrollbar()) {
			$('.footer').addClass('footer-fixed');
			$('body').css({
				'padding-bottom': $('.footer').outerHeight()
			});
		} else {
			$('.footer').removeClass('footer-fixed');
			$('body').css({
				'padding-bottom': 0
			});
		}
	});

    //返回顶部
    $('#goBack').on('click', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    // 通用盒子切换
    $('.tab-tit').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.tab-box').find('.tab-ct').hide().eq($(this).index()).show()
    });

    // checkbox美化
    if ($('.checkbox').length) {
        checkboxSelect('.checkbox');
    };
    // radio美化
    if ($('.radio').length) {
        radioSelect('.radio');
    };

});


function isEmail(str) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
};

function isMobile(sMobile) {
    if (/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(sMobile)) {
        return false;
    } else {
        return true;
    }
}

function centerObj(obj) {
    var boxWidth = $(obj).outerWidth();
    var boxHeight = $(obj).outerHeight();
    $(obj).css({
        'margin-top': -boxHeight / 2 + 'px',
        'margin-left': -boxWidth / 2 + 'px'
    });
};

// radio选中效果
function radioSelect(obj) {
    $(obj).find('span').removeClass('ico-radio-cur');
    $.each($(obj).find('input[type=radio]'), function(index) {
        if (!$(this).parents('label').find('.ico-radio').length) {
            $(this).wrap('<span class="ico-radio"></span>');
        }
        if ($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur')
        }
        $(this).off('change');
        $(this).on('change', function() {
            if ($(this).prop('checked')) {
                $(this).parents(obj).find('span').removeClass('ico-radio-cur');
                $(this).parents('span').addClass('ico-radio-cur');
            } else {
                $(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};
// checkbox选中效果
function checkboxSelect(obj) {
    $(obj).find('span').removeClass('ico-radio-cur');
    $.each($(obj).find('input[type=checkbox]'), function(i) {
        if (!$(this).parents('label').find('.ico-radio').length) {
            $(this).wrap('<span class="ico-radio"></span>');
        }
        if ($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur');
		}
		$(this).off('change');
        $(this).on('change', function() {
            if ($(this).prop('checked')) {
                $(this).parents('span').addClass('ico-radio-cur');
            } else {
                $(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};

// 保存成功失败 status为suc或者fail，cont为提示的内容
function tipSave(status, cont, times) {
    var time;
    if (status == 'suc') {
        icon = 'hygouxuan'
    }
    if (status == 'fail') {
        icon = 'tishi'
    }
    times ? time = times : time = 2000
    if (!jQuery('.user-tip').length) {
        jQuery('body').append('<div class="user-tip-box"><div class="user-tip">' + '<span class="icon icon-' + icon + '"></span>' + '<span class="text">' + cont + '</span>' + '</div></div>');
    } else {
        jQuery('.user-tip').find('.icon').attr('class', 'icon icon-' + icon);
        jQuery('.user-tip').find('.text').html(cont);
    }
    jQuery('.user-tip').css({
        'margin-left': -jQuery('.user-tip').outerWidth() / 2
    }).show();
    maskShow();
    if (jQuery('.tip-num').length) {
        var tipTimer = setInterval(function() {
            if (jQuery('.tip-num').html() == 1) {
                jQuery('.user-tip').hide();
                maskHide();
                clearInterval(tipTimer);
            }
            jQuery('.tip-num').html(jQuery('.tip-num').html() - 1);
        }, 1000);
    } else {
        setTimeout(function() {
            jQuery('.user-tip').hide();
            maskHide();
        }, time);
    }
};

// alert和confirm美化
// 调用方法, 标题为null则不显示标题
// $.msgBox.Alert('title', 'msg');
// $.msgBox.Confirm('title', 'msg', funcOk, funcNo);
(function() {
    jQuery.msgBox = {
        Alert: function(title, msg) {
            GenerateHtml('alert', title, msg);
            btnOk();
            btnNo();
        },
        Confirm: function(title, msg, callback, callbackno) {
            GenerateHtml('confirm', title, msg);
            btnOk(callback);
            btnNo(callbackno);
        }
    }
    //生成Html
    var GenerateHtml = function(type, title, msg) {
        var _html = '<div id="sw-bg"><div id="sw-con"><a id="sw-close" href="javascript:;"><span class="icon-guanbi"></span></a>';
        if (title) {
            _html += '<div id="sw-tit">' + title + '</div>';
        }
        _html += '<div id="sw-msg">' + msg + '</div><div id="sw-btn-box">';

        if (type == 'alert') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
        }
        if (type == 'confirm') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
            _html += '<a id="sw-btn-no" href="javascript:;">取消</a>';
        }
        _html += '</div></div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('#sw-con').width();
        var boxHeight = jQuery('#sw-con').height();
        //让提示框居中
        jQuery('#sw-con').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#sw-btn-ok').on('click', function() {
            jQuery('#sw-bg').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function(callback) {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-bg').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
})();

function alertMsg(title, msg) {
    $.msgBox.Alert(title, msg);
}
function confirmMsg(title, msg, callback, callbackno) {
    $.msgBox.Confirm(title, msg, callback, callbackno);
}
function goscrollTop() {
    if ($(window).scrollTop() <= 0) {
        $('#goBack').parents('li').hide();
    } else {
        $('#goBack').parents('li').show();
    }
}
function hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

function monitorVal(obj, nums, minus) {
    if (minus) {
        if (jQuery(obj).nextAll('.num-box').find('.num').length) {
            jQuery(obj).nextAll('.num-box').find('.num').html(nums - jQuery(obj).val().length);
        }
    } else {
        if (jQuery(obj).nextAll('.num-box').find('.num').length) {
            jQuery(obj).nextAll('.num-box').find('.num').html(jQuery(obj).val().length);
        }
    }
    jQuery(obj).unbind();
    jQuery(obj).bind('input propertychange', function() {
        if (jQuery(obj).val().length >= nums) {
            jQuery(obj).val(jQuery(obj).val().substr(0, nums));
        }
        if (minus) {
            jQuery(obj).nextAll('.num-box').find('.num').html(nums - jQuery(obj).val().length);
        } else {
            jQuery(obj).nextAll('.num-box').find('.num').html(jQuery(obj).val().length);
        }
    });
};