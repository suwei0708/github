(function($) {
$(function() {
    // 招聘首页公众号和QQ求职推荐 切换
    $('.job-ecode .tit').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.job-ecode').find('.ct').hide().eq($(this).index()).show();
    });

    // 切换城市弹窗
    $('.city-switch').on('click', function() {
        $('.popup-changecity').show();
        centerObj('.popup-changecity .popup');
    });

    $('.popup-changecity .popup-ct').on('click', 'a', function() {
        $('.popup-changecity').hide();
        $('.job-nav .city').html($(this).html());
    });

    // 搜索城市切换
    $('.city-list').on('click', 'li', function() {
        var _this = $(this);
        _this.parents('.city-list').hide();
        setTimeout(function() {
            _this.parents('.city-list').removeAttr('style')
        }, 100)
        $('.so-select .city').html(_this.html());
    });

    $('.job-sobox').on('focus', '.text', function() {
        $(this).parents('.job-sobox').addClass('cur');
    })
    .on('blur', '.text', function() {
        $(this).parents('.job-sobox').removeClass('cur');
    });

    // 职位详情收藏
    $('.job-main .btn-box').on('click', '.btn-sc', function() {
        if(!$(this).hasClass('dis')) {
            // 收藏
            $(this).addClass('dis');
            $.msgBox.Alert(null, '收藏成功！');
        }
        else {
            // 取消收藏
            $(this).removeClass('dis');
            $.msgBox.Alert(null, '取消收藏成功！');
        }

    });
    // 职位详情投简历
    $('.job-main .btn-box').on('click', '.btn-tjl', function() {
        if(!$(this).hasClass('dis')) {
            // 投简历
            $(this).addClass('dis').html('已投简历');
            $.msgBox.Alert(null, '投递成功！');
        }
    });

    // 搜索条件全部
    $('.so-list').on('click', '.all', function() {
        if($(this).find('span').hasClass('ijob-h')) {
            $(this).find('span').removeClass('ijob-h');
            $(this).parents('li').find('p').height(30);
        }
        else {
            $(this).find('span').addClass('ijob-h');
            $(this).parents('li').find('p').height('auto');
        }
    });

    // 个人作品同步
    $('.my-tit').on('click', '.btn', function() {
        $(this).addClass('cur').siblings('a').removeClass('cur');
        $(this).parents('.my-works').find('.zsj-box').hide().eq($(this).index()).show();
    });
    // 个人作品使用上传作品
    $('.my-tit').on('click', '.btn-sc', function() {
        $(this).addClass('cur');
    });

    // 创建简历监听字数
    if($('.info-box .num-box').length) {
        $.each($('.info-box .num-box'), function(i) {
            monitorVal($(this).prevAll('.txt'), $(this).find('.num-len').text());
        });
    }

    // 创建简历性别
    if($('#sex').length) {
        radioSelect('#sex');
        $('#sex').on('change', function() {
            radioSelect('#sex');
        });
    };

    // 创建简历下拉
    $('.item-select').on('click', function() {
        $('.select-list').hide();
        $('.item-select').css('z-index', 'auto');
        $(this).css('z-index', '999');
        $(this).find('.select-list').show();
    });
    $('.select-list').on('click', 'li', function() {
        var txtDom = $(this).parents('.item-select').find('.txt');
        if(txtDom.is('input')) {
            txtDom.val($(this).text());
        }
        else {
            txtDom.html($(this).text());
        }

        $(this).parents('.select-list').hide();
        $('.item-select').css('z-index', 'auto');
        return false;
    });

    // 裁剪头像
    $('#avatarInput').on('change', function(e) {
        var filemaxsize = 1024 * 10;//10M
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
            $('.user-editbox').show();
            maskShow();
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
        console.log(1)
        $('#avatarInput').trigger('click');
    });

    // 保存头像
    $('.user-editbox').on('click', '.btn', function() {
        // var image = document.getElementById('image');
        var $imgData = $(image).cropper('getCroppedCanvas', {
            width: 200,
            height: 200
        });
        dataurl = $imgData.toDataURL('image/png');

        if($('.data-img .img img').length) {
            $('.data-img .img img').attr('src', dataurl);
        }
        else {
            $('.data-img .img').prepend('<img height="100" width="100" src="' + dataurl + '">');
        }

        $('.user-editbox').hide();
        maskHide();
    });

    // 启用时间插件
    if($('.timepicker').length) {
        timepicker();
    };

    // 增加工作经历
    $('#workExperience').on('click', 'a', function() {
        var html = `<div class="info-experience-ct mt50">
                        <div class="item">
                            <input type="text" class="txt" placeholder="公司名称" validate = '[{"type":"notNull","msg":"公司名称不能为空"}]'>
                        </div>
                        <div class="item">
                            <input type="text" class="txt" placeholder="你的职位" validate = '[{"type":"notNull","msg":"你的职位不能为空"}]'>
                        </div>
                        <div class="item">
                            <div class="item-half"><input type="text" class="txt txt-half readonly timepicker" placeholder="入职时间" validate = '[{"type":"notNull","msg":"入职时间不能为空"}]'><span class="icon-arrowb"></span></div>
                            <div class="item-half ml20"><input type="text" class="txt txt-half readonly timepicker" placeholder="离职时间" validate = '[{"type":"notNull","msg":"离职时间不能为空"}]'><span class="icon-arrowb"></span></div>
                        </div>
                        <div class="item">
                            <textarea type="text" class="txt text" placeholder="你的工作内容例如：1 负责天猫、京东等销售平台详情页，专题页，首页设计；2把握设计趋势，分享设计经验，推动团队设计水平" validate = '[{"type":"notNull","msg":"工作内容不能为空"}]'></textarea>
                            <span class="num-box"><span class="num">0</span>/<span class="num-len">100</span></span>
                        </div>
                        <div class="link-del"><a href="javascript:;">删除</a></div>
                    </div>`;
        var box = $('#workExperience').parents('.info-experience');
        var len = box.find('.info-experience-ct').length;
        if(len < 10){
            box.find('.info-experience-ct').last().after(html);
            $('#form').validate();
            timepicker();
            if($('.info-box .num-box').length) {
                $.each($('.info-box .num-box'), function(i) {
                    monitorVal($(this).prevAll('.txt'), $(this).find('.num-len').text());
                });
            }
        }
        else{
            $.msgBox.Alert(null, '最多添加10个工作经历');
        }
    });

    // 增加教育经历
    $('#eduExperience').on('click', 'a', function() {
        var html = `<div class="info-experience-ct mt50">
                        <div class="item">
                            <input type="text" class="txt" placeholder="例如：北京大学" validate = '[{"type":"notNull","msg":"公司名称不能为空"}]'>
                        </div>
                        <div class="item">
                            <input type="text" class="txt" placeholder="例如：视觉传达" validate = '[{"type":"notNull","msg":"公司名称不能为空"}]'>
                        </div>
                        <div class="item item-select">
                            <input type="text" class="txt readonly" placeholder="选择学历" readonly><span class="icon-arrowb" validate = '[{"type":"notNull","msg":"公司名称不能为空"}]'></span>
                            <ul class="select-list">
                                <li>大专</li>
                                <li>本科</li>
                                <li>硕士</li>
                                <li>博士</li>
                                <li>其他</li>
                            </ul>
                        </div>
                        <div class="item">
                            <div class="item-half"><input type="text" class="txt txt-half readonly timepicker" placeholder="入学年月" validate = '[{"type":"notNull","msg":"公司名称不能为空"}]'><span class="icon-arrowb"></span></div>
                            <div class="item-half ml20"><input type="text" class="txt txt-half readonly timepicker" placeholder="毕业年月" validate = '[{"type":"notNull","msg":"公司名称不能为空"}]'><span class="icon-arrowb"></span></div>
                        </div>
                        <div class="link-del"><a href="javascript:;">删除</a></div>
                    </div>`;
        var box = $('#eduExperience').parents('.info-experience');
        var len = box.find('.info-experience-ct').length;
        if(len < 10){
            box.find('.info-experience-ct').last().after(html);
            $('#form').validate();
            timepicker();
            if($('.info-box .num-box').length) {
                $.each($('.info-box .num-box'), function(i) {
                    monitorVal($(this).prevAll('.txt'), $(this).find('.num-len').text());
                });
            }
        }
        else{
            $.msgBox.Alert(null, '最多添加10个教育经历');
        }
    });

    // 删除工作/教育经历
    $('.info-experience').on('click', '.link-del a', function() {
        var _this = $(this);
        $.msgBox.Confirm('提示', '确定要删除吗', function() {
            _this.parents('.info-experience-ct').remove();
        });
    });

    // 监听字数
    if($('.cpinfo-ct .num-box').length) {
        $.each($('.cpinfo-ct .num-box'), function(i) {
            monitorVal($(this).prevAll('.txt'), $(this).find('.num-len').text());
        });
    };

    // 查看示例
    $('.info-experience-see').on('click', 'a', function() {
        var dom = $(this).parents('.info-experience-see');
        if(dom.outerHeight() == 40) {
            dom.animate({
                'height': 192
            });
        }
        else {
            dom.animate({
                'height': 30
            });
        }
    });
    $('.info-experience').find('.txt').on('focus', function () {
        $('.info-experience-see').animate({
            'height': 30
        });
    });

    // 发送验证码
    $('.cpinfo-ct').on('click', '.sendcode', function() {
        var _this = $(this).parents('.yzm');
        var i = 59;
        _this.html('<span class="times">' + i + '</span>s重新发送');
        var codeTimer = setInterval(function() {
            i--;
            _this.find('.times').html(i);
            if(i == 0) {
                clearInterval(codeTimer);
                _this.html('<a href="javascript:;" class="sendcode">发送验证码</a>')
            }
        }, 1000);
    });

    // 全选和取消全选
    $('.checkall').on('click', function() {
        if(!$(this).is(':checked')){
            $('.resume-list').find('input[type=checkbox]').prop({
                checked: false
            })
        }
        else {
            $('.resume-list').find('input[type=checkbox]').prop({
                checked: true
            })
        }
    });

    // input聚焦判断
    $('.item').find('.txt').focus(function() {
        if($(this).parents('.item').find('.tip').length) {
            $(this).parents('.item').find('.tip').hide();
        }
    });
    // 标签页聚焦
    $('.item').on('focus', '.tagInput', function() {
        if($(this).parents('.item').find('.tip').length) {
            $(this).parents('.item').find('.tip').hide();
        }
    });

    // 有下拉选项判断非空
    $('.item .select-list li').on('click', function() {
        var _this = $(this);
        _this.parent().parent().find('.txt').focus();
        setTimeout(function() {
            _this.parent().parent().find('.txt').blur();
        }, 50);
    });


});
})(jQuery);

function timepicker() {
    jQuery.datetimepicker.setLocale('ch');
    jQuery('.timepicker').datetimepicker({
        // lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });
}

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