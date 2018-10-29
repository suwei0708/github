/**
 * Created by admin on 2018/8/3.
 */

$(function() {
    // 消息下拉框
    $('.h-msg-info .list ul').scrollUnique();
    $('.h-msg').on('click', function(event) {
        $('.h-msg-info').show();
        event.stopPropagation();
    });

    $('body').on('click', function() {
        if ($('.h-msg-info').is(':visible')) {
            $('.h-msg-info').hide();
        }
    });

    $('.h-msg-info').on('click', '.tt a', function() {
        $(this).addClass('cur').parent().siblings().find('a').removeClass('cur');
        $(this).parents('.tt').nextAll('.list').hide().eq($(this).parent().index()).show();
        return false;
    });

    // 头部上传下拉
    $('.h-user').on('mouseover', '.upload-box', function() {
        $(this).find('.iup-list').show();
    }).on('mouseout', '.upload-box', function() {
        $(this).find('.iup-list').hide();
    });

    // 头像下拉
    $('.h-avatar').on('mouseover', function() {
        $('.h-avatar-info').show();
    })
        .on('mouseout', function() {
            $('.h-avatar-info').hide();
        });

    // 头部不同分辨率下展示情况
    fitHeader();
    $(window).on('resize', function() {
        fitHeader();
    });

    function fitHeader() {
        $(window).width() <= 1440 ? $('.header').addClass('header-min') : $('.header').removeClass('header-min');
        var offsetLeft = $('.footer .wrap').offset().left - $('.header .logo').width() - 160;
        $(window).width() > 1680 && offsetLeft > 0 ? $('.header .nav').css({
            'margin-left': offsetLeft
        }) : $('.header .nav').css({
            'margin-left': 0
        });
    }

    // 关闭弹窗
    $('.popup-box').on('click', '.popup-close', function() {
        $(this).parents('.popup-box').hide();
        maskHide();
    });

    // 切换
    $('.popup-tab').on('click', 'li', function() {
        $(this).addClass('cur').siblings('li').removeClass('cur');
        $(this).parents('.popup').find('.tips').hide();
        $(this).parents('.popup').find('.popup-ct').hide().eq($(this).index()).show();
        centerObj('.popup-login .popup');
        centerObj('.popup-establish .popup');
    });
    // 判断弹窗登录注册
    if ($('.popup-login').length || $('.popup-establish').length || $('.popup-back').length || $('.popup-backbox').length || $('.popup-register').length) {
        var dom1 = $('.popup-login').find('.popup-ct:eq(0)');
        var dom2 = $('.popup-login').find('.popup-ct:eq(1)');
        var dom3 = $('.popup-establish').find('.popup-ct:eq(0)');
        var dom4 = $('.popup-establish').find('.popup-ct:eq(1)');
        var dom5 = $('.popup-back').find('.popup-ct');
        var dom6 = $('.popup-register').find('.popup-ct');
        var dom7 = $('.popup-backbox-phone').find('.popup-ct');
        var dom8 = $('.popup-backbox-email').find('.popup-ct');
        var dom9 = $('.popup-backbox-newpassword').find('.popup-ct');
        var dom10 = $('.popup-bindphone').find('.popup-ct');
        var dom11 = $('.popup-setpassword').find('.popup-ct');
        judgeTips(dom1);
        judgeTips(dom2);
        judgeTips(dom3);
        judgeTips(dom4);
        judgeTips(dom5);
        judgeTips(dom6);
        judgeTips(dom7);
        judgeTips(dom8);
        judgeTips(dom9);
        judgeTips(dom10);
        judgeTips(dom11);

        function judgeTips(obj) {
            var password = $(obj).find('.password');
            var repassword = $(obj).find('.repassword');

            $(obj).find('.txt').on('blur', function() {
                if (!$(this).nextAll('.tips').length) {
                    $(this).parents('.item').append('<span class="tips"></span>');
                }
                if ($.trim($(this).val()).length) {
                    $(this).parents('.item').addClass('has-val');
                }
                if (!$.trim($(this).val()).length) {
                    $(this).parents('.item').removeClass('has-val');
                    $(this).nextAll('.tips').html('<span class="triangle"></span>' + $(this).parents('.item').find('.input-label').text() + '不能为空！').show();
                } else if ($(this).parents('.item').find('.input-label').text() == '新密码') {
                    if (!($.trim($(this).val()).length >= 8 && $.trim($(this).val()).length <= 16 && isNS($.trim($(this).val())))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>密码至少包含数字和字母，8-16个字符，区分大小写').show();
                    } else if ($.trim($(this).val()) != $.trim(repassword.val()) && $.trim(repassword.val()).length) {
                        repassword.nextAll('.tips').html('<span class="triangle"></span>两次输入的密码不一样').show();
                    } else {
                        repassword.nextAll('.tips').hide();
                    }
                } else if ($(this).parents('.item').find('.input-label').text() == '设置密码') {
                    if (!($.trim($(this).val()).length >= 8 && $.trim($(this).val()).length <= 16 && isNS($.trim($(this).val())))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>密码至少包含数字和字母，8-16个字符，区分大小写').show();
                    } else if ($.trim($(this).val()) != $.trim(repassword.val()) && $.trim(repassword.val()).length) {
                        repassword.nextAll('.tips').html('<span class="triangle"></span>两次输入的密码不一样').show();
                    } else {
                        repassword.nextAll('.tips').hide();
                    }
                } else if ($(this).parents('.item').find('.input-label').text() == '确认密码') {
                    if (!($.trim($(this).val()).length >= 8 && $.trim($(this).val()).length <= 16 && isNS($.trim($(this).val())))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>密码至少包含数字和字母，8-16个字符，区分大小写').show();
                    } else if ($.trim($(this).val()) != $.trim(password.val())) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>两次输入的密码不一样').show();
                    }
                } else if ($(this).parents('.item').find('.input-label').text() == '邮箱') {
                    if (!isEmail($.trim($(this).val()))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>邮箱格式不正确').show();
                    }
                }
            });
            $(obj).find('.txt').on('focus', function() {
                $(this).nextAll('.tips').hide();
            });
        }

        // 密码登录
        $('.btn-login-password').on('click', function() {
            if (judgeBtns(dom1)) {
                $.post(hosturl+"login/actlogin?act=all",{username:$("#username").val(),pwd:$("#pwd").val()},function(data){
                    if(data==0){
                        errmsg("数据不能为空")
                    }else if(data==1){
                        errmsg("账户错误")
                    }
                    else if(data==2){
                        errmsg("密码错误")
                    }
                    else if(data==4){
                        $('.popup-login').hide();
                        loginhead();
                    }else{
                        errmsg("数据异常")
                    }
                })
                //console.log('密码登录');
            }
        });

        // 短信登录
        $('.btn-login-code').on('click', function() {
            if (judgeBtns(dom2)) {
                $.post(hosturl+"/login/actlogin?act=tel",{tel:$("#mytel").val(),code:$("#mycode").val()},function(data){
                    if(data==0){
                        errmsg("数据不能为空")
                    }else if(data==1){
                        errmsg("账户错误")
                    }
                    else if(data==2){
                        errmsg("验证码错误")
                    }
                    else if(data==4){
                        $('.popup-login').hide();
                        loginhead();
                    }else{
                        errmsg("数据异常")
                    }
                })

                console.log('短信登录');
            }
        });

        $('.popup-btn-box').on('click', '.btn', function() {
            if ($(this).parents('.popup-box').hasClass('popup-register') && $(this).text() == '注册') {
                if (judgeBtns(dom6)) {
                    if ($('.popup-register').find('input[type=checkbox]').prop('checked')) {
                        $.post(hosturl+"/login/actreg/",{tel:$("#mytel").val(),yzmcode:$("#yzmcode").val(),pwd:$("#pwd").val()},function(data){
                            if(data==0){
                                errmsg("信息不能为空")
                            }
                            else if(data==1){
                                errmsg("您已注册请登录")
                            }
                            else if(data==2){
                                errmsg("验证码错误")
                            }else if(data==3){
                                $('.popup-box').hide();
                                // 展示完善资料弹窗
                                $('.popup-perfect').show();
                                centerObj('.popup-perfect .popup');
                                loginhead();
                            }else{
                                errmsg("异常错误")
                            }
                        })
                    } else {
                        $.msgBox.Alert(null, '请阅读并接受用户协议');
                    }
                }
            } else if ($(this).parents('.popup-box').hasClass('popup-establish') && $(this).text() == '立即注册') {
                // judgeBtns(dom3);
                if (judgeBtns(dom3)) {
                    $('.popup-establish').hide();
                    console.log('立即注册');
                    // 展示完善资料弹窗
                    $('.popup-perfect').show();
                    centerObj('.popup-perfect .popup');
                }
            } else if ($(this).parents('.popup-box').hasClass('popup-establish') && $(this).text() == '立即绑定') {
                // judgeBtns(dom4);
                if (judgeBtns(dom4)) {
                    $('.popup-establish').hide();
                    console.log('立即绑定');
                    // 展示完善资料弹窗
                    $('.popup-perfect').show();
                    centerObj('.popup-perfect .popup');
                }
            }
            // 找回密码
            else if ($(this).parents('.popup-box').hasClass('popup-back') && $(this).text() == '下一步') {
                if (judgeBtns(dom5)) {
                    $('.popup-box').hide();
                    if (isEmail($.trim($('.popup-back').find('.txt').val()))) {
                        $('.popup-backbox-email').show().find('.txt:eq(0)').val($.trim($('.popup-back').find('.txt').val()));
                        $('.popup-backbox-email').find('.sendcode').trigger('click');
                        centerObj('.popup-backbox-email .popup');
                    } else {
                        $('.popup-backbox-phone').show().find('.txt:eq(0)').val($.trim($('.popup-back').find('.txt').val()));
                        $('.popup-backbox-phone').find('.sendcode').trigger('click');
                        centerObj('.popup-backbox-phone .popup');
                    }
                    $(this).parents('.popup-box').find('.txt').val('');
                    // console.log('找回密码');
                }
            }
            // 手机找回密码
            else if ($(this).parents('.popup-box').hasClass('popup-backbox-phone') && $(this).text() == '下一步') {
                if (judgeBtns(dom7)) {
                    console.log('手机找回密码');
                    $('.popup-box').hide();
                    $.post("/login/actlogin?act=tel",{tel:$("#mytel").val(),code:$("#mycode").val()},function(data) {
                        if(data==0){
                            errmsg("数据不能为空")
                        }else if(data==1){
                            errmsg("账户错误")
                        }
                        else if(data==2){
                            errmsg("验证码错误")
                        }
                        else if(data==4){
                            $('.popup-login').hide();
                            $('.popup-backbox-newpassword').show();
                            centerObj('.popup-backbox-newpassword .popup');
                        }else{
                            errmsg("数据异常")
                        }
                    });

                }
            }
            // 邮箱找回密码
            else if ($(this).parents('.popup-box').hasClass('popup-backbox-email') && $(this).text() == '下一步') {
                if (judgeBtns(dom8)) {
                    console.log('邮箱找回密码');
                    $('.popup-box').hide();
                    $('.popup-backbox-newpassword').show();
                    centerObj('.popup-backbox-newpassword .popup');
                }
            }
            // 设置新密码
            else if ($(this).parents('.popup-box').hasClass('popup-backbox-newpassword') && $(this).text() == '下一步') {
                if (judgeBtns(dom9)) {
                    console.log('设置新密码');
                    $.post("/login/actlogin?act=repwd",{pwd:$("#pwd").val()},function(data) {
                        $('.popup-box').hide();
                        tipSave('suc', '密码修改成功，正在为您登录');
                    });


                }
            }
            // 帐号和密码页 绑定手机号
            else if ($(this).parents('.popup-box').hasClass('popup-bindphone') && $(this).text() == '下一步') {
                if (judgeBtns(dom10)) {
                    console.log('绑定手机号');
                    var input = $(this).parents('.popup-bindphone').find('.txt:eq(0)');
                    $('.popup-box').hide();
                    var dom = '<div class="name">' + $.trim(input.val()) + '<span class="tips tips-right"><span class="icon-gou"></span>已绑定</div>'
                    $('.user-bind').find('.item:eq(1)').find('dd').html(dom);
                    $('.user-bind').find('.item:eq(1) dd').append('<button type="button" class="btn-unbind btn-unbind-phone">解绑</button>');
                    tipSave('suc', '绑定成功，可用手机账号登录');
                }
            }
        });

        // 设置登录密码
        $('.popup-setpassword').on('click', '.btn', function() {
            if (judgeBtns(dom11)) {
                $('.popup-box').hide();
                console.log('设置登录密码');
            }
        });

        function judgeBtns(obj) {
            var password = $(obj).find('.password');
            var repassword = $(obj).find('.repassword');
            var pass = true;
            $.each($(obj).find('.txt'), function(index, val) {
                if (!$.trim($(this).val()).length) {
                    if (!$(this).nextAll('.tips').length) {
                        $(this).parents('.item').append('<span class="tips"></span>');
                    }
                    $(this).nextAll('.tips').html('<span class="triangle"></span>' + $(this).parents('.item').find('.input-label').text() + '不能为空！').show();
                    pass = false;
                } else if ($(this).parents('.item').find('.input-label').text() == '新密码') {
                    if (!($.trim($(this).val()).length >= 8 && $.trim($(this).val()).length <= 16 && isNS($.trim($(this).val())))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>密码至少包含数字和字母，8-16个字符，区分大小写').show();
                        pass = false;
                    } else if ($.trim($(this).val()) != $.trim(repassword.val()) && $.trim(repassword.val()).length) {
                        repassword.nextAll('.tips').html('<span class="triangle"></span>两次输入的密码不一样').show();
                        pass = false;
                    } else {
                        repassword.nextAll('.tips').hide();
                    }
                } else if ($(this).parents('.item').find('.input-label').text() == '设置密码') {
                    if (!($.trim($(this).val()).length >= 8 && $.trim($(this).val()).length <= 16 && isNS($.trim($(this).val())))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>密码至少包含数字和字母，8-16个字符，区分大小写').show();
                        pass = false;
                    } else if ($.trim($(this).val()) != $.trim(repassword.val()) && $.trim(repassword.val()).length) {
                        repassword.nextAll('.tips').html('<span class="triangle"></span>两次输入的密码不一样').show();
                        pass = false;
                    } else {
                        repassword.nextAll('.tips').hide();
                    }
                } else if ($(this).parents('.item').find('.input-label').text() == '确认密码') {
                    if (!($.trim($(this).val()).length >= 8 && $.trim($(this).val()).length <= 16 && isNS($.trim($(this).val())))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>密码至少包含数字和字母，8-16个字符，区分大小写').show();
                        pass = false;
                    } else if ($.trim($(this).val()) != $.trim(password.val())) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>两次输入的密码不一样').show();
                        pass = false;
                    }
                } else if ($(this).parents('.item').find('.input-label').text() == '邮箱') {
                    if (!isEmail($.trim($(this).val()))) {
                        $(this).nextAll('.tips').html('<span class="triangle"></span>邮箱格式不正确').show();
                        pass = false;
                    }
                }
            });
            return pass;
        }
    };

    // 登录发送验证码
    $('.popup-login').on('click', '.sendcode', function() {
        // 登录发送验证码执行事件
        console.log('登录发送验证码');
        $.post("/login/sendcode",{tel:$("#mytel").val()},function(data){

        })
        var _this = $(this).parents('.yzm');
        var i = 59;
        _this.html('<span class="times">' + i + '</span>s重新发送');
        var codeTimer = setInterval(function() {
            i--;
            _this.find('.times').html(i);
            if (i == 0) {
                clearInterval(codeTimer);
                _this.html('<a href="javascript:;" class="sendcode">获取验证码</a>')
            }
        }, 1000);
    });

    // 注册发送验证码
    $('.popup-register').on('click', '.sendcode', function() {
        // 注册发送验证码执行事件
        console.log('注册发送验证码');
        $.post("/login/sendcode",{tel:$("#mytel").val()},function(data){

        })
        var _this = $(this).parents('.yzm');
        var i = 59;
        _this.html('<span class="times">' + i + '</span>s重新发送');
        var codeTimer = setInterval(function() {
            i--;
            _this.find('.times').html(i);
            if (i == 0) {
                clearInterval(codeTimer);
                _this.html('<a href="javascript:;" class="sendcode">获取验证码</a>')
            }
        }, 1000);
    });

    // 找回密码发送验证码
    $('.popup-backbox').on('click', '.sendcode', function() {
        if ($(this).parents('.popup-backbox').hasClass('popup-backbox-phone')) {
            // 手机找回密码执行事件
            $.post("/login/sendcode",{tel:$("#mytel").val()},function(data){

            })
            console.log('手机找回密码');
        } else if ($(this).parents('.popup-backbox').hasClass('popup-backbox-email')) {
            // 邮箱找回密码执行事件
            console.log('邮箱找回密码');
        } else if ($(this).parents('.popup-backbox').hasClass('popup-backbox-bindphone')) {
            $.post("/login/sendcode",{tel:$("#mytel").val()},function(data){

            })
            // 帐号和密码 绑定手机号执行事件
            console.log('绑定手机号');
        }
        var _this = $(this).parents('.yzm');
        var i = 59;
        _this.html('<span class="times">' + i + '</span>s重新发送');
        var codeTimer = setInterval(function() {
            i--;
            _this.find('.times').html(i);
            if (i == 0) {
                clearInterval(codeTimer);
                _this.html('<a href="javascript:;" class="sendcode">获取验证码</a>')
            }
        }, 1000);
    });

    // 找回密码收不到验证码
    $('.popup-backbox').on('click', '.nocode', function() {
        tipSave('fail', '收不到验证码？请联系管理员QQ：869706776', 2000)
    });

    // 头部点击登录注册
    $('.h-login, .popup-login, .popup-back, .popup-backbox, .popup-register').on('click', '.btn-lg', function() {
        $('.popup-box').hide();
        $.ajax({
            type: 'get',
            url: hosturl+"login/reg?act=login&jsoncallback=?",
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            success: function(data) {
                $("#masks").html(data.html);
                $('.popup-login').show().find('.popup-tab li:eq(0)').click();
                centerObj('.popup-login .popup');
            }
        });

    });
    // 忘记密码
    $('.popup-login').on('click', '.btn-forget', function() {
        $('.popup-login').hide();
        $.ajax({
            type: 'get',
            url: hosturl+"login/reg?act=getpwd&jsoncallback=?",
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            success: function(data) {
                $("#masks").html(data.html);
                centerObj('.popup-back .popup');
            }
        });
    });
    // 注册弹窗
    $('.h-login, .popup-login, .popup-establish').on('click', '.btn-rgs', function() {
        $('.popup-box').hide();
        $.ajax({
            type: 'get',
            url: hosturl+"login/reg?act=reg&jsoncallback=?",
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            success: function(data) {
                $("#masks").html(data.html);
                centerObj('#masks');
                centerObj('.popup-register .popup');
            }
        });

    });

    $('.popup-establish').on('click', '.btn-bind', function() {
        $('.popup-establish').show().find('.popup-tab li:eq(1)').click();
        centerObj('.popup-establish .popup');
    });

    // 帐号登录记住密码
    if ($('.popup-login').length) {
        checkboxSelect('.popup-login');
    };

    // 注册阅读用户协议
    if ($('.popup-register').length) {
        checkboxSelect('.popup-register');
    };

    // 阅读用户协议弹窗
    $('body').on('click', '.btn-agreement', function() {
        $('.popup-agreement').show();
        centerObj('.popup-agreement .popup');
    });

    // 同意用户协议
    $('.popup-agreement').on('click', '.btn', function() {
        $(this).parents('.popup-agreement').hide();
        $('.popup-register').find('input[type=checkbox]').prop('checked', true);
        checkboxSelect('.popup-register');
    });

    // 弹窗完善资料选项
    if ($('#popup-sex').length) {
        radioSelect('#popup-sex');
        $('#popup-sex').on('change', function() {
            radioSelect('#popup-sex');
        });
    };

    // 点击关闭返回
    $('.popup-bindphone').on('click', '.popup-close', function() {
        $('.popup-bindphone').hide();
    });

    if ($('.popup-login').length || $('.popup-register').length) {
        document.body.onkeydown = function(event) {
            if (event.keyCode == 13) {
                // 登录回车提交
                if ($('.popup-login').is(':visible')) {
                    $.each($('.popup-login').find('.popup-ct'), function(i) {
                        if ($(this).is(':visible')) {
                            $(this).find('.btn').trigger('click');
                        }
                    });
                }

                // 注册回车提交
                if ($('.popup-register').is(':visible')) {
                    $('.popup-register').find('.btn').trigger('click');
                }
            }
        }
    };

    // 手机地区下拉
    $('.area-code').on('mouseover', function() {
        $(this).find('.area-code-list').show();
    }).on('mouseout', function() {
        $(this).find('.area-code-list').hide();
    }).on('click', 'li', function() {
        var parent = $(this).parents('.area-code');
        parent.find('.area-code-txt').html($(this).find('.val').html());
        parent.find('.area-code-list').hide();
        return false;
    });

    // 弹窗举报
    if ($('.popup-report').length) {
        radioSelect('.popup-report .label');
        $('.popup-report .label').on('change', function() {
            radioSelect('.popup-report .label');
        });
    };

    $('.popup-report').on('click', '.btn-blue', function() {
        $('.popup-report').hide();
        console.log('举报成功');
        tipSave('suc', '举报成功!');
    })
    .on('click', '.btn-gray', function() {
        $('.popup-report').hide();
        console.log('取消举报');
    });

});


