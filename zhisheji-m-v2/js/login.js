$(function() {
    // 判断input非空状态
    if($('.login-box').length) {
        var input = $('.login-box').find('.input');
        // 初始设定所有input输入值为0，聚焦提示框隐藏
        input.attr('data-val', 0).on('focus', function() {
            $(this).parents('.form').find('.tips').hide();
        });
        // 判断提示框存在
        if(!$('.login-box').find('.tips').length) {
            $('.login-box').find('.btn').before('<div class="tips" style="display: none"></div>')
        }

        // 加载判断input非空显示图标
        input.each(function(i) {
            inputChange($(this));
        });

        // 实时输入判断input非空显示图标
        input.bind('input propertychange', function() {
            inputChange($(this));
        });
    }

    // 登录切换
    $('.login-box').on('click', '.tab-tit li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.login-box').find('.form').hide().eq($(this).index()).show();
    })
    // 清空input值
    .on('click', '.icon-quxiao', function() {
        $(this).parents('.item').removeClass('item-val').find('.input').val('');
        $(this).parents('.form').find('.btn').addClass('dis');
    })
    // 密码是否展示
    .on('click', '.icon-yanjing', function() {
        var input = $(this).parents('.item').find('.input');
        if(input.attr('type') == 'password') {
            input.attr('type', 'text');
        }
        else {
            input.attr('type', 'password');
        }
    })
    // 收不到验证码
    .on('click', '.retrieve-no', function() {
        $('.retrieve-tips').show();
    })
    // 短信登录提交
    .on('click', '.btn-msglogin', function() {
        if($(this).hasClass('dis')) {
            return false;
        }
        console.log('短信登录');
    })
    // 账号密码登录提交
    .on('click', '.btn-login', function() {
        if($(this).hasClass('dis')) {
            return false;
        }
        console.log('账号密码登录');
    })
    // 注册提交
    .on('click', '.btn-register', function() {
        if($(this).hasClass('dis')) {
            return false;
        }
        console.log('注册');
    })
    // 找回密码提交
    .on('click', '.btn-retrieve', function() {
        if($(this).hasClass('dis')) {
            return false;
        }
        console.log('找回密码');
        window.location.href = '重置密码.html';
    })
    // 重置密码提交
    .on('click', '.btn-reset', function() {
        if($(this).hasClass('dis')) {
            return false;
        }
        var box = $('.form-reset');
        var val1 = $.trim(box.find('.input').eq(0).val());
        var val2 = $.trim(box.find('.input').eq(1).val());
        if(val1 != val2) {
            box.find('.tips').html('两次密码不一致').show();
            return false;
        }
        console.log('重置密码');
    });


    // 短信登录发送验证码
    $('.form-login').on('click', '.sendcode', function() {
        if(!isYzm($(this))) {
            return false;
        }
        // 倒计时
        var yzm = $(this).parents('.yzm');
        sendCode(yzm);
        // 短信登录发送验证码执行事件
        console.log('短信登录发送验证码');
    });


    // 注册发送验证码
    $('.form-register').on('click', '.sendcode', function() {
        if(!isYzm($(this))) {
            return false;
        }
        // 倒计时
        var yzm = $(this).parents('.yzm');
        sendCode(yzm);
        // 注册发送验证码执行事件
        console.log('注册发送验证码');
    });

    // 找回密码发送验证码
    $('.form-retrieve').on('click', '.sendcode', function() {
        if(!isYzm($(this))) {
            return false;
        }
        // 倒计时
        var yzm = $(this).parents('.yzm');
        sendCode(yzm);
        // 找回密码发送验证码执行事件
        console.log('找回密码发送验证码');
    });
});

function sendCode(dom) {
    var i = 59;
    dom.html(i);
    var codeTimer = setInterval(function() {
        i--;
        dom.html(i);
        if (i == 0) {
            clearInterval(codeTimer);
            dom.html('<a href="javascript:;" class="sendcode resendcode">重新获取</a>')
        }
    }, 1000);
}

function isPhone(str) {
    var reg = /^1\d{10}$/;
    return reg.test(str);
};

function isYzm(dom) {
    var box = dom.parents('.form');
    var val = $.trim(box.find('.phone').val());
    if(!val) {
        box.find('.tips').html('手机号码不能为空').show();
        return false;
    }
    else if(!isPhone(val)) {
        box.find('.tips').html('手机号码错误，请重新输入').show();
        return false;
    }
    return true;
}

function inputChange(dom) {
    var val = $.trim(dom.val()).length;
    if (!val) {
        dom.attr('data-val', 0);
        dom.parents('.item').removeClass('item-val');
    }
    else {
        dom.attr('data-val', 1);
        dom.parents('.item').addClass('item-val');
        if($('.item-reset').length) {
            $('.item-reset').show();
        }
    }
    // 判断所有input非空，按钮变色
    var valNum = 0;
    var form = dom.parents('.form');
    var input = form.find('.input');
    $.each(input, function(j) {
        valNum = +$(this).attr('data-val') + valNum;
    });

    if(valNum == input.length) {
        form.find('.btn').removeClass('dis');
    }
    else {
        form.find('.btn').addClass('dis');
    }
}