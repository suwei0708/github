(function($) {
    $(function() {
        function errmsg(msg){
            tipSave('suc', msg);
        }
        // 导航下拉
        $('.nav').on('mouseover', 'li', function() {
                $(this).addClass('hover').find('.nav-sub').show();
            })
            .on('mouseout', 'li', function() {
                $(this).removeClass('hover').find('.nav-sub').hide();
            });

        goscrollTop();
        // 判断滚动条底部悬浮
        if(!hasScrollbar()) {
            $('.footer').addClass('footer-fixed');
        }
        $(window).on('resize', function() {
            goscrollTop();
            if(!hasScrollbar()) {
                $('.footer').addClass('footer-fixed');
            }
        });
        $(window).on('scroll', function() {
            goscrollTop();
        });

        function goscrollTop() {
            if ($(window).scrollTop() <= 0) {
                $('#goBack').parents('li').hide();
            } else {
                $('#goBack').parents('li').show();
            }
        }

        //返回顶部
        $('#goBack').on('click', function() {
            $('body, html').animate({
                scrollTop: 0
            }, 200);
            return false;
        });

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

        $('.popup-perfect').on('click', '.btn-blue', function() {
            $('.popup-perfect').hide();
            console.log('完成');
        })
        .on('click', '.btn-gray', function() {
            $('.popup-perfect').hide();
            console.log('跳过');
        });

        $('.ct-share').on('click', '.report', function() {
            $('.popup-report').show();
            centerObj('.popup-report .popup');
        });

        // 初始化城市
        if ($('#popup-city').length) {
            initCitys('#popup-city');

            // 点击城市选项
            $('#popup-city').on('click', function() {
                initCitys('#popup-city');
                if ($('#popup-city').attr('data-city')) {
                    $('.sw-select').show();
                } else {
                    $('.sw-select1').show();
                }
                return false;
            });

            // 点击左侧城市
            $('.sw-select1').on('click', 'a', function() {
                $(this).addClass('cur').parent('li').siblings().find('a').removeClass('cur');
                twoCitys('#popup-city');
                $('.sw-select2').show();
                return false;
            });
            // 点击右侧城市
            $('.sw-select2').on('click', 'a', function() {
                $(this).addClass('cur').parent('li').siblings().find('a').removeClass('cur');
                $('#popup-city').val($('.sw-select1').find('.cur').text() + ' / ' + $('.sw-select2').find('.cur').text());
                $('#popup-city').attr('data-province', $('.sw-select1').find('.cur').text()).attr('data-city', $('.sw-select2').find('.cur').text())
                $('.sw-select').hide();
                return false;
            });
        }

        // 收藏夹
        if ($('#popup-collect-list').length) {
            checkboxSelect('#popup-collect-list');
            $('.popup-collect').on('click', '.txt-box .btn', function() { // 管理收藏夹 添加收藏夹
                    var val = $.trim($(this).prevAll('.txt').val());
                    if (!!val) {
                        $.post("/userinfo/addfav/",{key:val},function(data) {
                            if(data>0) {
                                var html = '<li>' + '<span class="fr num">0</span>' + '<label><input type="checkbox" name="collect" value="' + data + '">' + val + '</label>' + '</li>';
                                $('#popup-collect-list li:eq(0)').after(html);
                                checkboxSelect('#popup-collect-list');
                            }else{
                                $(".h-login .btn-lg").click();
                            }
                        });
                    } else {
                        $.msgBox.Alert(null, '收藏夹名称不能为空！');
                    }
                })
                .on('click', '.popup-btn-box .btn', function() { // 添加收藏夹 保存
                    var tid=$(".praise").attr("tid");
                    var classid=$(".list").find('input[type=checkbox]:checked').attr('myid');
                    if(classid==""||classid=="undefined"){
                        $.msgBox.Alert(null, '请选择收藏夹！');
                        return false;
                    }
                    $.get("/userinfo/actfav/add/"+tid+"/"+classid,function(data){
                                 if(data==1){
                                     $(this).parents('.popup-collect').hide();
                                     maskHide();
                                     if ($('.content-box').length) {
                                         tipSave('suc', '收藏成功！');
                                         $(".popup-collect").remove();
                                         $('.content-box, .fix-topbar,.ct-share').find('.collect').addClass('dis').find('.text').html('已收藏');
                                         $('.content-box,.fix-topbar,.ct-share').find('.collect').find('.num').html(+$('.content-box').find('.collect').find('.num').html() + 1);
                                     }
                                 }else{
                                     $(".h-login .btn-lg").click();
                                 }
                    })
                });
        };
        // 个人中心私信
        if ('.user-msgct') {
            letter();
        }
        /* 回复详情个人资料 */
        $('.btn-letter').on('click', function() {
            //$('.popup-letter').show();
            var uid=$(this).attr("uid");
            $.get("/member/letter/"+uid,function(data){
                if(data==""){
                    $(".btn-lg").click();
                }else {
                    $("#masks").html(data);
                    centerObj('.popup-letter .popup');
                    letter();
                }
            })
        });

        // 问题反馈
        $('.talk').on('click', '.ico-edit', function() {
            $('.popup-feedback').show();
            centerObj('.popup-feedback .popup');
            return false;
        });

        // 显示绑定手机提示
        // tipPhone();

        // 点击绑定手机号
        $('.bind-phone').on('click', function() {
            $('.popup-bindphone').show();
            centerObj('.popup-bindphone .popup');
        });
        // 点击修改手机号
        $('.edit-phone').on('click', function() {
            $('.popup-editphone').show();
            centerObj('.popup-editphone .popup');
        });

        // 绑定手机判断非空
        $('.popup-phone').on('blur', '.txt', function() {
                if (!$.trim($(this).val())) {
                    if (!$(this).parents('.item').find('.tips').length) {
                        $(this).parents('.item').append('<div class="tips"></div>');
                    }
                    $(this).addClass('txt-error').parents('.item').find('.tips').html($(this).attr('placeholder') + '不能为空').show();
                    centerObj($(this).parents('.popup-phone').find('.popup'));
                    return false;
                } else {
                    if ($(this).hasClass('txt-telphone')) {
                        if (isMobile($(this).val())) {
                            if (!$(this).parents('.item').find('.tips').length) {
                                $(this).parents('.item').append('<div class="tips"></div>');
                            }
                            $(this).addClass('txt-error').parents('.item').find('.tips').html($(this).attr('placeholder') + '不正确').show();
                            centerObj($(this).parents('.popup-phone').find('.popup'));
                            return false;
                        } else if ($(this).index() == 1 && $(this).val() != $(this).parents('.popup').find('.txt-telphone').val()) {
                            if (!$(this).parents('.item').find('.tips').length) {
                                $(this).parents('.item').append('<div class="tips"></div>');
                            }
                            $(this).addClass('txt-error').parents('.item').find('.tips').html('你输入的手机号与原手机号不一致，请重新输入').show();
                            centerObj($(this).parents('.popup-phone').find('.popup'));
                            return false;
                        }

                    }
                    if ($(this).hasClass('txt-yzm')) {
                        if ($(this).val().length != 6) {
                            if (!$(this).parents('.item').find('.tips').length) {
                                $(this).parents('.item').append('<div class="tips"></div>');
                            }
                            $(this).addClass('txt-error').parents('.item').find('.tips').html('验证码不正确').show();
                            centerObj($(this).parents('.popup-phone').find('.popup'));
                            return false;
                        }
                    }
                }
            })
            .on('focus', '.txt', function() {
                $(this).removeClass('txt-error').parents('.item').find('.tips').hide();
                centerObj($(this).parents('.popup-phone').find('.popup'));
            });

        // 绑定手机确定
        $('body').on('click', '.popup-phone .btn', function() {
            var pass = true;
            $.each($(this).parents('.popup-phone').find('.txt'), function(i) {
                if (!$.trim($(this).val())) {
                    if (!$(this).parents('.item').find('.tips').length) {
                        $(this).parents('.item').append('<div class="tips"></div>');
                    }
                    $(this).addClass('txt-error').parents('.item').find('.tips').html($(this).attr('placeholder') + '不能为空').show();
                    pass = false;
                } else {
                    if ($(this).hasClass('txt-telphone')) {
                        if (isMobile($(this).val())) {
                            if (!$(this).parents('.item').find('.tips').length) {
                                $(this).parents('.item').append('<div class="tips"></div>');
                            }
                            $(this).addClass('txt-error').parents('.item').find('.tips').html('手机号码不正确').show();
                            pass = false;
                        } else if ($(this).index() == 1 && $(this).val() != $(this).parents('.popup').find('.txt-telphone').val()) {
                            if (!$(this).parents('.item').find('.tips').length) {
                                $(this).parents('.item').append('<div class="tips"></div>');
                            }
                            $(this).addClass('txt-error').parents('.item').find('.tips').html('你输入的手机号与原手机号不一致，请重新输入').show();
                            pass = false;
                        }
                    }
                    if ($(this).hasClass('txt-yzm')) {
                        if ($(this).val().length != 6) {
                            if (!$(this).parents('.item').find('.tips').length) {
                                $(this).parents('.item').append('<div class="tips"></div>');
                            }
                            $(this).addClass('txt-error').parents('.item').find('.tips').html('验证码不正确').show();
                            pass = false;
                        }
                    }
                }
            });

            centerObj($(this).parents('.popup-phone').find('.popup'));
            if (pass) {
                $(this).parents('.popup-phone').hide();
                if ($(this).parents('.popup-phone').hasClass('popup-editphone')) {
                    // 修改手机号
                    tipSave('suc', '修改成功！')
                }
                if ($(this).parents('.popup-phone').hasClass('popup-bindphone')) {
                    // 绑定机号
                    $.post("/userinfo/bindtel",{tel:$.trim($("#mytel").val()),code:$.trim($("#mycode").val())},function(data){
                        data=JSON.parse(data);
                        tipSave(data.ico, data.msg);
                    })
                }
            }
        });

        // 发送验证码
        $('body').on('click', '.popup-phone .sendcode', function() {
            var tel = $(this).parents(".popup-ct").find("#mytel").val();
            if(tel==""||tel.length!=11){
                $(this).parents(".popup-ct").find("#mytel").focus();
                return false;
            }
            $("#embed-captcha").show();
            $("#embed-captcha").find(".geetest_radar_tip").click();

            // $.post("/login/sendcode",{tel:tel},function(data){
            //
            // })
            if ($(this).parents('.popup-phone').hasClass('popup-editphone')) {
                // 修改手机号执行事件
            }
            if ($(this).parents('.popup-phone').hasClass('popup-bindphone')) {
                // 绑定机号执行事件
            }
            // var _this = $(this).parents('.yzm');
            // var i = 59;
            // _this.html('<span class="times">' + i + '</span>s重新发送');
            // var codeTimer = setInterval(function() {
            //     i--;
            //     _this.find('.times').html(i);
            //     if (i == 0) {
            //         clearInterval(codeTimer);
            //         _this.html('<a href="javascript:;" class="sendcode">发送验证码</a>')
            //     }
            // }, 1000);
        });

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

        $('.bdsharebuttonbox').on('mouseover', '.bds_weixin', function() {
            if (!$('#bdshare_weixin_qrcode_dialog').length) {
                $('.bds_weixin')[0].click();
            }
            $('#bdshare_weixin_qrcode_dialog').hide();
            var _this = $(this);
            setTimeout(function() {
                $('#bdshare_weixin_qrcode_dialog').css({
                    left: _this.offset().left - 262 / 2 + 15,
                    top: _this.offset().top - 327
                }).show();
                $('#bdshare_weixin_qrcode_dialog').css({
                    opacity: 1
                });
            }, 100);
        })
        .on('mouseleave', '.bds_weixin', function() {
            $('#bdshare_weixin_qrcode_dialog').hide();
            $('.bd_weixin_popup_bg').hide();
        })
        .on('click',  '.bds_weixin', function() {
            $('#bdshare_weixin_qrcode_dialog').css({
                opacity: 0
            });
            $('#bdshare_weixin_qrcode_dialog').hide();
            var _this = $(this);
            setTimeout(function() {
                $('#bdshare_weixin_qrcode_dialog').css({
                    left: _this.offset().left - 262 / 2 + 15,
                    top: _this.offset().top - 327
                }).show();
                $('#bdshare_weixin_qrcode_dialog').css({
                    opacity: 1
                });
            }, 100);
            return false;
        });

        $('body').on('click', '#logout', function() {
            $.ajax({
                type: 'get',
                url: hosturl+"login/logout?jsoncallback=?",
                dataType: 'jsonp',
                jsonp: "jsoncallback",
                success: function(data) {
                    $(".h-user").append('<iframe id="loginoutf" name="loginoutf" src="http://old.zhisheji.com/plugin.php?id=zsj_search:loginout" style="display: none"></iframe>')
                    setTimeout(function(){ location.href='/';}, 800);
                }
            });
        });
    });
    $(".header").on("click","#search_btn",function(){
        var text=$.trim($(".header .txt").val())
        if(text==""){
            $(".header .txt").focus();
        }else{
            $.post(hosturl+"search/getpy/",{key:text},function(data){
                location.href=hosturl+'search/'+data+".html";
            })
        }
    })
    // 登录框下划线
    $('body').on('focus', '.popup-box-line .txt', function() {
        $(this).parents('.item').addClass('item-line');
    })
    .on('blur', '.popup-box-line .txt', function() {
        $(this).parents('.item').removeClass('item-line');
    });

    // radio美化
    if($('.radio').length) {
        $.each($('.radio'), function(index, val) {
            radioSelect('.radio');
            $('.radio').on('change', function() {
                radioSelect('.radio');
            });
        });
    };

    // 评论通用点赞
    $('.ct-comment').on('click', '.btn-praise', function() {
        var _this = $(this);
        if(!_this.hasClass('praise-ok')) {
            var pid = _this.attr('pid');
            var tid = _this.attr('tid');
            $.post('/userinfo/msgdz/',{pid:pid,tid:tid},function(data){
                if(data.length>100){
                    $(".h-login .btn-lg").click();
                    return false;
                }else {
                    data = JSON.parse(data);
                    if (data.icon == 'suc') {
                        if (!_this.find('.add').length) {
                            _this.append('<span class="add">+1</span>');
                        }
                        _this.find('.add').fadeIn();
                        setTimeout(function () {
                            _this.find('.add').fadeOut();
                        }, 800);
                        var num = 0;
                        if (_this.find('.num').length) {
                            var num = _this.find('.num').text();
                        }
                        else {
                            _this.find('.icon-praise2').after('<span class="num"></span>');
                        }
                        num = parseInt(num) + 1;
                        _this.addClass('praise-ok').find('.num').html(num);
                    }
                }
            });
        }
    });

    // 点击body表情消失
    if($('.ct-comment').length) {
        $('body').on('click', function() {
            $('.sllt').hide();
        });
    }

})(jQuery);

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
        var _html = '<div id="sw-con">';
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
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        maskShow();
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
                maskHide();
                if (typeof(callback) == 'function') {
                    callback();
                }
            });
        }
        //取消按钮事件
    var btnNo = function() {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-con').remove();
            maskHide();
        });
    }
})();

