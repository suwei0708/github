$(function() {
	// 幻灯片
	if ($('#job-sld1').length) {
	    $('#job-sld1').slides({
	        generatePagination: true,
	        generateNextPrev: true,
	        play: 3000,
	        pause: 2500,
	        hoverPause: true,
	        next: 'icon-youjiantou',
	        prev: 'icon-zuojiantou'
	    });
	}

	// 招聘首页公众号和QQ求职推荐 切换
	$('.job-ecode .tit').on('mouseover', 'li', function() {
	    $(this).addClass('cur').siblings().removeClass('cur');
	    $(this).parents('.job-ecode').find('.ct').hide().eq($(this).index()).show();
	});

	// 招聘通用下拉
	$('.item-select').on('click', function() {
		if($(this).find('.select-list').is(':hidden')) {
			$('.select-list').slideUp();
			$('.item-select').css('z-index', 'auto');
			$(this).css('z-index', '999');
			$(this).find('.select-list').slideDown();
		}
		return false;
	});
	$('.select-list').on('click', 'li', function() {
	    var txtDom = $(this).parents('.item-select').find('.input');
	    if (txtDom.is('input')) {
	        txtDom.val($(this).text());
	    } else {
	        txtDom.html($(this).text());
	    }
	    $(this).parents('.select-list').slideUp();
	    $('.item-select').css('z-index', 'auto');
	    return false;
	});
	$('body').on('click', function() {
		if ($('.select-list').is(':visible')) {
			$('.select-list').slideUp();
		}
	});

	// 裁剪头像
	$('#avatarInput').on('change', function(e) {
	    var filemaxsize = 1024 * 5; //10M
	    var target = $(e.target);
	    var Size = target[0].files[0].size / 1024;
	    if (Size > filemaxsize) {
	        $.msgBox.Alert(null, '图片大于10M，请重新选择!');
	        return false;
	    }
	    if (!this.files[0].type.match(/image.*/)) {
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
	                viewMode: 2, //显示
	                dragMode: "move",
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
	    $('#avatarInput').trigger('click');
	});

	// 保存头像
	$('.user-editbox').on('click', '.btn', function() {
	    var $imgData = $(image).cropper('getCroppedCanvas', {
	        width: 200,
	        height: 200
	    });
	    dataurl = $imgData.toDataURL('image/png');

	    if ($('.data-img .img img').length) {
	        $('.data-img .img img').attr('src', dataurl);
	    } else {
	        $('.data-img .img').prepend('<img height="100" width="100" src="' + dataurl + '">');
		}
		$('.avatar').val(dataurl);
	    $('.user-editbox').hide();
	    maskHide();
	});

	// 初始化城市
	if ($('#city-input').length) {
	    // 城市颜色控制
	    selectValColor($('#city-input'));

	    initCitys('#city-input');
	    // 点击城市选项
	    $('#city-input').on('click', function() {
	        initCitys('#city-input');
	        if ($('#city-input').attr('data-city')) {
	            $('.sw-select').show();
	        } else {
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
	        selectValColor($('#city-input'));

	        return false;
	    });

	    // 点击body关闭城市选项
	    if ($('.sw-select').length) {
	        $('body').on('click', function() {
	            $('.sw-select').hide();
	        });
		};

		function selectValColor(obj) {
		    if (obj.html() != '请选择分类' && obj.html() != '请选择' && obj.val() != '请选择') {
		        obj.attr({
		            style: 'color: #333'
		        });
		    } else {
		        obj.attr({
		            style: 'color: #bbb'
		        });
		    }
		}
	}

	// 监听input字数
	numbox();

	// 启用时间插件
	if ($('.timepicker').length) {
	    timepicker();
	};
	// radio美化
	if ($('.radio').length) {
	    radioBeautify('.radio');
	}

	var addNum = 1;
	if ($('.base-box').length) {
		var $dom = $('.base-box').clone().addClass('add-box');
	}
	$('.jinfo-box').on('click', '.btn-add', function() {
		addNum++;
		var $newDom = $dom.clone();
		console.log($newDom.html())
		$.each($newDom.find('.item'), function() {
		    $(this).find('.input').attr('name', $(this).find('.input').attr('name') + addNum);
		});
		$(this).parents('.item').before($newDom);
		numbox(); //字数判断
		timepicker(); //时间插件
	});

});

function timepicker(format) {
	// $('.timepicker').datetimepicker('remove');
	$.datetimepicker.setLocale('ch');
	if(format) {
		var data = format;
	}
	else {
		var data = 'Y-m-d';
	}
    $('.timepicker').datetimepicker({
        // lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
        format: data, //格式化日期
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

// radio选中效果
function radioBeautify(obj) {
    $.each($(obj).find('input[type=radio]'), function(index) {
        if (!$(this).parents('label').find('.ico-radio').length) {
            $(this).wrap('<span class="ico-radio"></span>');
        }
        if ($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur');
        }
        $(this).on('change', function() {
            $(obj).find('input[type=radio][name=' + $(this).attr('name') + ']').parents('span').removeClass('ico-radio-cur');
            if ($(this).prop('checked')) {
                $(this).parents('span').addClass('ico-radio-cur');
            }
        });
    });
}

// 字数判断
function numbox() {
	if ($('.num-box').length) {
	    $.each($('.num-box'), function(i) {
	        monitorVal($(this).parent().find('.input'), $(this).find('.num').text(), 'minus');
	    });
	}
}