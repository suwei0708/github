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
            }
            else {
                // 取消选中
                jQuery(this).find('input[type=checkbox]').prop('checked', true);
                jQuery(this).find('span').addClass('ico-radio-cur');
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
        var $imgData2 = $(image).cropper('getData');

        $('#w').val($imgData2.width);
        $('#h').val($imgData2.height);
        $('#x').val($imgData2.x);
        $('#y').val($imgData2.y);

        dataurl = $imgData.toDataURL('image/png');
        $('.data-img .img img, .user-infos img').attr('src', dataurl);
        $('.user-editbox').hide();
        maskHide();
        avatarform.submit();
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

			$('input[name="resideprovince"]').val( $('.sw-select1').find('.cur').text());
			$('input[name="residecity"]').val( $('.sw-select2').find('.cur').text());

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
        // var random = parseInt(Math.random() * 2);
        // if(random) {
        //     // 保存失败
        //     tipSave('fail', '保存失败!');
        // }
        // else {
        //     // 保存成功
        //     tipSave('suc', '保存成功，<span class="tip-num">2</span>秒后自动关闭');
        // }
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
    $('.user-msg-list').on('click', '.btn-replay', function() {
        var replayForm = $(this).parent('.time').nextAll('.reply-form');
        if(replayForm.is(':visible')) {
            $('.user-msg-list .reply-form').hide();
        }
        else {
            $('.user-msg-list .reply-form').hide();
            replayForm.show();
        }
    });
    // 点击取消
    $('.user-msg').on('click', '.btn-cancel', function() {
        var replayForm = $(this).parents('.reply-form');
        replayForm.hide();
    });

    // 回复内容
    $('.user-msg-list').on('click', '.btn-sure', function() {
        // 判断文本内容非空
        if(!$.trim($(this).parents('.reply-form').find('.text').val())) {
            $.msgBox.Alert(null, '回复内容不能为空');
            return false;
        }
        // 判断回复盒子是否存在，不存在创造追加
        if(!$(this).parents('li').find('.reply-box').length) {
            $(this).parents('li').append('<div class="reply-box"></div>');
        }

     /*   var msgHtml = '<div class="com-box">'
                        +    '<span class="arrow"></span>'
                        +    '<a href="#" class="fll avatar">'
                        +        '<img src="../images/avatar.gif" height="30" width="30">'
                        +    '</a>'
                        +    '<div class="info"><strong><a href="#">木白的白目</a></strong>  回复 <strong><a href="#">样佛爷</a></strong>：' + $(this).parents('.reply-form').find('.text').val() + '</div>'
                        +    '<div class="time">' + '刚刚' + '<a href="javascript:;" class="blue btn-replay">回复</a></div>'
                        +    '<div class="reply-form">'
                        +        '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
                        +        '<div class="btn-box">'
                        +            '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
                        +            '<div class="fr">'
                        +                '<a href="javascript:;" class="btn btn-cancel">取消</a>'
                        +                '<a href="javascript:;" class="btn btn-sure">回复</a>'
                        +            '</div>'
                        +        '</div>'
                        +    '</div>'
                        +'</div>';
        $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);*/
        $(this).parents('.reply-form').find('.text').val('');
    });
    if($(".user-msgct-ct").length){
	   $('.user-right').find('.user-msgct-ct').scrollTop(999999);
    }
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

    /* 回复详情个人资料 */
    $('.user-msgct').on('click', '.icon-info', function() {
        var uList = $(this).parent('.uinfo').find('.uinfo-list');
        if(uList.is(':visible')) {
            uList.hide();
        }
        else {
            uList.show();
        }
        return false;
    });
    $('.uinfo-list').on('click', '.u-ico', function() {
        if($(this).hasClass('u-ygz')) {
            $(this).hide();
            $('.u-wgz').show();
        }
        else {
            $(this).hide();
            $('.u-ygz').show();
        }
    });

    if($('.user-msgct').length) {
        $('.user-msgct-ct').scrollUnique();
    };

    $('.user-msgct').on('click', '.btn-sure', function() {
        if(!$.trim($('.user-msgct').find('.text').val())) {
            $.msgBox.Alert(null, '回复内容不能为空');
            return false;
        }

       /* var msgHtml = '<div class="umsg umsg-r">'
                    +    '<span class="img"><img src="../images/system.png" height="54" width="54"></span>'
                    +    '<div class="umsg-ct">' + $('.user-msgct').find('.text').val() + '<span class="arrow"></span></div>'
                    +    '<span class="time">' + '刚刚' + '</span>'
                    +'</div>';*/
        $('.user-msgct-ct').append(msgHtml).scrollTop(999999);
        $('.user-msgct').find('.text').val('');
        pmform.submit();
    });

    // 点击关注
    $('.designer').on('click', '.btn', function() {
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
        $("#myfavid").val(_this.parents("li").attr("myid"));
        manageDom = _this.parents('.manage').nextAll('a');
        if(_this.index() == 0) {
            // 重命名
            centerObj('.popup-rename .popup');
            $('.popup-rename').show().find('.txt').val(manageDom.text());
            monitorVal('.popup-rename .txt', 15);
        }
        else if(_this.index() == 1) {
            // 是否公开
            if(_this.find('span').hasClass('icon-lock-on')) {
                manageDom.find('.icon-lock-off').remove();
                _this.find('a').html('<span class="icon-lock-off"></span>仅自己可见');
            }
            else {
                manageDom.prepend('<span class="icon-lock-off"></span>');
                _this.find('a').html('<span class="icon-lock-on"></span>公开');
            }
        }
        else if(_this.index() == 2) {
            // 删除
            $.msgBox.Confirm('删除收藏夹', '确定要删除该收藏夹所有作品吗？', function() {
                var id = $("#myfavid").val();
                $.post("/plugin.php?id=zsj_search:fav_classname&act=d", {fid: id}, function () {
                });
                _this.parents('li').remove();
            })
        }
        $(this).parent('.manage-list').hide();
    });

    // 我的收藏详情 删除
    $('#collect-list').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm('删除作品', '确定要删除该收藏作品吗？', function() {
            var id = _this.parents("li").attr("myid");
            var classid= _this.parents("li").attr("myclassid");
            $.post("/plugin.php?id=zsj_search:fav_classname&act=dd", {ffid: id,classid:classid}, function () {
            });
            _this.parents('li').remove();
        });
    });

    // 保存重命名
    $('.popup-rename').on('click', '.btn', function() {
        manageDom.find('strong').text($('.popup-rename').find('.txt').val());
        var id = $("#myfavid").val();
        if($('.popup-rename').find('.txt').val()!="")
        {
            $.post("/plugin.php?id=zsj_search:fav_classname&act=edit&key="+$('.popup-rename').find('.txt').val(), {fid: id}, function () {

            });
        }
        $(this).parents('.popup').find('.popup-close').click();
    });

    // 添加到收藏夹选项
    if($('#popup-collect-list').length) {
        checkboxSelect('#popup-collect-list');
    }

    // 展示收藏夹弹窗
    if($('.user-tit .btn-manage').length) {
        $('.user-tit').on('click', '.btn-collect', function() {
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
        $.msgBox.Confirm('删除作品', '确定要删除该作品吗？', function() {
            var id = $(this).parents('li').attr("myid");
            $.post("/plugin.php?id=zsj_search:fav_classname&act=d", {fid: id}, function () {
            });
            $(this).parents('li').remove();
        })
    })
    .on('click', '.btn-save', function() { // 管理收藏 夹保存
        var id=$(this).parents('li').attr("myid")
        var key=$(this).parents('li').removeClass('cur').find('.input').val();
        if(key!=""){
            $.post("/plugin.php?id=zsj_search:fav_classname&act=edit&key="+key,{fid:id},function(){

            });
            $(this).parents('li').removeClass('cur').find('.input').attr('disabled', 'disabled');
        }
    })
    .on('click', '.btn-cancel', function() { // 管理收藏夹 取消
        $(this).parents('li').removeClass('cur');
        $(this).parents('li').find('.input').val(manageVal);
    })
    .on('click', '.txt-box .btn', function() { // 管理收藏夹 添加收藏夹
        var val = $.trim($(this).prevAll('.txt').val());
        if(!!val) {
            $.get("/plugin.php?id=zsj_search:fav_classname&act=add&favdefult=1&favkey="+val,function(data) {
                var html = '<li myid="'+data+'">'
                    + '<div class="fr btn-box btn-box1"><a href="javascript:;" class="btn-edit">1</a><a href="javascript:;" class="btn-del">3</a></div>'
                    + '<div class="fr btn-box btn-box2"><a href="javascript:;" class="btn-save">2</a><a href="javascript:;" class="btn-cancel">4</a></div>'
                    + '<input type="text" value="' + val + '" class="input" disabled>'
                    + '<span class="num-box"><span class="num"></span>/0</span>'
                    + '</li>';
                $('#popup-manage-list li:eq(0)').after(html);
            });
        }
        else {
            $.msgBox.Alert(null, '收藏夹名称不能为空！');
        }
    })
    .on('click', '.popup-btn-box .btn', function() { // 管理收藏夹 保存
        $(this).parents('.popup-manage').hide();
        maskHide();
    });

    // $('.popup-collect').on('click', '.txt-box .btn', function() { // 管理收藏夹 添加收藏夹
    //     var val = $.trim($(this).prevAll('.txt').val());
    //     if(!!val) {
    //         var html = '<li>'
    //                         + '<span class="fr num">0</span>'
    //                         + '<label><input type="checkbox" name="collect" value="' + val + '">' + val + '</label>'
    //                     + '</li>';
    //         $('#popup-collect-list li:eq(0)').after(html);
    //         checkboxSelect('#popup-collect-list');
    //     }
    //     else {
    //         $.msgBox.Alert(null, '收藏夹名称不能为空！');
    //     }
    // })
    // .on('click', '.popup-btn-box .btn', function() { // 添加收藏夹 保存
    //     $(this).parents('.popup-collect').hide();
    //     maskHide();
    // });

    // 删除作品
    $('#my-works').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm('删除作品', '确定要删除该作品吗？', function() {
            _this.parents('li').remove();
        });
    });

    // 删除草稿
    $('.btn-drafts-del').on('click', function() {
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

    // 留言评论字数限制
    if($('.homepage-box .num-box').length) {
        monitorVal('.ct-comment-box .textarea', 500);
    }
    // 提交留言
    $('.ct-comment-box').on('click', '.btn-comment', function() {
        var _this = $(this).parents('.ct-comment-box');
        if(!$.trim(_this.find('.textarea').val())) {
            $.msgBox.Alert(null, '评论不能为空！');
            return false;
        }

        // console.log(X, Y);
        // // 追加到全部留言
        // var dom = '<li>'
        //             + '<div class="com-box">'
        //                 + '<div class="fr btn-box">'
        //                     + '<a href="javascript:;" class="btn-praise"><span class="icon-praise2"></span>赞(<span class="num">52</span>)</a>'
        //                     + '<a href="javascript:;" class="btn-replay">回复</a>'
        //                 + '</div>'
        //                 + '<a href="#" class="fll avatar">'
        //                     + '<img src="../images/man.jpg" height="54" width="54">'
        //                 + '</a>'
        //                 + '<div class="tt"><a href="#" class="blue">痞先森</a> <span class="time">3小时前</span></div>'
        //                 + '<div class="info">' + $.trim(_this.find('.textarea').val()) + '</div>'
        //                 + '<div class="reply-form">'
        //                     + '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
        //                     + '<div class="btn-box">'
        //                         + '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
        //                         + '<div class="fr">'
        //                             + '<a href="javascript:;" class="btn btn-cancel">取消</a>'
        //                             + '<a href="javascript:;" class="btn btn-sure">回复</a>'
        //                         + '</div>'
        //                     + '</div>'
        //                 + '</div>'
        //             + '</div>'
        //         + '</li>';
        //
        // $('#all-comment').prepend(dom);
        // _this.find('.textarea').val('');
        // $('body, html').animate({scrollTop: $('#all-comment').offset().top},100);
    });

    // 点击回复留言
    $('.ct-comment').on('click', '.btn-replay', function() {
        var replayForm = $(this).parent().nextAll('.reply-form');
        if(replayForm.is(':visible')) {
           $('.ct-comment .reply-form').hide();
        }
        else {
            $('.ct-comment .reply-form').hide();
            replayForm.show();
        }
    });

    // 点击取消
    $('.ct-comment').on('click', '.btn-cancel', function() {
        var replayForm = $(this).parents('.reply-form');
        replayForm.hide();
    });

    // 回复留言
    $('.ct-comment').on('click', '.btn-sure', function() {
        // 判断文本内容非空
        if(!$.trim($(this).parents('.reply-form').find('.text').val())) {
            $.msgBox.Alert(null, '回复内容不能为空');
            return false;
        }
        // 判断回复盒子是否存在，不存在创造追加
        if(!$(this).parents('li').find('.reply-box').length) {
            $(this).parents('li').append('<div class="reply-box"></div>');
        }

        // var msgHtml = '<div class="com-box">'
        //                 +    '<span class="arrow"></span>'
        //                 +    '<a href="#" class="fll avatar">'
        //                 +        '<img src="../images/man.jpg" height="30" width="30">'
        //                 +    '</a>'
        //                 +    '<div class="info"><strong><a href="#">木白的白目</a></strong>  回复 <strong><a href="#">样佛爷</a></strong>：' + $(this).parents('.reply-form').find('.text').val() + '</div>'
        //                 +    '<div class="time">' + '刚刚' + '<a href="javascript:;" class="blue btn-replay">回复</a></div>'
        //                 +    '<div class="reply-form">'
        //                 +        '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
        //                 +        '<div class="btn-box">'
        //                 +            '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
        //                 +            '<div class="fr">'
        //                 +                '<a href="javascript:;" class="btn btn-cancel">取消</a>'
        //                 +                '<a href="javascript:;" class="btn btn-sure">回复</a>'
        //                 +            '</div>'
        //                 +        '</div>'
        //                 +    '</div>'
        //                 +'</div>';
        // $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);
        // $(this).parents('.reply-form').find('.text').val('');
    });

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

    $(".user").on("click",".work-del",function(){
        $('#deltid').val($(this).attr("myid"));
        var __this=$(this);
        $.msgBox.Confirm('删除作品', '确定要删除该作品吗？', function () {
            delForum();
            __this.parents("li").remove();
        });
    });

    //**  修改账号和密码  **//

    // 验证邮箱
    $('.user-bind').on('click', '.test-email', function() {

    	//ajax绑定email
    	var _this2 = $(this);
		var formhash = $('#formhash').val();
    	var url = 'plugin.php?id=zsj_one:ajaxmobile&formhash=' + formhash + '&type=12' ;
		$.ajax({
		url: url,
		type: "POST",
		//dataType: "json",
		error: function() {
			alert('Error loading XML document');
		},
		success: function(data, status) {
			if(data=='1001'){
			 setTimeout(function() {
		            tipSave('suc', '验证码已发您邮箱，没有收到请2分钟后重试');
		        }, 3000);
			}else{
				tipSave('fail', '你还没绑定邮箱');
			}
		}
		});

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

        	//ajax绑定email
        	var email = input.val();
        	var _this2 = $(this);
			var formhash = $('#formhash').val();
        	var url = 'plugin.php?id=zsj_one:ajaxmobile&formhash=' + formhash + '&email=' + email + '&type=9' ;
			$.ajax({
			url: url,
			type: "POST",
			//dataType: "json",
			error: function() {
				alert('Error loading XML document');
			},
			success: function(data, status) {
				if(data=='1001'){
					tipSave('fail', '该邮箱已经被其他账号绑定');
				}else{
					tipSave('suc', '绑定成功，快去验证邮箱吧');
					_this2.nextAll('.tips').hide();
		            var dom = '<div class="name">' + $.trim(input.val()) + '<span class="tips tips-err"><span class="icon-gt"></span>邮箱未认证，<a href="javascript:;" class="blue test-email">点此验证邮箱</a></span></div>'
		            _this2.parents('dd').html(dom);
				}
			}
			});


        }
    });

    // 绑定手机
    $('.user-bind').on('click', '.btn-bind-phone', function() {
        var input = $(this).prevAll('.txt');
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
        //$('.user-bindother').find('.item:eq(0)').find('.name').html('QQ昵称');
        //$('.user-bindother').find('.item:eq(0)').find('.btn-bind').attr('class', 'btn-unbind btn-unbind-qq').html('解绑');
        //tipSave('suc', '绑定成功');
        location.href='connect.php?mod=login&op=init&type=loginbind&referer=forum.php';
    });

    // 绑定微信
    $('.user-bindother').on('click', '.btn-bind-wx', function() {
    	var formhash = $('#formhash').val();
    	location.href='plugin.php?id=zsj_one:wechat&formhash='+formhash;
//        $('.popup-bindwx').show();
//        centerObj('.popup-bindwx .popup');
//
//        // 模拟微信绑定成功
//        setTimeout(function() {
//            $('.popup-box').hide();
//            $('.user-bindother').find('.item:eq(1)').find('.name').html('微信昵称');
//            $('.user-bindother').find('.item:eq(1)').find('.btn-bind').attr('class', 'btn-unbind btn-unbind-wx').html('解绑');
//            tipSave('suc', '绑定成功');
//        }, 3000);
    });

    // 解绑邮箱
    $('.user-bind').on('click', '.btn-unbind-email', function() {
        $.msgBox.Confirm(null, '解绑后，无法使用邮箱账号继续登录<br>确定解除绑定吗？', function() {
        	//ajax邮箱解绑
			var formhash = $('#formhash').val();
        	var url = 'plugin.php?id=zsj_one:ajaxmobile&formhash=' + formhash + '&type=10' ;
			$.ajax({
			url: url,
			type: "POST",
			//dataType: "json",
			error: function() {
				alert('Error loading XML document');
			},
			success: function(data, status) {
				if(data=='2001'){
					tipSave('fail', '最后绑定账号不支持解绑');
				}else{
					tipSave('suc', '解绑成功');
		            var dom = '<input type="text" class="txt" value="" placeholder="请输入您的邮箱"> <button type="button" class="btn-bind btn-bind-email">绑定</button>';
		            $('.user-bind').find('.item:eq(0) dd').html(dom);
				}
			}
			});


        });
    });
    // 解绑手机号
    $('.user-bind').on('click', '.btn-unbind-phone', function() {
        $.msgBox.Confirm(null, '解绑后，无法使用手机号继续登录<br>确定解除绑定吗？', function() {
        	//ajax手机解绑
			var formhash = $('#formhash').val();
        	var url = 'plugin.php?id=zsj_one:ajaxmobile&formhash=' + formhash + '&type=11' ;
			$.ajax({
			url: url,
			type: "POST",
			//dataType: "json",
			error: function() {
				alert('Error loading XML document');
			},
			success: function(data, status) {
				if(data=='2001'){
					tipSave('fail', '最后绑定账号不支持解绑');
				}else{
				 tipSave('suc', '解绑成功');
		         var dom = '<div class="phone">+86 <span class="icon-arrowb"></span></div> <input type="text" class="txt txt-phone" value="" placeholder="请输入您手机号"> <button type="button" class="btn-bind btn-bind-phone">绑定</button>';
		         $('.user-bind').find('.item:eq(1) dd').html(dom);
				}
			}
			});


        });
    });
    // 解绑qq
    $('.user-bindother').on('click', '.btn-unbind-qq', function() {
      /*  $.msgBox.Confirm(null, '解绑后，无法使用QQ继续登录<br>确定解除绑定吗？', function() {
            tipSave('suc', '解绑成功');
            var dom = '<div class="name">未绑定</div> <button type="button" class="btn-bind btn-bind-qq">绑定</button>';
            $('.user-bindother').find('.item:eq(0) dd').html(dom);
        });*/
    });
    // 解绑微信
    $('.user-bindother').on('click', '.btn-unbind-wx', function() {
    	var formhash = $('#formhash').val();
    	location.href='plugin.php?id=zsj_one:wechat&op=unbind&formhash='+formhash;

        /*$.msgBox.Confirm(null, '解绑后，无法使用微信继续登录<br>确定解除绑定吗？', function() {
            tipSave('suc', '解绑成功');
            var dom = '<div class="name">未绑定</div> <button type="button" class="btn-bind btn-bind-wx">绑定</button>';
            $('.user-bindother').find('.item:eq(1) dd').html(dom);
        });*/
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

            console.log(Size);
            if(Size > filemaxsize) {
                jQuery.msgBox.Alert(null, '图片大于2M，请重新选择!');
                return false;
            }
            if(!this.files[0].type.match(/image.*/)) {
                jQuery.msgBox.Alert(null, '请选择正确的图片!');
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