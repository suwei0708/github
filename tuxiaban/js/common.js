$(function() {
    //返回顶部
    $('#goBack').on('click', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    // 通用盒子切换
    $('.box-tab').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.box').find('.list').hide().eq($(this).index()).show()
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

function centerObj(obj) {
    var boxWidth = jQuery(obj).outerWidth();
    var boxHeight = jQuery(obj).outerHeight();
    jQuery(obj).css({
        'margin-top': -boxHeight / 2 + 'px',
        'margin-left': -boxWidth / 2 + 'px'
    });
};

// radio选中效果
function radioSelect(obj) {
    jQuery(obj).find('span').removeClass('ico-radio-cur');
    jQuery.each(jQuery(obj).find('input[type=radio]'), function(index) {
        if (!jQuery(this).parents('label').find('.ico-radio').length) {
            jQuery(this).wrap('<span class="ico-radio"></span>');
        }
        if (jQuery(this).prop('checked')) {
            jQuery(this).parents('span').addClass('ico-radio-cur')
        }
        jQuery(this).on('change', function() {
            if (jQuery(this).prop('checked')) {
                jQuery(this).parents(obj).find('span').removeClass('ico-radio-cur');
                jQuery(this).parents('span').addClass('ico-radio-cur');
            } else {
                jQuery(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};
// checkbox选中效果
function checkboxSelect(obj) {
    jQuery(obj).find('span').removeClass('ico-radio-cur');
    jQuery.each(jQuery(obj).find('input[type=checkbox]'), function(i) {
        if (!jQuery(this).parents('label').find('.ico-radio').length) {
            jQuery(this).wrap('<span class="ico-radio"></span>');
        }
        if (jQuery(this).prop('checked')) {
            jQuery(this).parents('span').addClass('ico-radio-cur');
        }
        jQuery(this).on('change', function() {
            if (jQuery(this).prop('checked')) {
                jQuery(this).parents('span').addClass('ico-radio-cur');
            } else {
                jQuery(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};

function isMobile(sMobile) {
    if (/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(sMobile)) {
        return false;
    } else {
        return true;
    }
}


// alert和confirm美化
// 调用方法, 标题为null则不显示标题
// $.msgBox.Alert('title', 'msg');
// $.msgBox.Confirm('title', 'msg', func);
(function() {
    jQuery.msgBox = {
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
        jQuery('#sw-con-mask').css({
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 990,
            width: '100%',
            height: '100%',
            background: '#000',
            background: 'rgba(0, 0, 0, .8)'
        });
        jQuery('#sw-con').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#sw-btn-ok').on('click', function() {
            jQuery('#sw-con-mask').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-con-mask').remove();
        });
    }
})();

function alertMsg(title, txt) {
    jQuery.msgBox.Alert(title, txt);
}
function confirmMsg(title, txt, func) {
    jQuery.msgBox.Confirm(title, txt, func);
}