// 里面元素滚动到底外部容器不滚动
jQuery.fn.scrollUnique = function() {
    return jQuery(this).each(function() {
        var eventType = 'mousewheel';
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        jQuery(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0 ? 0 : scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }
        });
    });
};

/*复制代码到剪切板*/
function copyToClipboard() {
    var e = document.getElementById("contents"); //对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
};

function isEmail(str) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
};

function isNS(str) {
    var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
    var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
    var result = regNumber.test(str) && regString.test(str)
    return result;
};

// 背景遮罩函数
function maskShow() {
    if (!jQuery('#mask').length) {
        jQuery('body').append('<div id="mask"></div>');
    }
    jQuery('#mask').show();
};

function maskHide() {
    jQuery('#mask').hide();
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
    });
};
// checkbox选中效果
function checkboxSelect(obj) {
    jQuery.each(jQuery(obj).find('input[type=checkbox]'), function(i) {
        if (!jQuery(this).parents('label').find('.ico-radio').length) {
            jQuery(this).wrap('<span class="ico-radio"></span>');
        }
        if (jQuery(this).prop('checked')) {
            jQuery(this).parents('span').addClass('ico-radio-cur');
        }
        jQuery(this).on('change', function() {
            if (jQuery(this).prop('checked')) {
                jQuery(this).val(1);
                jQuery(this).parents('span').addClass('ico-radio-cur');
            } else {
                jQuery(this).val(0);
                jQuery(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};
//清空两边空格
function trimform(obj) {
    obj.find("input").each(function(){
        $(this).val($.trim($(this).val()))
    })
}

//提交数据显示loading
function loading() {
    tipSave("suc","正在提交",2000);
}

//关闭loading
function closeing() {
    maskHide();
}

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
    if (!jQuery('.user-tip').length) {
        jQuery('body').append('<div class="user-tip">' + '<span class="icon icon-' + icon + '"></span>' + '<span class="text">' + cont + '</span>' + '</div>');
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
/*
*头部显示
 */
function loginhead(){
    if(jQuery("#loginhead").length) {
        jQuery.ajax({
            type: 'get',
            url: hosturl+"login/reg?act=loginhead&jsoncallback=?",
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            success: function(data) {
                jQuery("#loginhead").html(data.html);
            }
        });
    }
}

//发送短信
function sendcode() {
    // if($("#mytel").length) {
    $.post("/login/sendcode", {tel: $("#mytel").val()}, function (obj) {
        if (obj == 1) {
            var _this = $(".sendcode").parents('.yzm');
            var i = 60;
            _this.html('<span class="times">' + i + '</span>s重新发送');
            var codeTimer = setInterval(function () {
                i--;
                _this.find('.times').html(i);
                if (i == 0) {
                    clearInterval(codeTimer);
                    _this.html('<a href="javascript:;" class="sendcode">获取验证码</a>')
                }
            }, 1000);
        } else {
            tipSave('fail', '发送失败,检查输入的电话号码');
        }
    })
    // }
    // else if($("#mymail").length){
    //     $.post("/login/sendcodemail",{email:$("#mymail").val()},function(obj){
    //         if (obj == 1) {
    //             var _this = $(".sendcode").parents('.yzm');
    //             var i = 5;
    //             _this.html('<span class="times">' + i + '</span>s重新发送');
    //             var codeTimer = setInterval(function () {
    //                 i--;
    //                 _this.find('.times').html(i);
    //                 if (i == 0) {
    //                     clearInterval(codeTimer);
    //                     _this.html('<a href="javascript:;" class="sendcode">获取验证码</a>')
    //                 }
    //             }, 1000);
    //         } else {
    //             tipSave('fail', '发送失败,检查输入的邮箱');
    //         }
    //     })
    // }

}

/*
*luxiaokuo
*2018/7/20
*意见反馈
 */
function feedback(){
    $.get(hosturl+"feedback",function(data){
        $("#feedback").html(data);
    })
}

/*
 *  全国二级城市联动 json
 */
var cityJson = {
    "0": ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西", "海南省", "四川省", "贵州省", "云南省", "西藏", "陕西省", "甘肃省", "青海省", "宁夏", "新疆", "香港", "澳门", "台湾省"],
    "0_0": ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", "延庆镇"],
    "0_1": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "蓟县", "宁河县", "芦台镇", "静海县", "静海镇"],
    "0_2": ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "城桥镇"],
    "0_3": ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "合川市", "永川区市", "江津市", "南川市", "綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "垫江县", "武隆县", "丰都县", "城口县", "梁平县", "开县", "巫溪县", "巫山县", "奉节县", "云阳县", "忠县", "石柱土家族自治县", "彭水苗族土家族自治县", "酉阳土家族苗族自治县", "秀山土家族苗族自治县"],
    "0_4": ["石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "保定市", "衡水市", "沧州市", "邢台市", "邯郸市"],
    "0_5": ["太原市", "朔州市", "大同市", "阳泉市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市", "吕梁市", "运城市"],
    "0_6": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市", "巴彦淖尔市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
    "0_7": ["沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "本溪市", "辽阳市", "鞍山市", "丹东市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市"],
    "0_8": ["长春市", "白城市", "松原市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边州"],
    "0_9": ["哈尔滨市", "齐齐哈尔市", "七台河市", "黑河市", "大庆市", "鹤岗市", "伊春市", "佳木斯市", "双鸭山市", "鸡西市", "牡丹江市", "绥化市", "大兴安岭地区"],
    "0_10": ["南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市", "南通市", "镇江市", "常州市", "无锡市", "苏州市"],
    "0_11": ["杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市", "台州市", "温州市", "丽水市"],
    "0_12": ["合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市", "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市", "宣城市"],
    "0_13": ["福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市"],
    "0_14": ["南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市", "抚州市", "宜春市", "吉安市"],
    "0_15": ["济南市", "青岛市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市"],
    "0_16": ["郑州市", "开封市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市", "济源市"],
    "0_17": ["武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市", "咸宁市", "荆州市", "宜昌市", "随州市", "省直辖县级行政单位", "恩施州"],
    "0_18": ["长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市", "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西州"],
    "0_19": ["广州市", "深圳市", "清远市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市", "汕尾市", "惠州市", "东莞市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市", "阳江市", "茂名市", "湛江市"],
    "0_20": ["南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市", "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市"],
    "0_21": ["海口市", "三亚市", "省直辖行政单位"],
    "0_22": ["成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市", "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "达州市", "资阳市", "眉山市", "雅安市", "阿坝州", "甘孜州", "凉山州"],
    "0_23": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区", "黔东南州", "黔南州", "黔西南州"],
    "0_24": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "思茅市", "临沧市", "德宏州", "怒江州", "迪庆州", "大理州", "楚雄州", "红河州", "文山州", "西双版纳州"],
    "0_25": ["拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区"],
    "0_26": ["西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "榆林市", "安康市", "商洛市"],
    "0_27": ["兰州市", "嘉峪关市", "白银市", "天水市", "武威市", "酒泉市", "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏州", "甘南州"],
    "0_28": ["西宁市", "海东地区", "海北州", "海南州", "黄南州", "果洛州", "玉树州", "海西州"],
    "0_29": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
    "0_30": ["乌鲁木齐市", "克拉玛依市", "自治区直辖县级行政单位", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区", "哈密地区", "克孜勒苏柯州", "博尔塔拉州", "昌吉州", "巴音郭楞州", "伊犁州", "塔城地区", "阿勒泰地区"],
    "0_31": ["香港特别行政区"],
    "0_32": ["澳门特别行政区"],
    "0_33": ["台北", "高雄", "台中", "花莲", "基隆", "嘉义", "金门", "连江", "苗栗", "南投", "澎湖", "屏东", "台东", "台南", "桃园", "新竹", "宜兰", "云林", "彰化"]
};

function initCitys(obj) {
    var province = jQuery(obj).attr('data-province');
    var city = jQuery(obj).attr('data-city');

    if (!jQuery('.sw-select').length) {
        jQuery(obj).after('<ul class="sw-select sw-select1"></ul><ul class="sw-select sw-select2"></ul>');
    }
    if (!jQuery('.sw-select1 a').hasClass('cur')) {
        jQuery.each(cityJson[0], function(i, val) {
            if (val == province) {
                jQuery('.sw-select1').append('<li><a href="javascript:;" class="cur" data-num="' + i + '">' + val + '<span class="user-ico arrow"></span></a></li>');
            } else {
                jQuery('.sw-select1').append('<li><a href="javascript:;" data-num="' + i + '">' + val + '<span class="user-ico arrow"></span></a></li>');
            }
        });
    };
    if (jQuery('.sw-select1 a').hasClass('cur')) {
        var citys = cityJson['0_' + jQuery('.sw-select1').find('.cur').attr('data-num')];
        jQuery.each(citys, function(i, val) {
            if (val == city) {
                jQuery('.sw-select2').append('<li><a href="javascript:;" class="cur" data-num="' + i + '">' + val + '</a></li>');
            } else {
                jQuery('.sw-select2').append('<li><a href="javascript:;">' + val + '</a></li>');
            }
        });
    }
};

function twoCitys(obj) {
    var city = jQuery(obj).attr('data-city');
    var citys = cityJson['0_' + jQuery('.sw-select1').find('.cur').attr('data-num')];
    jQuery('.sw-select2').html('');
    jQuery.each(citys, function(i, val) {
        if (val == city) {
            jQuery('.sw-select2').append('<li><a href="javascript:;" class="cur">' + val + '</a></li>');
        } else {
            jQuery('.sw-select2').append('<li><a href="javascript:;">' + val + '</a></li>');
        }
    });
};

function monitorVal(obj, nums, minus) {

    if (minus) {
        if(jQuery(obj).nextAll('.num-box').find('.num').length) {
            jQuery(obj).nextAll('.num-box').find('.num').html(nums - jQuery(obj).val().length);
        }
    } else {
        if(jQuery(obj).nextAll('.num-box').find('.num').length) {
            jQuery(obj).nextAll('.num-box').find('.num').html(jQuery(obj).val().length);
        }
    }

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

function getloginframe_message() {
    var message = jQuery('#loginframe').contents().find('#messagetext p').eq(0).text();
    if (message.indexOf('欢迎您回来') != -1) {
        location.href = location.href;
    }
};

//分页插件
var ms = {
    init: function(obj, args) {
        return (function() {
            ms.fillHtml(obj, args);
            ms.bindEvent(obj, args);
        })();
    },
    //填充html
    fillHtml: function(obj, args) {
        return (function() {
            obj.empty();
            //上一页
            if (args.current > 1) {
                obj.append('<a href="javascript:;" onclick="gopage(' + (args.current - 1) + ')" class="prevPage">上一页</a>');
            } else {
                obj.remove('.prevPage');
                obj.append('<span class="disabled">上一页</span>');
            }
            //中间页码
            if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
                obj.append('<a href="javascript:;" onclick="gopage(' + (1) + ')" class="tcdNumber">' + 1 + '</a>');
            }
            if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
                obj.append('<span>···</span>');
            }
            var start = args.current - 2,
                end = args.current + 2;
            if ((start > 1 && args.current < 4) || args.current == 1) {
                end++;
            }
            if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
                start--;
            }
            for (; start <= end; start++) {
                if (start <= args.pageCount && start >= 1) {
                    if (start != args.current) {
                        obj.append('<a href="javascript:;" onclick="gopage(' + (start) + ')" class="tcdNumber">' + start + '</a>');
                    } else {
                        obj.append('<span class="cur">' + start + '</span>');
                    }
                }
            }
            if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
                obj.append('<span>...</span>');
            }
            if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
                obj.append('<a href="javascript:;"  onclick="gopage(' + (args.pageCount) + ')" class="tcdNumber">' + args.pageCount + '</a>');
            }
            //下一页
            if (args.current < args.pageCount) {
                obj.append('<a href="javascript:;" onclick="gopage(' + (args.current + 1) + ')" class="nextPage">下一页</a>');
            } else {
                obj.remove('.nextPage');
                obj.append('<span class="disabled">下一页</span>');
            }
        })();
    },
    //绑定事件
    bindEvent: function(obj, args) {
        return (function() {
            obj.on("click", "a.tcdNumber", function() {
                var current = parseInt(jQuery(this).text());
                ms.fillHtml(obj, {
                    "current": current,
                    "pageCount": args.pageCount
                });
                if (typeof(args.backFn) == "function") {
                    args.backFn(current);
                }
            });
            //上一页
            obj.on("click", "a.prevPage", function() {
                var current = parseInt(obj.children("span.cur").text());
                ms.fillHtml(obj, {
                    "current": current - 1,
                    "pageCount": args.pageCount
                });
                if (typeof(args.backFn) == "function") {
                    args.backFn(current - 1);
                }
            });
            //下一页
            obj.on("click", "a.nextPage", function() {
                var current = parseInt(obj.children("span.cur").text());
                ms.fillHtml(obj, {
                    "current": current + 1,
                    "pageCount": args.pageCount
                });
                if (typeof(args.backFn) == "function") {
                    args.backFn(current + 1);
                }
            });
        })();
    }
}
jQuery.fn.createPage = function(options) {
    var args = jQuery.extend({
        pageCount: 10,
        current: 1,
        backFn: function() {}
    }, options);
    ms.init(this, args);
}

function letter() {
    (function($) {
        $('.user-msgct').on('mouseover', '.uinfo', function() {
                $(this).find('.uinfo-list').show();
            })
            .on('mouseleave', '.uinfo', function() {
                $(this).find('.uinfo-list').hide();
            });
        $('.uinfo-list').on('click', '.u-ico', function() {
            if ($(this).hasClass('u-ygz')) {
                $(this).hide();
                $('.u-wgz').show();
            } else {
                $(this).hide();
                $('.u-ygz').show();
            }
        });

        if ($('.user-msgct').length) {
            $('.user-msgct-ct').scrollUnique();
        };

        $('.user-msgct').on('click', '.btn-sure', function() {
            if ($.trim($('.user-msgct').find('.text').val())=="") {
                $.msgBox.Alert(null, '回复内容不能为空');
                return false;
            }

            if($("#touid").length) {
                var touid=$("#touid").val()
                $.post("/userinfo/savepm", {message: $.trim($('.user-msgct').find('.text').val()), touid: touid},function(data){
                    if(data=="尚未实名认证"){
                        tipPhone();
                    }else {
                        $('.user-msgct-ct').append(data).scrollTop(999999);
                    }
                })
            }
           // var msgHtml = '<div class="umsg umsg-r">' + '<span class="img"><img src="http://q.qlogo.cn/qqapp/101341581/C781FBAEE76D838500FA8B86CFE9ECAA/100"></span>' + '<div class="umsg-ct">' + $('.user-msgct').find('.text').val() + '<span class="arrow"></span></div>' + '<span class="time">' + '刚刚' + '</span>' + '</div>';
            $('.user-msgct').find('.text').val('');
        });
        // 监听input字数
        if ($('.popup-letter').length) {
            monitorVal('.popup-letter .text', 400);
        };
    })(jQuery);
}

function isMobile(sMobile) {
    if (/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(sMobile)) {
        return false;
    } else {
        return true;
    }
}

function tipPhone() {
    (function($) {

        $.ajax({
            type: 'get',
            url: hosturl+"/login/reg?act=bindphone",
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            success: function(data) {
                if (!$('.popup-tipphone').length) {
                    $('body').append(data.html);
                }
                $('.popup-tipphone').show();
                centerObj('.popup-tipphone .popup');
                // 点击去绑定手机
                $('body').on('click', '.popup-tipphone .btn', function() {
                    if ($('.popup-bindphone').length) {
                        $('.popup-bindphone').show();
                        centerObj('.popup-bindphone .popup');
                    }
                    $('.popup-tipphone').hide();
                });
                $('body').on('click', '.popup-tipphone .popup-close', function() {
                    $(this).parents('.popup-tipphone').hide();
                });

                // if ($('#ispost').val() && $('#isshim').val() != 1) {
                // 点击关闭返回
                $('body').on('click', '.popup-tipphone .popup-close', function() {
                    // history.go(-1);
                    $(this).parents('.popup-tipphone').hide();
                });
            }
        });

    })(jQuery);
}

$('body').on('click', '.txt', function() {
    if(!$("#scbar_form1").length){
    document.onkeydown = function (e) {
        if (!e) e = window.event;
        if ((e.keyCode || e.which) == 13) {
            if($("#postform").length==0) {
                $("#search_btn").click();
            }
        }
        else if ((e.keyCode || e.which) == 27) {
            if($("#cpfm").length>0) {
                $("#cpfm").find(".hdr .cancel").click();
            }
        }
    }
    }
});

function showRgister() {
    jQuery('.popup-register').show();
    centerObj('.popup-register .popup');
}

function alertMsg(txt) {
    jQuery.msgBox.Alert(null, txt);
}
function hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}