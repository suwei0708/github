(function($) {
$(function() {
    // 首页banner
    if($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            effect: 'fade'
        });
    };

    // 消息滚动
    if($('#marquee').length) {
        $("#marquee").kxbdMarquee({
            // direction: 'up'
        });
    };

    // 瀑布流
    if($('#waterfall').length) {
        $('#waterfall').BlocksIt({
            numOfCol: 4,
            offsetX: 10,
            offsetY: 10
        });
    };

    // 内容页收藏
    $('.cont-down').on('click', '.btn-collect', function() {
        if($(this).hasClass('dis')) {
            $(this).removeClass('dis');
            alertMsg(null, '取消收藏成功！');
        }
        else {
            $(this).addClass('dis');
            alertMsg(null, '收藏成功！');
        }
    });

    // 登录切换
    $('.box-lg').on('click', '.tit-tab span', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.box-lg').find('.ct').hide().eq($(this).index()).show();
    });

    // 手机快速登录
    $('.box-lg').on('click', '.phone', function() {
        $(this).parents('.box-lg').find('.tit-tab span:eq(1)').click();
    });

    // 手机快速登录发送验证码
    $('.box-lg').on('click', '.btn-send', function() {
        var _this = $(this);
        if(_this.hasClass('dis')) { return false;}
        var dom = $('.box-lg').find('.ct:eq(1)');
        if(!$.trim(dom.find('.input-phone').val())) {
            alertMsg(null, '手机号不能为空！')
            return false;
        }
        else if($.trim(dom.find('.input-phone').val()).length != 11) {
            alertMsg(null, '请填写正确的手机号！')
            return false;
        }
        var i = 59;
        _this.addClass('dis').html('重新发送(<span class="times">' + i + '</span>)');
        var codeTimer = setInterval(function() {
            i--;
            _this.find('.times').html(i);
            if (i == 0) {
                clearInterval(codeTimer);
                _this.removeClass('dis').html('获取验证码');
            }
        }, 1000);

        // 登录发送验证码执行事件
        console.log('发送验证码');
    });

    // 提交表单
    var inputNum = 0;
    $('.box-form').on('click', '.btn', function() {
        var dom = $(this).parents('.ct').find('.input');
        inputNum = 0;
        $.each(dom, function(i) {
            if(!$.trim($(this).val())) {
                alertMsg(null, $(this).attr('placeholder') + '不能为空！')
                return false;
            }
            else if($(this).hasClass('input-repassword') && $(this).val() != $(this).parents('.box-form').find('.input-password').val()) {
                alertMsg(null, '两次密码不一致！');
                return false;
            }
            else if($(this).hasClass('input-phone') && $.trim($(this).val()).length != 11) {
                alertMsg(null, '请填写正确的手机号！')
                return false;
            }
            else if($(this).hasClass('input-email') && !isEmail($.trim($(this).val()))) {
                alertMsg(null, '请填写正确的Email！')
                return false;
            }
            inputNum++;
        });

        // 提交执行事件
        if(inputNum == dom.length) {
            if($(this).parents('.box-form').hasClass('box-lg') && $(this).parents('.ct').index() == 1) {
                console.log('登录');
            }
            else if($(this).parents('.box-form').hasClass('box-lg') && $(this).parents('.ct').index() == 2) {
                console.log('手机快速登录');
            }
            else if($(this).parents('.box-form').hasClass('box-password')) {
                console.log('重置密码');
            }
            else if($(this).parents('.box-form').hasClass('box-register')) {
                console.log('注册');
            }
            dom.val('');
            return false; // 阻止form默认提交，使用ajax提交需要
        }
        else {
            return false;
        }
    });

    // 找回密码发送验证码
    $('.box-password').on('click', '.btn-send', function() {
        var _this = $(this);
        if(_this.hasClass('dis')) { return false;}
        var dom = $('.box-password');
        if(!$.trim(dom.find('.input-phone').val())) {
            alertMsg(null, '手机号不能为空！')
            return false;
        }
        else if($.trim(dom.find('.input-phone').val()).length != 11) {
            alertMsg(null, '请填写正确的手机号！')
            return false;
        }
        var i = 59;
        _this.addClass('dis').html('重新发送(<span class="times">' + i + '</span>)');
        var codeTimer = setInterval(function() {
            i--;
            _this.find('.times').html(i);
            if (i == 0) {
                clearInterval(codeTimer);
                _this.removeClass('dis').html('获取验证码');
            }
        }, 1000);

        // 登录发送验证码执行事件
        console.log('发送验证码');
    });

});
})(jQuery);