// 保存成功失败 status为suc或者fail，cont为提示的内容
function tipSave(status, cont, times) {
    var time;
    if (status == 'suc') {
        icon = 'gou'
    }
    if (status == 'fail') {
        icon = 'fail'
    }
    times ? time = times : time = 2000
    if (!$('.user-tip').length) {
        $('body').append('<div class="user-tip">' + '<span class="icon icon-' + icon + '"></span>' + '<span class="text">' + cont + '</span>' + '</div>');
    } else {
        $('.user-tip').find('.icon').attr('class', 'icon icon-' + icon);
        $('.user-tip').find('.text').html(cont);
    }
    $('.user-tip').css({
        'margin-left': -$('.user-tip').outerWidth() / 2
    }).show();
    maskShow();
    if ($('.tip-num').length) {
        var tipTimer = setInterval(function() {
            if ($('.tip-num').html() == 1) {
                $('.user-tip').hide();
                maskHide();
                clearInterval(tipTimer);
            }
            $('.tip-num').html($('.tip-num').html() - 1);
        }, 1000);
    } else {
        setTimeout(function() {
            $('.user-tip').hide();
            maskHide();
        }, time);
    }
};

function maskHide() {
    $('#mask').hide();
};
function errmsg(msg){
    tipSave('suc', msg);
}