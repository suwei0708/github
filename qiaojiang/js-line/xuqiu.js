$(function() {
    // 需求首页邀请好友助力
    $('.box-xq').on('click', '.btn-yellow', function() {
        if($(this).parents('li').find('.icon-jjz').length) {
            // 需求制作中
            $.msgBox.Alert(null, '该需求已加速到极限，我们已经准备制作了！');
        }
        else {
            // 需求未制作
            $('.popup-yqzl').show();
        }

        $('.mask').show();
        return false;
    });
    // 防止冒泡
    $('.box-xq').on('click', '.btn-gray', function() {
        return false;
    });

    // 需求首页删除需求
    $('.box-xq').on('click', '.btn-del', function() {
        var _this = $(this);
        if(_this.parents('li').find('.icon-jjz').length) {
            // 需求制作中
            $.msgBox.Confirm(null, '您的需求正在制作中确定删除吗？', function() {
                _this.parents('li').remove();
                tipSave('suc', '删除成功！');
                // tipSave('fail', '删除失败！');
            });
        }
        else {
            // 需求未制作
            $.msgBox.Confirm(null, '确认删除此需求吗？', function() {
                _this.parents('li').remove();
                tipSave('suc', '删除成功！');
            });
        }

        $('.mask').show();
        return false;
    });

    // 需求详情字数判定
    if($('.xqxq-comment .num-box').length) {
        $.each($('.xqxq-comment .textarea'), function(i) {
            monitorVal($(this), $(this).parent().find('.length').text(), 'minus');
            $(this).bind('input propertychange', function() {
                if($(this).val().length == 0) {
                    $(this).attr('style', '');
                }
                else {
                    $(this).css({
                        'background': '#fff'
                    });
                }
            });
        });
    };

    // 需求详情 一键助力
    $('.xqxq-tit').on('click', '.btn-yjzl', function() {
        // 当用户分享的需求正在制作中，好友页面展示
        // $.msgBox.Alert(null, '感谢您的参与，课程正在制作中，<br /><a href="#" class="yellow">请查看其它课程></a>');

        // 非分享助力和VIP用户，加速成功显示如下
        // $.msgBox.Alert(null, '成功加速+1天，距制作时间还有5天');

        // 当助力时间距当前日期还有3天时，不可再增加，给用户展示以下提示
        $.msgBox.Alert(null, '该需求已加速到极限，我们已经准备制作了！');
    });
    // 需求详情 邀请助力
    $('.xqxq-tit').on('click', '.btn-yqzl', function() {
        $('.popup-yqzl, .mask').show();
    });
    // 需求详情 制作课程
    $('.xqxq-tit').on('click', '.btn-zzkc', function() {
        $.msgBox.Alert(null, '确定开始制作课程吗？');
    });
    // 需求详情 课程提醒
    $('.xqxq-tit').on('click', '.btn-kctx', function() {
        monitorVal($('.popup-kctx .textarea'), $('.popup-kctx').find('.length').text(), 'minus');
        $('.popup-kctx, .mask').show();
    });
    // 需求详情 删除需求
    $('.xqxq-tit').on('click', '.btn-del', function() {
        $.msgBox.Confirm(null, '确认删除此需求吗？', function() {
            _this.parents('li').remove();
            tipSave('suc', '删除成功！');
        });

        $('.mask').show();
        return false;
    });


    // 发布需求radio美化
    if($('.form-works .radio').length) {
        $('.form-works .radio').on('click', 'li', function() {
            $(this).find('.ico-radio').addClass('ico-radio-cur').parents('li').siblings().find('.ico-radio').removeClass('ico-radio-cur');
            $('.form-box').hide().eq($(this).index()).show();
        });
    };

    // 发布需求字数判定
    if($('.form-works .num-box').length) {
        $.each($('.form-works .input'), function(i) {
            monitorVal($(this), $(this).parent().find('.length').text(), 'minus');
            $(this).bind('input propertychange', function() {
                if($(this).val().length == 0) {
                    $(this).attr('style', '');
                }
                else {
                    $(this).css({
                        'background': '#fff'
                    });
                }
            });
        });
    };

    // 功能建议删除
    $('.gnjy-comment').on('click', '.del', function() {
        var _this = $(this);
        $.msgBox.Confirm(null, '确认删除此需求吗?', function() {
            _this.parents('li').remove();
            tipSave('suc', '删除成功！');
        });
    });
});

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
        var _html = '<div id="sw-con"><a id="sw-close" href="javascript:;"><span class="qjfont qj-cha"></span></a>';
        if (title) {
            _html += '<div id="sw-tit">' + title + '</div>';
        }
        _html += '<div id="sw-msg">' + msg + '</div><div id="sw-btn-box">';

        if (type == 'alert') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
        }
        if (type == 'confirm') {
            _html += '<a id="sw-btn-no" href="javascript:;">取消</a>';
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        jQuery('.mask').show();
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
                jQuery('#sw-con').remove();
                jQuery('.mask').hide();
                if (typeof(callback) == 'function') {
                    callback();
                }
            });
        }
        //取消按钮事件
    var btnNo = function() {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-con').remove();
            jQuery('.mask').hide();
        });
    }
})();

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