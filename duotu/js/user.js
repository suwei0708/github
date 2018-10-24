(function($) {
$(function() {
    // 个人中心导航
    $('.user-nav').on('click', '.point', function() {
        if(!$(this).parents('.item').hasClass('cur')) {
            $(this).parents('.item').addClass('cur').siblings('.item').removeClass('cur');
        }
        else {
            $(this).parents('.item').removeClass('cur');
        }
    });

    // 个人资料下拉
    if($('.user-select').length) {
        $('.user-select').on('click', '.input', function() {
            $('.user-select-list').hide();
            $(this).parents('.user-select').find('.user-select-list').show();
        });
        $('body').on('click', function() {
            $('.user-select-list').hide();
        });
        $('.user-select').on('click', function(e) {
            e.stopPropagation();
        });
        $('.user-select-list').on('click', 'li', function() {
            $(this).parents('.user-select').find('.input').val($(this).text());
            $(this).parents('.user-select-list').hide();
        });
    };

    // 修改资料提交表单
    var inputNum = 0;
    $('.user-data').on('click', '.btn-save', function() {
        var dom = $(this).parents('.user-data').find('.input');
        inputNum = 0;
        $.each(dom, function(i) {
            if(!$.trim($(this).val())) {
                if($(this).attr('placeholder') == '请选择' || $(this).attr('placeholder') == '年' || $(this).attr('placeholder') == '月' || $(this).attr('placeholder') == '日' || $(this).attr('placeholder') == undefined) {
                    alertMsg(null, $(this).parents('.item').find('dt').text() + '不能为空！');
                }
                else {
                    alertMsg(null, $(this).attr('placeholder') + '不能为空！');
                }
                return false;
            }
            inputNum++;
        });

        // 提交执行事件
        if(inputNum == dom.length) {
            alertMsg(null, '保存成功');
            dom.val('');
            return false; // 阻止form默认提交，使用ajax提交需要
        }
        else {
            return false;
        }
    });

    // 修改头像
    if($('.user-editbox').length) {
        // 初始化裁剪工具
        var image = document.getElementById('image');
        $(image).on('load', function() {
            $(image).cropper({
                aspectRatio: 220 / 220,
                viewMode : 2,//显示
                dragMode : "move",
                preview: '.img-preview'
            });
        });

        // 裁剪头像
        $('#avatarInput').on('change', function(e) {
            var filemaxsize = 1024 * 5;//5M
            var target = $(e.target);
            var Size = target[0].files[0].size / 1024;
            if(Size > filemaxsize) {
                alert('图片大于5M，请重新选择!');
                return false;
            }
            if(!this.files[0].type.match(/image.*/)) {
                alert('请选择正确的图片!');
            } else {
                var file = target[0].files[0];
                var src = window.URL.createObjectURL(file);
                $('.user-editbox .img').html('<img id="image" src="' + src + '" width="335" height="335"/>');
                var image = document.getElementById('image');
                $(image).on('load', function() {
                    $(image).cropper({
                        aspectRatio: 220 / 220,
                        viewMode : 2,//显示
                        dragMode : "move",
                        preview: '.img-preview'
                    });
                });
            }
        });

        // 保存头像
        $('.user-editbox').on('click', '.btn', function() {
            var $image = $('user-editbox img');
            var img_lg = document.getElementById('avatar-img');

            var image = document.getElementById('image');
            var $imgData = $(image).cropper('getCroppedCanvas', {
                width: 220,
                height: 220
            });
            var dataUrl = $imgData.toDataURL('image/png');

            console.log(dataUrl);
            alertMsg(null, '保存成功');
        });
    }

    // 修改密码保存
    $('.user-password').on('click', '.btn-save', function() {
        var oldpassword = $('.user-password').find('.input:eq(0)');
        var newpassword = $('.user-password').find('.input:eq(1)');
        var renewpassword = $('.user-password').find('.input:eq(2)');

        var dom = $(this).parents('.user-password').find('.input');
        inputNum = 0;
        $.each(dom, function(i) {
            if(!$.trim($(this).val())) {
                if($(this).attr('placeholder') == '请选择' || $(this).attr('placeholder') == undefined) {
                    alertMsg(null, $(this).parents('.item').find('dt').text() + '不能为空！');
                }
                else {
                    alertMsg(null, $(this).attr('placeholder') + '不能为空！');
                }
                return false;
            }
            else if ($(this).parents('.item').find('dt').html() == '确认新密码' && newpassword.val() != renewpassword.val()) {
                alertMsg(null, '两次密码不一致！');
                return false;
            }
            inputNum++;
        });

        // 提交执行事件
        if(inputNum == dom.length) {
            alertMsg(null, '保存成功');
            dom.val('');
            return false; // 阻止form默认提交，使用ajax提交需要
        }
        else {
            return false;
        }
    });

    // 移币提交表单
    $('.user-yibi').on('click', '.btn-save', function() {
        var dom = $(this).parents('.user-yibi').find('.input');
        inputNum = 0;
        $.each(dom, function(i) {
            if(!$.trim($(this).val())) {
                if($(this).attr('placeholder') == '请选择' || $(this).attr('placeholder') == undefined) {
                    alertMsg(null, $(this).parents('.item').find('dt').text() + '不能为空！');
                }
                else {
                    alertMsg(null, $(this).attr('placeholder') + '不能为空！');
                }
                return false;
            }
            inputNum++;
        });

        // 提交执行事件
        if(inputNum == dom.length) {
            alertMsg(null, '保存成功');
            dom.val('');
            return false; // 阻止form默认提交，使用ajax提交需要
        }
        else {
            return false;
        }
    });

    // 共享币提交表单
    $('.user-gongxiangbi').on('click', '.btn-save', function() {
        var dom = $(this).parents('.user-gongxiangbi').find('.input');
        inputNum = 0;
        $.each(dom, function(i) {
            if(!$.trim($(this).val())) {
                if($(this).attr('placeholder') == '请选择' || $(this).attr('placeholder') == undefined) {
                    alertMsg(null, $(this).parents('.item').find('dt').text() + '不能为空！');
                }
                else {
                    alertMsg(null, $(this).attr('placeholder') + '不能为空！');
                }
                return false;
            }
            inputNum++;
        });

        // 提交执行事件
        if(inputNum == dom.length) {
            alertMsg(null, '保存成功');
            dom.val('');
            return false; // 阻止form默认提交，使用ajax提交需要
        }
        else {
            return false;
        }
    });

    // 上传身份证
    if($('#choosefile1').length) {
       new uploadPreview({ UpBtn: "choosefile1", DivShow: "previews1", ImgShow: "imghead1" });
    }
    if($('#choosefile2').length) {
       new uploadPreview({ UpBtn: "choosefile2", DivShow: "previews2", ImgShow: "imghead2" });
    }

    // 启用时间插件
    if($('.timepicker').length) {
        timepicker();
    };

    // 开通月会员充值切换
    $('.recharge-times').on('click', '.paymf', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

});
})(jQuery);

function timepicker() {
    jQuery.datetimepicker.setLocale('ch');
    jQuery('.timepicker').datetimepicker({
        // lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
        format:"Y-m-d",      //格式化日期
        timepicker: false,    //关闭时间选项
        todayButton: false    //关闭选择今天按钮
    });
}