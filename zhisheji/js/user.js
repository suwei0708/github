(function($) {
$(function() {
    /*  基本资料  */
    // 基本资料性别选项
    if($('#sex').length) {
        radioSelect('#sex');
        $('#sex').on('change', function() {
            radioSelect('#sex');
        });
    }

    // 基本资料公开选项
    if($('.user-basedata .contact').length) {
        checkboxSelect('.user-basedata .contact');

        jQuery(this).find('input[type=checkbox]').hide();
        jQuery('.user-basedata .contact').on('click', 'label', function() {
            if (jQuery(this).find('input[type=checkbox]').prop('checked')) {
                // 选中
                jQuery(this).find('input[type=checkbox]').prop('checked', false);
                jQuery(this).find('span').removeClass('ico-radio-cur');
                if(jQuery(this).parents('.item').find('dt').text() == '邮箱') {
                    console.log('选中邮箱')
                }
                else if(jQuery(this).parents('.item').find('dt').text() == '微信') {
                    console.log('选中微信')
                }
            }
            else {
                // 取消选中
                jQuery(this).find('input[type=checkbox]').prop('checked', true);
                jQuery(this).find('span').addClass('ico-radio-cur');
                if(jQuery(this).parents('.item').find('dt').text() == '邮箱') {
                    console.log('取消选中邮箱')
                }
                else if(jQuery(this).parents('.item').find('dt').text() == '微信') {
                    console.log('取消选中微信')
                }
            }
            return false;
        });
    }

    // 裁剪头像
    $('#avatarInput').on('change', function(e) {
        var filemaxsize = 1024 * 10;//5M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;
        if(Size > filemaxsize) {
            $.msgBox.Alert(null, '图片大于10M，请重新选择!');
            return false;
        }
        if(!this.files[0].type.match(/image.*/)) {
            $.msgBox.Alert(null, '请选择正确的图片!');
        } else {
            var file = target[0].files[0];
            var src = window.URL.createObjectURL(file);
            $('.user-editbox .img').html('<img id="image" src="' + src + '" width="335" height="335"/>');
            var image = document.getElementById('image');
            $(image).on('load', function() {
                $(image).cropper({
                    aspectRatio: 200 / 200,
                    viewMode : 2,//显示
                    dragMode : "move",
                    preview: '.img-preview'
                });
            });
        }
    });

    // 关闭裁剪头像
    $('.user-editbox-close').on('click', function() {
        $('.user-editbox').hide();
        maskHide();
    });

    // 上传图像
    $('.data-img .img').on('click', function() {
        $('.user-editbox').show();
        maskShow();
        var src = $('.user-infos .img').attr('src');
        $('.user-editbox .img').html('<img id="image" src="' + src + '" width="335" height="335"/>');

        var image = document.getElementById('image');
        $(image).on('load', function() {
            $(image).cropper({
                aspectRatio: 200 / 200,
                viewMode : 2,//显示
                dragMode : "move",
                preview: '.img-preview'
            });
        });
    });

    // 保存头像
    $('.user-editbox').on('click', '.btn', function() {
        // var image = document.getElementById('image');
        var $imgData = $(image).cropper('getCroppedCanvas', {
            width: 200,
            height: 200
        });
        dataurl = $imgData.toDataURL('image/png');
        $('.data-img .img img, .user-infos img').attr('src', dataurl);
        $('.user-editbox').hide();
        maskHide();
    });


    // 初始化城市
    if($('#city-input').length) {
        initCitys('#city-input');

        // 点击城市选项
        $('#city-input').on('click', function() {
            initCitys('#city-input');
            if($('#city-input').attr('data-city')) {
                $('.sw-select').show();
            }
            else {
                $('.sw-select1').show();
            }
            return false;
        });

        // 点击左侧城市
        $('.sw-select1').on('click', 'a', function() {
            $(this).addClass('cur').parent('li').siblings().find('a').removeClass('cur');
            twoCitys('#city-input');
            $('.sw-select2').show();
            return false;
        });
        // 点击右侧城市
        $('.sw-select2').on('click', 'a', function() {
            $(this).addClass('cur').parent('li').siblings().find('a').removeClass('cur');
            $('#city-input').val($('.sw-select1').find('.cur').text() + ' / ' + $('.sw-select2').find('.cur').text());
            $('#city-input').attr('data-province', $('.sw-select1').find('.cur').text()).attr('data-city', $('.sw-select2').find('.cur').text())
            $('.sw-select').hide();

            var cityname = $('.user-basedata .txt:eq(5)');
            cityname.nextAll('.tip').hide();

            return false;
        });

        // 点击body关闭城市选项
        if($('.sw-select').length) {
            $('body').on('click', function() {
                $('.sw-select').hide();
            });
        };
    }

    // 保存基本资料
    $('.user-basedata').on('click', '.btn-save', function() {
        var username = $('.user-basedata input[name=lname]');
        if(!$.trim(username.val())) {
            if(username.nextAll('.tip').length) {
                username.nextAll('.tip').find('.text').text(username.parents('dl').find('dt').text() + '不能为空')
            }
            else {
                username.after('<div class="tip">' + username.parents('dl').find('dt').text() + '不能为空</div>')
            }
            return false;
        }
        var sexname = $('#sex');
        if(!$.trim(sexname.find('input:radio:checked').val())) {
            if(sexname.find('.tip').length) {
                sexname.find('.tip').text('请选择性别').show();
            }
            else {
                sexname.append('<span class="tip">请选择性别</span>').show()
            }
            return false;
        }
        var cityname = $('#city-input');
        if($.trim(cityname.val()) == '请选择') {
            if(cityname.nextAll('.tip').length) {
                cityname.nextAll('.tip').text('请填写所在地').show();
            }
            else {
                cityname.after('<span class="tip">请填写所在地</span>').show()
            }
            return false;
        }

        // 随机生成0、1，1成功，0失败
        var random = parseInt(Math.random() * 2);
        if(random) {
            // 保存失败
            tipSave('fail', '保存失败!');
        }
        else {
            // 保存成功
            tipSave('suc', '保存成功，<span class="tip-num">2</span>秒后自动关闭');
        }
    });

    // input失去焦点判断
    $('.user-basedata .txt').on('focus', function() {
        $(this).nextAll('.tip').hide();
    });
    var sexname = $('#sex');
    sexname.on('change', function() {
        if($.trim(sexname.find('input:radio:checked').val())) {
            if(sexname.find('.tip').length) {
                sexname.find('.tip').hide();
            }
        }
    });
    $('.user-basedata input[name=lname]').on('blur', function() {
        var _this = $(this);
        if(!$.trim(_this.val())) {
            if(_this.nextAll('.tip').length) {
                _this.nextAll('.tip').text('用户名不能为空').show();
            }
            else {
                _this.after('<span class="tip">用户名不能为空</span>').show()
            }
        }
    });
    $('#city-input').on('blur', function() {
        var _this = $(this);
        if($.trim(_this.val()) == '请选择') {
            if(_this.nextAll('.tip').length) {
                _this.nextAll('.tip').text('请填写所在地').show();
            }
            else {
                _this.after('<span class="tip">请填写所在地</span>').show()
            }
        }
    });

    // 监听input字数
    if($('.user-basedata .num-box').length) {
        monitorVal('.user-basedata .txt:eq(0)', 15);
        monitorVal('.user-basedata .text', 50);
    }

    // 签到
    $('.user-infos').on('click', '.btn', function() {
        if($(this).text() == '签到') {
            $(this).addClass('dis').html('已签到');
        }
    });

    /* 修改密码 */
    if($('.user-password').length) {
        var oldpassword = $('.user-password').find('.txt:eq(0)');
        var newpassword = $('.user-password').find('.txt:eq(1)');
        var renewpassword = $('.user-password').find('.txt:eq(2)');
        $('.user-password').find('.txt').on('focus', function() {
            $(this).nextAll('.tips').hide();
        });
        $('.user-password').find('.txt').on('blur', function() {
            var _this = $(this);
            if(!_this.nextAll('.tips').length) {
                _this.after('<span class="tips"></span>');
            }
            // 判断非空和长度
            if(!_this.val()) {
                _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>' + _this.parents('.item').find('dt').html() + '不能为空！').show();
            }
            else if(_this.val().length < 6) {
                _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>' + _this.parents('.item').find('dt').html() + '长度不能小于6！').show();
            }
            else if(_this.val().length > 16) {
                _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>' + _this.parents('.item').find('dt').html() + '长度不能大于16！').show();
            }
            else if (_this.parents('.item').find('dt').html() == '确认新密码') {
                if(newpassword.val() != renewpassword.val()) {
                    _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>两次输入的密码不一致').show();
                }
                else {
                    _this.nextAll('.tips').attr('class', 'tips tips-right').html('<span class="icon-gou"></span>').show();
                }
            }
            else {
                _this.nextAll('.tips').attr('class', 'tips tips-right').html('<span class="icon-gou"></span>').show();
            }
        });

        // 修改密码保存
        $('.user-password').on('click', '.btn-save', function() {
            $.each($('.user-password').find('.txt'), function(i) {
                var _this = $(this);
                if(!_this.nextAll('.tips').length) {
                    _this.after('<span class="tips"></span>');
                }
                // 判断非空和长度
                if(!_this.val()) {
                    _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>' + _this.parents('.item').find('dt').html() + '不能为空！').show();
                    return false;
                }
                else if(_this.val().length < 6) {
                    _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>' + _this.parents('.item').find('dt').html() + '长度不能小于6！').show();
                    return false;
                }
                else if(_this.val().length > 16) {
                    _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>' + _this.parents('.item').find('dt').html() + '长度不能大于16！').show();
                    return false;
                }
                else if (_this.parents('.item').find('dt').html() == '确认新密码') {
                    if(newpassword.val() != renewpassword.val()) {
                        _this.nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>两次输入的密码不一致').show();
                        return false;
                    }
                    else {
                        // 验证通过提交数据
                        console.log('保存');
                    }
                }
            });
        });
    }

    /* 删除私信 */
    $('.user-msg-list').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm('删除私信', '确定要删除该私信吗？', function () {
            _this.parents('li').remove();
        });
    });

    /* 评论页 */
    // 点击回复
    // $('.user-msg-list').on('click', '.btn-replay', function() {
    //     var replayForm = $(this).parent('.time').nextAll('.reply-form');
    //     if(replayForm.is(':visible')) {
    //         $('.user-msg-list .reply-form').hide();
    //     }
    //     else {
    //         $('.user-msg-list .reply-form').hide();
    //         replayForm.show();
    //     }
    // });
    // // 点击取消
    // $('.user-msg').on('click', '.btn-cancel', function() {
    //     var replayForm = $(this).parents('.reply-form');
    //     replayForm.hide();
    // });

    // // 回复内容
    // $('.user-msg-list').on('click', '.btn-sure', function() {
    //     // 判断文本内容非空
    //     if(!$.trim($(this).parents('.reply-form').find('.text').val())) {
    //         $.msgBox.Alert(null, '回复内容不能为空');
    //         return false;
    //     }
    //     // 判断回复盒子是否存在，不存在创造追加
    //     if(!$(this).parents('li').find('.reply-box').length) {
    //         $(this).parents('li').append('<div class="reply-box"></div>');
    //     }

    //     var msgHtml = '<div class="com-box">'
    //                     +    '<span class="arrow"></span>'
    //                     +    '<a href="#" class="fll avatar">'
    //                     +        '<img src="../images/avatar.gif" height="30" width="30">'
    //                     +    '</a>'
    //                     +    '<div class="info"><strong><a href="#">木白的白目</a></strong>  回复 <strong><a href="#">样佛爷</a></strong>：' + $(this).parents('.reply-form').find('.text').val() + '</div>'
    //                     +    '<div class="time">' + '刚刚' + '<a href="javascript:;" class="blue btn-replay">回复</a></div>'
    //                     +    '<div class="reply-form">'
    //                     +        '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
    //                     +        '<div class="btn-box">'
    //                     +            '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
    //                     +            '<div class="fr">'
    //                     +                '<a href="javascript:;" class="btn btn-cancel">取消</a>'
    //                     +                '<a href="javascript:;" class="btn btn-sure">回复</a>'
    //                     +            '</div>'
    //                     +        '</div>'
    //                     +    '</div>'
    //                     +'</div>';
    //     $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);
    //     $(this).parents('.reply-form').find('.text').val('');
    // });

    /* 人气排行 */
    if($('.user-ct').length) {
        showRank();
        $(window).on('scroll', function() {
            if(loadRank){showRank()};
        });
        var loadRank = true;
        function showRank() {
            loadRank = false;
            setTimeout(function() {
                var wTop = $(window).scrollTop();
                var rqpmTop = $('#user-rqpm').position().top;
                var jjgzTop = $('#user-jjgz').position().top;
                var zfsjsTop = $('#user-zfsjs').position().top;
                var xzgzTop = $('#user-xzgz').position().top;
                if(wTop >= (xzgzTop - $(window).height() / 2.5)) {
                    $('.user-nav:last()').find('a').removeClass('cur');
                    $('.user-nav:last()').find('li:eq(3)').find('a').addClass('cur');
                }
                else if(wTop >= zfsjsTop) {
                    $('.user-nav:last()').find('a').removeClass('cur');
                    $('.user-nav:last()').find('li:eq(2)').find('a').addClass('cur');
                }
                else if(wTop >= jjgzTop) {
                    $('.user-nav:last()').find('a').removeClass('cur');
                    $('.user-nav:last()').find('li:eq(1)').find('a').addClass('cur');
                }
                else {
                    $('.user-nav:last()').find('a').removeClass('cur');
                    $('.user-nav:last()').find('li:eq(0)').find('a').addClass('cur');
                }
                setTimeout(function() {
                    loadRank = true;
                }, 100);
            }, 200);
        };

        $.each($('.border-box'), function(index) {
            $(this).css({
                'margin-left': -$(this).outerWidth() / 2
            });
        });
        $('.user-popularity .ranking').hover(function(event) {
            var borderBox = $(this).parents('dl').find('.border-box');
            borderBox.css({
                'display': 'block'
            });
        }, function(event) {
            var borderBox = $(this).parents('dl').find('.border-box');
            borderBox.css({
                'display': 'none'
            });
        });
        $('.border-box').hover(function(event) {
            $(this).css({
                'display': 'block'
            });
        }, function(event) {
            $(this).css({
                'display': 'none'
            });
        });
    }

    // 点击关注
    $('.designer').on('click', '.btn', function() {
        console.log($(this))
        if(!$(this).hasClass('dis')) {
            $(this).addClass('dis').html('已关注');
        }
        else {
            $(this).removeClass('dis').html('关注');
        }
    });

    // 左侧关注滚动
    if($('.user-gzlist').length) {
        $('.user-gzlist ul').scrollUnique();
    }

    // 我的收藏
    $('.list-collect').on('mouseover', '.manage', function() {
        $(this).find('.manage-list').show();
    })
    .on('mouseleave', '.manage', function() {
        $(this).find('.manage-list').hide();
    });

    // 我的收藏管理列表点击
    var manageDom;
    $('.manage-list').on('click', 'li', function() {
        var _this = $(this);
        manageDom = _this.parents('.manage').nextAll('a');
        if(_this.index() == 0) {
            // 重命名
            centerObj('.popup-rename .popup');
            $('.popup-rename').show().find('.txt').val(manageDom.text());
            monitorVal('.popup-rename .txt', 15);
        }
        // else if(_this.index() == 1) {
        //     // 是否公开
        //     if(_this.find('span').hasClass('icon-lock-on')) {
        //         manageDom.find('.icon-lock-off').remove();
        //         _this.find('a').html('<span class="icon-lock-off"></span>仅自己可见');
        //     }
        //     else {
        //         manageDom.prepend('<span class="icon-lock-off"></span>');
        //         _this.find('a').html('<span class="icon-lock-on"></span>公开');
        //     }
        // }
        else if(_this.index() == 1) {
            // 删除
            $.msgBox.Confirm(null, '删除此收藏夹，收藏内容也将会同步移除<br/>确定要删除吗？', function() {
                _this.parents('li').remove();
            })
        }
        $(this).parent('.manage-list').hide();
    });

    // 我的收藏详情 删除
    $('#collect-list').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm('删除作品', '确定要删除该作品吗？', function() {
            _this.parents('li').remove();
        });
    });

    // 保存重命名
    $('.popup-rename').on('click', '.btn-blue', function() {
        manageDom.find('strong').text($('.popup-rename').find('.txt').val());
        $(this).parents('.popup').find('.popup-close').click();
    });

    // 重命名取消弹窗
    $('.popup-rename').on('click', '.btn-gray', function() {
        $(this).parents('.popup').find('.popup-close').click();
    });

    // 添加到收藏夹选项
    // if($('#popup-collect-list').length) {
    //     checkboxSelect('#popup-collect-list');
    // }

    // 展示收藏夹弹窗
    if($('.user-box .btn-manage').length) {
        $('.user-box').on('click', '.btn-collect', function() {
            $('.popup-collect').show();
            centerObj('.popup-collect .popup');
            $('.popup-collect .popup-ct').scrollUnique();
        })
        .on('click', '.btn-manage', function() {
            $('.popup-manage').show();
            centerObj('.popup-manage .popup');
            $('.popup-manage .popup-ct').scrollUnique();
        });
    }

    // 管理收藏夹调整
    var manageVal;
    $('.popup-manage').on('click', '.btn-edit', function() { // 管理收藏夹 修改
        $(this).parents('.popup-manage').find('.cur .input').val(manageVal);
        $(this).parents('li').addClass('cur').siblings('li').removeClass('cur').find('.input').attr('disabled', 'disabled');
        monitorVal('.popup-manage .cur .input', 15);
        $(this).parents('li').find('.input').removeAttr('disabled');
        manageVal = $(this).parents('li').find('.input').val();
    })
    .on('click', '.btn-del', function() { // 管理收藏夹 删除
        $(this).parents('li').remove();
    })
    .on('click', '.btn-save', function() { // 管理收藏 夹保存
        $(this).parents('li').removeClass('cur').find('.input').attr('disabled', 'disabled');
    })
    .on('click', '.btn-cancel', function() { // 管理收藏夹 取消
        $(this).parents('li').removeClass('cur');
        $(this).parents('li').find('.input').val(manageVal);
    })
    .on('click', '.txt-box .btn', function() { // 管理收藏夹 添加收藏夹
        var val = $.trim($(this).prevAll('.txt').val());
        if(!!val) {
            var html = '<li>'
                            + '<div class="fr btn-box btn-box1"><a href="javascript:;" class="btn-edit">修改</a><a href="javascript:;" class="btn-del">删除</a></div>'
                            + '<div class="fr btn-box btn-box2"><a href="javascript:;" class="btn-save">保存</a><a href="javascript:;" class="btn-cancel">取消</a></div>'
                            + '<input type="text" value="' + val + '" class="input" disabled>'
                            + '<span class="num-box"><span class="num"></span>/15</span>'
                        + '</li>';
            $('#popup-manage-list li:eq(0)').after(html);
        }
        else {
            $.msgBox.Alert(null, '收藏夹名称不能为空！');
        }
    })
    .on('click', '.popup-btn-box .btn', function() { // 管理收藏夹 保存
        $(this).parents('.popup-manage').hide();
        maskHide();
    });

    // 删除作品
    $('#my-works').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm('删除作品', '确定要删除该作品吗？', function() {
            _this.parents('li').remove();
        });
    });

    // 删除草稿
    $('#drafts-list').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm('删除草稿', '删除后草稿将无法恢复，你确定要删除吗？', function() {
            _this.parents('li').remove();
        });
    });

    // 修改封面
    $('.modcover').on('click', function() {
        $('.popup-homepage').show();
        centerObj('.popup-homepage .popup');
    });
    $('.popup-homepage').on('click', '.btn-gray', function() {
        $('.popup-homepage').hide();
    });

    if($('#choosefile').length) {
       new uploadPreview({ UpBtn: "choosefile", DivShow: "previews", ImgShow: "imghead" });
    }
    $('.s-menu').on('click', '.personal', function() {
        $('.popup-personal').show();
        centerObj('.popup-personal .popup');
        return false;
    });

    if($('.popup-personal').length) {
        $('.popup-personal').on('click', '.popup', function(e) {
            e.stopPropagation();
        });
        $('.popup-personal').on('click', function() {
            $(this).hide();
        });
    }

    // 设计师导航下拉
    $('.tab-tit').on('mouseover', '.tab-li', function() {
        $(this).find('.tab-list').show();
    })
    .on('mouseleave', '.tab-li', function() {
        $(this).find('.tab-list').hide();
    })
    .on('mouseover', '.tab-list-li', function() {
        if($(this).find('.tab-list2').length) {
            $(this).find('.tab-list2').show().parents('.tab-list').addClass('tab-list-cur');
        }
    })
    .on('mouseleave', '.tab-list-li', function() {
        if($(this).find('.tab-list2').length) {
            $(this).find('.tab-list2').hide().parents('.tab-list').removeClass('tab-list-cur');
        }
    });

    //**  修改账号和密码  **//

    // 验证邮箱
    $('.user-bind').on('click', '.test-email', function() {
        // 模拟发送失败
        tipSave('fail', '邮箱已绑定其他账号');
        // 模拟发送成功
        setTimeout(function() {
            tipSave('suc', '验证码已发您邮箱，没有收到请2分钟后重试');
        }, 3000);
        // 模拟验证成功
        setTimeout(function() {
            $('.user-bind').find('.item:eq(0) .tips').attr('class', 'tips tips-right').html('<span class="icon-gou"></span>已绑定');
            $('.user-bind').find('.item:eq(0) dd').append('<button type="button" class="btn-unbind btn-unbind-email">解绑</button>');
        }, 6000);
    });

    // 绑定邮箱
    $('.user-bind').on('click', '.btn-bind-email', function() {
        var input = $(this).prevAll('.txt');
        if(!isEmail($.trim(input.val()))) {
            if(!$(this).nextAll('.tips').length) {
                $(this).parents('dd').append('<div class="tips"></div>');
            }
            $(this).nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>请输入正确的邮箱地址').show();;
        }
        else {
            tipSave('suc', '绑定成功，快去验证邮箱吧');
            $(this).nextAll('.tips').hide();
            var dom = '<div class="name">' + $.trim(input.val()) + '<span class="tips tips-err"><span class="icon-gt"></span>邮箱未认证，<a href="javascript:;" class="blue test-email">点此验证邮箱</a></span></div>'
            $(this).parents('dd').html(dom);
        }
    });

    // 绑定手机
    $('.user-bind').on('click', '.btn-bind-phone', function() {
        var input = $(this).parents('.item').find('.txt');
        if(isMobile($.trim(input.val()))) {
            if(!$(this).nextAll('.tips').length) {
                $(this).parents('dd').append('<div class="tips"></div>');
            }
            $(this).nextAll('.tips').attr('class', 'tips tips-err').html('<span class="icon-gt"></span>请输入正确的手机号').show();;
        }
        else {
            $('.popup-bindphone').show().find('.item-phone .txt').val($.trim(input.val()));
            $('.popup-bindphone').find('.area-code-txt').html($(this).parents('.item').find('.area-code-txt').html());
            console.log($(this).parents('.item').find('.area-code-txt').html())
            $('.popup-bindphone').find('.sendcode').trigger('click');
            $(this).nextAll('.tips').hide();
            centerObj('.popup-bindphone .popup');
        }
    });

    // 绑定QQ
    $('.user-bindother').on('click', '.btn-bind-qq', function() {
        // 模拟微信绑定成功
        $('.user-bindother').find('.item:eq(0)').find('.name').html('QQ昵称');
        $('.user-bindother').find('.item:eq(0)').find('.btn-bind').attr('class', 'btn-unbind btn-unbind-qq').html('解绑');
        tipSave('suc', '绑定成功');
    });

    // 绑定微信
    $('.user-bindother').on('click', '.btn-bind-wx', function() {
        $('.popup-bindwx').show();
        centerObj('.popup-bindwx .popup');

        // 模拟微信绑定成功
        setTimeout(function() {
            $('.popup-box').hide();
            $('.user-bindother').find('.item:eq(1)').find('.name').html('微信昵称');
            $('.user-bindother').find('.item:eq(1)').find('.btn-bind').attr('class', 'btn-unbind btn-unbind-wx').html('解绑');
            tipSave('suc', '绑定成功');
        }, 3000);
    });

    // 解绑邮箱
    $('.user-bind').on('click', '.btn-unbind-email', function() {
        $.msgBox.Confirm(null, '解绑后，无法使用邮箱账号继续登录<br>确定解除绑定吗？', function() {
            tipSave('suc', '解绑成功');
            var dom = '<input type="text" class="txt" value="" placeholder="请输入您的邮箱"> <button type="button" class="btn-bind btn-bind-email">绑定</button>';
            $('.user-bind').find('.item:eq(0) dd').html(dom);
        });
    });
    // 解绑手机号
    $('.user-bind').on('click', '.btn-unbind-phone', function() {
        $.msgBox.Confirm(null, '解绑后，无法使用手机号继续登录<br>确定解除绑定吗？', function() {
            tipSave('suc', '解绑成功');
            var dom = '<div class="phone">+86 <span class="icon-arrowb"></span></div> <input type="text" class="txt txt-phone" value="" placeholder="请输入您手机号"> <button type="button" class="btn-bind btn-bind-phone">绑定</button>';
            $('.user-bind').find('.item:eq(1) dd').html(dom);
        });
    });
    // 解绑qq
    $('.user-bindother').on('click', '.btn-unbind-qq', function() {
        $.msgBox.Confirm(null, '解绑后，无法使用QQ继续登录<br>确定解除绑定吗？', function() {
            tipSave('suc', '解绑成功');
            var dom = '<div class="name">未绑定</div> <button type="button" class="btn-bind btn-bind-qq">绑定</button>';
            $('.user-bindother').find('.item:eq(0) dd').html(dom);
        });
    });
    // 解绑微信
    $('.user-bindother').on('click', '.btn-unbind-wx', function() {
        $.msgBox.Confirm(null, '解绑后，无法使用微信继续登录<br>确定解除绑定吗？', function() {
            tipSave('suc', '解绑成功');
            var dom = '<div class="name">未绑定</div> <button type="button" class="btn-bind btn-bind-wx">绑定</button>';
            $('.user-bindother').find('.item:eq(1) dd').html(dom);
        });
    });

});
})(jQuery);


