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
	$('body').on('click', '.item-select', function() {
		if($(this).find('.select-list').is(':hidden')) {
			$('.select-list').slideUp();
			$('.item-select').css('z-index', 'auto');
			$(this).css('z-index', '980');
			$(this).find('.select-list').slideDown();
		}
		return false;
	})
	.on('click', '.select-list li', function() {
	    var txtDom = $(this).parents('.item-select').find('.input');
	    if (txtDom.is('input')) {
	        txtDom.val($(this).text());
	    } else {
	        txtDom.html($(this).text());
		}
		txtDom.focus().blur();
	    $(this).parents('.select-list').slideUp();
	    $('.item-select').css('z-index', 'auto');
	    return false;
	})
	.on('click', function() {
		if ($('.select-list').is(':visible')) {
			$('.select-list').slideUp();
		}
	});

	// 公司简介展开收缩
	$('.job-cintro').on('click', '.more', function() {
		if($(this).parents('.cont').hasClass('cont-more')) {
			$(this).parents('.cont').removeClass('cont-more');
		}
		else {
			$(this).parents('.cont').addClass('cont-more');
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
	        $('.data-img .img').prepend('<img src="' + dataurl + '">');
		}
		$('.jinfo-form .avatar').val(dataurl).focus().blur();
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
	// checkbox美化
	if ($('.checkbox').length) {
	    checkboxSelect('.checkbox');
	};

	var addNum = 1;
	if ($('.base-box').length) {
		var $dom = $('.base-box').clone().addClass('add-box');
	}
	$('.jinfo-box').on('click', '.btn-add', function() {
		addNum++;
		var $newDom = $dom.clone();
		$.each($newDom.find('.item'), function() {
		    $(this).find('.input').attr('name', $(this).find('.input').attr('name') + addNum);
		});
		$(this).parents('.item').before($newDom);
		numbox(); //字数判断

		timepicker();
	});

	// 消息页消息滚动到底部
	if($('.jmsg').length) {
		$('.jmsg').find('.cont').scrollTop(99999);
	}

	// 切换消息
	$('.jmsg').on('click', '.jmsg-l li', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
	});
	// 消息快捷回复
	$('.btn-fast').on('click', '.list li', function() {
		var $replayDom = '<div class="msg msg-r">' +
		    '<span class="img"><img src="../images/system.png" height="40" width="40"></span>' +
		    '<div class="msg-ct">' + $(this).text() + '<span class="arrow"></span></div>' +
		    '<div class="times">' + getNowFormatDate() + '</div>' +
		    '</div>';
		$('.jmsg').find('.cont').append($replayDom).scrollTop(99999);
	});

	// 回复消息
	$('.jmsg').on('click', '.reply .btn', function() {
		$cont = $.trim($(this).parents('.reply').find('.textarea').val());
		if (!$cont) {
			$.msgBox.Alert(null, '内容不能为空！');
			return false;
		}
	    var $replayDom = '<div class="msg msg-r">' +
	        '<span class="img"><img src="../images/system.png" height="40" width="40"></span>' +
	        '<div class="msg-ct">' + $cont + '<span class="arrow"></span></div>' +
	        '<div class="times">' + getNowFormatDate() + '</div>' +
			'</div>';
		$(this).parents('.reply').find('.textarea').val('');
	    $('.jmsg').find('.cont').append($replayDom).scrollTop(99999);
	});

	// 简历导航位置跳转
	if($('.side-nav').length && $('#scroll0').length) {
		var pos = $('.side-nav').offset().top;
		posNav(pos);
		$(window).on('scroll', function() {
			posNav(pos)
		});
		$('.side-nav').on('click', 'li', function() {
		    var _this = $(this);
		    var index = +$(this).index();
		    $('html, body').animate({
		        scrollTop: $('#scroll' + index).offset().top
			}, 100);
			setTimeout(function() {
				_this.find('a').addClass('cur').parent().siblings().find('a').removeClass('cur')
			}, 110);
		});
	}

	// 编辑简历基本信息
	$('.jl-box').on('click', '.btn-edit', function() {
		$(this).parents('.jl-box').find('.jl-info').hide();
		$(this).parents('.jl-box').find('.jinfo-form').show();
	});

	// 编辑简历工作经历
	$('.jl-work').on('click', '.btn-edit', function() {
		$(this).parents('.work-box').find('.work-item').hide();
		$(this).parents('.work-box').find('.jinfo-form').show();
	});
	// 删除简历工作经历
	$('.jl-work').on('click', '.btn-del', function() {
	    var _this = $(this);
	    $.msgBox.Confirm(null, '删除后将无法恢复，确定要删除吗？', function() {
	        _this.parents('.work-box').remove();
	    });
	});
	// 增加工作经历
	$('.jl-work').on('click', '.btn-add', function() {
		$(this).parents('.jl-work').find('#form1-add').show();
		$('html,body').animate({
			scrollTop: $(this).parents('.jl-work').find('#form1-add').offset().top
		}, 200)
	});

	// 编辑简历自我介绍
	$('.jl-intro').on('click', '.btn-edit', function() {
		$(this).hide();
	    $(this).parents('.jl-intro').find('.work-item').hide();
	    $(this).parents('.jl-intro').find('.jinfo-form').show();
	});

	// 增加工作经历
	$('.jl-edu').on('click', '.btn-edit', function() {
	    $(this).parents('.work-box').find('.work-item').hide();
	    $(this).parents('.work-box').find('.jinfo-form').show();
	});
	// 删除简历工作经历
	$('.jl-edu').on('click', '.btn-del', function() {
	    var _this = $(this);
	    $.msgBox.Confirm(null, '删除后将无法恢复，确定要删除吗？', function() {
	        _this.parents('.work-box').remove();
	    });
	});
	$('.jl-edu').on('click', '.btn-add', function() {
		$(this).parents('.jl-edu').find('#form3-add').show();
		$('html,body').animate({
		    scrollTop: $(this).parents('.jl-edu').find('#form3-add').offset().top
		}, 200)
	});
});

// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentdate = month + '月' + strDate + "日 " + hours + seperator2 + minutes + seperator2 + seconds;
    return currentdate;
}

function timepicker() {
	// $('.timepicker').datetimepicker('remove');
	$.datetimepicker.setLocale('ch');
	$.each($('.timepicker'), function() {
	    if ($(this).data('format')) {
			data = $(this).data('format');
			var _this = $(this);
			$(this).datetimepicker({
			    // lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
				format: data, //格式化日期
			    timepicker: false, //关闭时间选项
				todayButton: false, //关闭选择今天按钮
				validateOnBlur: false, // 失去焦点时验证datetime值输入,。如果值是无效的datetime,然后插入当前日期时间值
			});
		}
		else {
			data = 'Y-m-d';
			$(this).datetimepicker({
			    format: data, //格式化日期
			    timepicker: false, //关闭时间选项
			    todayButton: false //关闭选择今天按钮
			});
	    }
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
        fileSize: 5,
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
    	fileSize: _self.IsNull(setting.fileSize) ? _self.DefautlSetting.fileSize : setting.fileSize,
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
            var filemaxsize = 1024 * _self.Setting.fileSize;
            var target = jQuery(e.target);
            var Size = target[0].files[0].size / 1024;

            if(Size > filemaxsize) {
                jQuery.msgBox.Alert(null, '图片大于' + _self.Setting.fileSize + 'M，请重新选择!');
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

// 简历导航跳转
function posNav(pos) {
	if($(window).scrollTop() > pos) {
		$('.side-nav').css({
			position: 'fixed',
			top: 0
		})
	}
	else {
		$('.side-nav').css({
		    position: 'static'
		})
	}
	$.each($('.side-nav li'), function(i) {
		if ($(window).scrollTop() >= $('#scroll' + i).offset().top) {
			$('.side-nav li a').removeClass('cur').parent().eq(i).find('a').addClass('cur');
		}
	});
}