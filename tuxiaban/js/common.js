$(function() {
	// 弹窗关闭
	$('body').on('click', '.popup-box', function() {
		$(this).hide();
	})
	.on('click', '.popup', function(e) {
		e.stopPropagation();
	});

	// 头部登录注册
	$('.btn-login, .btn-register').on('click', function() {
		$('.popup-login').show();
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



// alert和confirm美化
// 调用方法, 标题为null则不显示标题
// $.msgBox.Alert('title', 'msg');
// $.msgBox.Confirm('title', 'msg', func);
(function() {
    $.msgBox = {
        Alert: function(title, msg) {
            GenerateHtml('alert', title, msg);
            btnOk();
            btnNo();
        },
        Confirm: function(title, msg, callback) {
            GenerateHtml('confirm', title, msg);
            btnOk(callback);
            btnNo();
        }
    }
    //生成Html
    var GenerateHtml = function(type, title, msg) {
        var _html = '<div id="sw-con-mask"><div id="sw-con">';
        if (title) {
            _html += '<div id="sw-tit">' + title + '</div><a id="sw-close" href="javascript:;"><span class="icon-close"></span></a>';
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
        $('body').append(_html);
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $('#sw-con').width();
        var boxHeight = $('#sw-con').height();
        //让提示框居中
        $('#sw-con-mask').css({
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 990,
            width: '100%',
            height: '100%',
            background: '#000',
            background: 'rgba(0, 0, 0, .8)'
        });
        $('#sw-con').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        $('#sw-btn-ok').on('click', function() {
            $('#sw-con-mask').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        $('#sw-btn-no, #sw-close').on('click', function() {
            $('#sw-con-mask').remove();
        });
    }
})();

function alertMsg(title, txt) {
    $.msgBox.Alert(title, txt);
}
function confirmMsg(title, txt, func) {
    $.msgBox.Confirm(title, txt, func);
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