//图片上传预览
var uploadPreview = function(setting) {
    /*
    *work:this(当前对象)
    */
    var _self = this;
    /*
    *work:判断为null或者空值
    */
    _self.IsNull = function(value) {
        if (typeof (value) == "function") { return false; }
        if (value == undefined || value == null || value == "" || value.length == 0) {
            return true;
        }
        return false;
    }
    /*
    *work:默认配置
    */
    _self.DefautlSetting = {
        UpBtn: "",
        DivShow: "",
        ImgShow: "",
        Width: 100,
        Height: 100,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function() { }
    };
    /*
    *work:读取配置
    */
    _self.Setting = {
        UpBtn: _self.IsNull(setting.UpBtn) ? _self.DefautlSetting.UpBtn : setting.UpBtn,
        DivShow: _self.IsNull(setting.DivShow) ? _self.DefautlSetting.DivShow : setting.DivShow,
        ImgShow: _self.IsNull(setting.ImgShow) ? _self.DefautlSetting.ImgShow : setting.ImgShow,
        Width: _self.IsNull(setting.Width) ? _self.DefautlSetting.Width : setting.Width,
        Height: _self.IsNull(setting.Height) ? _self.DefautlSetting.Height : setting.Height,
        ImgType: _self.IsNull(setting.ImgType) ? _self.DefautlSetting.ImgType : setting.ImgType,
        ErrMsg: _self.IsNull(setting.ErrMsg) ? _self.DefautlSetting.ErrMsg : setting.ErrMsg,
        callback: _self.IsNull(setting.callback) ? _self.DefautlSetting.callback : setting.callback
    };
    /*
    *work:获取文本控件URL
    */
    _self.getObjectURL = function(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    /*
    *work:绑定事件
    */
    _self.Bind = function() {
        document.getElementById(_self.Setting.UpBtn).onchange = function(e) {
            var filemaxsize = 1024 * 2;//2M
            var target = jQuery(e.target);
            var Size = target[0].files[0].size / 1024;

            if(Size > filemaxsize) {
                jQuery.msgBox.Alert(null, '图片大于2M，请重新选择!');
                this.value = "";
                return false;
            }
            if(!this.files[0].type.match(/image.*/)) {
                jQuery.msgBox.Alert(null, '请选择正确的图片!');
                this.value = "";
                return false;
            }

            if (this.value) {
                if (!RegExp("\.(" + _self.Setting.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert(_self.Setting.ErrMsg);
                    this.value = "";
                    return false;
                }
                if (navigator.userAgent.indexOf("MSIE") > -1) {
                    try {
                        document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                    } catch (e) {
                        var div = document.getElementById(_self.Setting.DivShow);
                        this.select();
                        top.parent.document.body.focus();
                        var src = document.selection.createRange().text;
                        document.selection.empty();
                        document.getElementById(_self.Setting.ImgShow).style.display = "none";
                        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        div.style.width = _self.Setting.Width + "px";
                        div.style.height = _self.Setting.Height + "px";
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                }
                _self.Setting.callback();
            }
        }
    }
    /*
    *work:执行绑定事件
    */
    _self.Bind();
}