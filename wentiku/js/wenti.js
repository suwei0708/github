$(function() {
    // 弹窗通用
    $('body').on('click', '.popup-box .popup-close', function () {
        $(this).parents('.popup-box').trigger('click');
    })
    .on('click', '.popup-box', function () {
        $(this).hide();
    })
    .on('click', '.popup-box .popup', function (e) {
        e.stopPropagation();
    });

    // 分享下拉
    $('body').on('click', '.select-btn', function(e) {
        if($(this).find('.select-list').is(':visible')) {
            $(this).find('.select-list').slideUp();
        }
        else {
            $('.select-list').slideUp();
            $(this).find('.select-list').slideDown();
        }
        e.stopPropagation();
    })
    .on('click', function() {
        if($('.select-list').is(':visible')) {
            $('.select-list').slideUp();
        }
    });

    // 搜索下拉
    $('.wt-so').on('focus', '.text', function() {
        $('.wt-so-tip').show();
    });
    $('.wt-so').on('blur', '.text', function() {
        setTimeout(function() {
            $('.wt-so-tip').hide();
        }, 200);
    });
    $('.wt-so-tip').on('click', 'a', function() {
        $('.wt-so .text').val($(this).text());
    });

    // 删除搜索历史
    $('.del-his').on('click', function() {
        $('.wt-so-tip-his').remove();
	});

	// 列表删除问题
	$('.wt-list').on('click', '.btn-del', function() {
		var _this = $(this);
        $.msgBox.Confirm(null, '确定删除吗？', function () {
			_this.parents('li').slideUp(400, function() {
				_this.parents('li').remove();
			})
        });
	});

    // 详情删除问题
    $('.wt-details-tit').on('click', '.wt-operate .btn-del', function () {
        var _this = $(this);
        $.msgBox.Confirm(null, '确定删除吗？', function () {
            tipSave('suc', '删除成功！');
            setTimeout(function() {
                window.location.href = '问题后台.html';
            }, 2000);
        });
    });

	/** 详情回答按钮操作 start */
    $('.wt-details')
    // 我来答
    .on('click', '.btn-answer', function () {
        if ($('.wt-answer').is(':visible')) {
            $('.wt-answer').slideUp();
        }
        else {
            $('.wt-answer').slideDown(400, function() {
                $('body, html').animate({
                    scrollTop: $('.wt-answer').offset().top - 117
                }, 500);
            });
            textareaChange('.wt-answer', 1000);
        }
    })
    // 提交答案
    .on('click', '.wt-answer .btn-sure', function() {
        if(!$(this).hasClass('dis')) {
            $('.wt-answer').find('.textarea').val('');
            $(this).addClass('dis');
            console.log('提交成功');
        }
    })
    // 下拉没有帮助
	.on('click', '.wt-operate .help', function() {
        if($(this).text() == '没有帮助') {
            $(this).html('撤销没有帮助');
        }
        else {
            $(this).html('没有帮助');
        }
	})
	// 赞
    .on('click', '.wt-operate .btn-zan', function() {
        var $parents = $(this).parents('.wt-operate');
        var $numDom = $parents.find('.btn-zan i');
		$num = $numDom.html() ? +$numDom.html() : 0;
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
            $num - 1 ? $numDom.html($num - 1) : $numDom.html('');
        }
        else {
            if($parents.find('.btn-cai').hasClass('cur')) {
                $parents.find('.btn-cai').removeClass('cur');
            }
            $(this).addClass('cur');
            $numDom.html(+$numDom.html() + 1);
        }
    })
	// 踩
    .on('click', '.wt-operate .btn-cai', function() {
        var $parents = $(this).parents('.wt-operate');
        var $numDom = $parents.find('.btn-zan i');
		$num = $numDom.html() ? +$numDom.html() : 0;
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
        }
        else {
            if($parents.find('.btn-zan').hasClass('cur')) {
                $parents.find('.btn-zan').removeClass('cur');
				$numDom.html($numDom.html() - 1);
				$num - 1 ? $numDom.html($num - 1) : $numDom.html('');
            }
            $(this).addClass('cur');
        }
    })
    // 展开收缩评论框
    .on('click', '.wt-operate .btn-comment', function () {
        var $dom = $(this).parents('.wt-details-ct').find('.wt-comment');
        if ($dom.is(':visible')) {
            $dom.slideUp();
            $(this).find('.i1').show();
            $(this).find('.i2').hide();
        } else {
            $dom.slideDown();
            $(this).find('.i1').hide();
            $(this).find('.i2').show();
        }
    })
    // 删除回答
    .on('click', '.wt-details-ct .wt-operate .btn-del', function () {
        var _this = $(this);
        $.msgBox.Confirm(null, '确定删除吗？', function () {
           _this.parents('.wt-details-ct').slideUp(400, function() {
               _this.parents('.wt-details-ct').remove();
           });
        });
    })
    // 收起回答内容
    .on('click', '.wt-operate .btn-shou', function () {
        $(this).parents('.wt-details-ct').addClass('wt-details-shrink');
    })
    // 收起回答内容
    .on('click', '.wt-details-shrink .btn-kai', function () {
        $(this).parents('.wt-details-ct').slideDown();
        $(this).parents('.wt-details-ct').removeClass('wt-details-shrink');
    });
    /** 详情回答按钮操作 end */

    /** 举报通用 start */
    // 举报通用
    $('body').on('click', '.btn-report', function () {
        $('.popup-report').show();
        centerObj('.popup-report .popup');
        radioSelect('.popup-report');
        $('.popup-report').find('label:eq(0)').trigger('click');
        monitorVal('.popup-report .textarea', 100, 'minus');
    })
    .on('click', '.popup-report .btn-green', function () {
        $('.popup-report').hide();
        tipSave('suc', '举报成功！');
    })
    .on('click', '.popup-report .btn-gray', function () {
        $('.popup-report').hide();
        console.log('取消举报');
    });
    /** 举报通用 end */

	/** 评论按钮操作 start */
    // 评论判断回复框字数是否输入
	textareaChange('.wt-comment', 500);
	$('.wt-comment')
	// 回复展示更多
	.on('click', '.more-comment', function() {
        if($(this).parents('li').find('.reply-box').is(':visible')) {
			$(this).removeClass('cur');
			$(this).parents('li').find('.reply-box').slideUp();
        }
        else {
            $(this).addClass('cur');
			$(this).parents('li').find('.reply-box').slideDown();
        }
	})
	// 赞
	.on('click', '.btn-zan', function() {
		var $parents = $(this).parents('.btn-box');
        var $numDom = $parents.find('.btn-zan i');
		$num = $numDom.html() ? +$numDom.html() : 0;
		if($(this).hasClass('cur')) {
			$(this).removeClass('cur');
			$num - 1 ? $numDom.html($num - 1) : $numDom.html('');
		}
		else {
            if($parents.find('.btn-cai').hasClass('cur')) {
                $parents.find('.btn-cai').removeClass('cur');
            }
			$(this).addClass('cur');
			$numDom.html($num + 1);
		}
	})
	// 踩
	.on('click', '.btn-cai', function() {
		var $parents = $(this).parents('.btn-box');
        var $numDom = $parents.find('.btn-zan i');
		$num = $numDom.html() ? +$numDom.html() : 0;
		if($(this).hasClass('cur')) {
			$(this).removeClass('cur');
		}
		else {
			$(this).addClass('cur');
			if($parents.find('.btn-zan').hasClass('cur')) {
				console.log($numDom.html())
                $parents.find('.btn-zan').removeClass('cur');
				$num - 1 ? $numDom.html($num - 1) : $numDom.html('');
            }
		}
	})
	// 回复
	.on('click', '.btn-reply', function() {
		if($(this).parents('.com-box').find('.reply-form').is(':visible')) {
			$(this).parents('.com-box').find('.reply-form').slideUp();
        }
        else {
            $('.wt-comment').find('.reply-form').slideUp();
			$(this).parents('.com-box').find('.reply-form').slideDown();
        }
	})
	// 删除评论
	.on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm(null, '确定删除吗？', function () {
            if (_this.parents('.reply-box').length) {
                // 删除评论子回复
                var $numDom = _this.parents('li').find('.more-comment i');
                if (+$numDom.html() > 1) {
                    $numDom.html($numDom.html() - 1);
                }
                else {
                    _this.parents('li').find('.more-comment, .reply-box').slideUp(400, function () {
                        _this.parents('li').find('.more-comment, .reply-box').remove();
                    });
                }
                _this.parents('.com-box').slideUp(400, function() {
                    _this.parents('.com-box').remove();
                });
            }
            else {
                // 删除评论回复
                _this.parents('li').slideUp(400, function () {
                    _this.parents('li').remove();
                });;
            }
        });
	})
	// 提交评论通用控制
	.on('click', '.btn-sure', function () {
	    if (!$(this).hasClass('dis')) {
	        $('.wt-comment').find('.textarea').val('');
	        $(this).addClass('dis');
	        console.log('提交成功');
	    }
	});
	/** 评论按钮操作 end */
});

function textareaChange(dom, nums) {
	$.each($(dom).find('.textarea'), function(index, val) {
		var _this = $(this);
		_this.unbind()
        monitorVal(_this, nums, 'minus');
        _this.bind('input propertychange', function() {
            if (_this.val().length > 0) {
                _this.parent().find('.btn-sure').removeClass('dis');
            }
            else {
                _this.parent().find('.btn-sure').addClass('dis');
            }
        });
	});
};

function monitorVal(obj, nums, minus) {
    if (minus) {
        if($(obj).nextAll('.num-box').find('.num').length) {
            $(obj).nextAll('.num-box').find('.num').html(nums - $(obj).val().length);
        }
    } else {
        if($(obj).nextAll('.num-box').find('.num').length) {
            $(obj).nextAll('.num-box').find('.num').html($(obj).val().length);
        }
    }
    $(obj).unbind();
    $(obj).bind('input propertychange', function() {
        if ($(obj).val().length >= nums) {
            $(obj).val($(obj).val().substr(0, nums));
        }
        if (minus) {
            $(obj).nextAll('.num-box').find('.num').html(nums - $(obj).val().length);
        } else {
            $(obj).nextAll('.num-box').find('.num').html($(obj).val().length);
        }
    });
};

function centerObj(obj) {
    var boxWidth = $(obj).outerWidth();
    var boxHeight = $(obj).outerHeight();
    $(obj).css({
        'margin-top': -boxHeight / 2 + 'px',
        'margin-left': -boxWidth / 2 + 'px'
    });
};

// radio选中效果
function radioSelect(obj) {
    $.each($(obj).find('input[type=radio]'), function (i) {
        if (!$(this).parents('label').find('.ico-radio').length) {
            $(this).wrap('<span class="ico-radio"></span>');
        }
        if ($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur');
        }
        $(this).off();
        $(this).on('change', function () {
            if ($(this).prop('checked')) {
                $(obj).find('.ico-radio').removeClass('ico-radio-cur');
                $(this).parents('span').addClass('ico-radio-cur');
            }
        });
    });
};

// 保存成功失败 status为suc或者fail，cont为提示的内容
function tipSave(status, cont, times) {
    var time;
    var tipTimer;
    if (status == 'suc') {
        icon = 'gou'
    }
    if (status == 'fail') {
        icon = 'guanbi'
    }
    times ? time = times : time = 2000
    $('body').append('<div class="popup-tip-box"><div class="popup-tip">' + '<span class="icon icon-' + icon + '"></span>' + '<span class="text">' + cont + '</span></div></div>');
    $('.popup-tip').css({
        'margin-left': -$('.popup-tip').outerWidth() / 2
    });
    clearInterval(tipTimer);
    tipTimer = setTimeout(function () {
        $('.popup-tip-box').remove();
    }, time);
};

// alert和confirm美化
// 调用方法, 标题为null则不显示标题
// $.msgBox.Alert('title', 'msg');
// $.msgBox.Confirm('title', 'msg', funcOk, funcNo);
(function() {
    jQuery.msgBox = {
		Alert: function(title, msg) {
			GenerateHtml('alert', title, msg);
			btnOk();
			btnNo();
		},
		Confirm: function(title, msg, callback, callbackno) {
			GenerateHtml('confirm', title, msg);
			btnOk(callback);
			btnNo(callbackno);
		}
	}
	//生成Html
    var GenerateHtml = function(type, title, msg) {
        var _html = '<div id="sw-bg"><div id="sw-con"><a id="sw-close" href="javascript:;"><span class="icon icon-guanbi"></span></a>';
        if (title) {
            _html += '<div id="sw-tit">' + title + '</div>';
        }
        _html += '<div id="sw-msg">' + msg + '</div><div id="sw-btn-box">';

        if (type == 'alert') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
        }
        if (type == 'confirm') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
            _html += '<a id="sw-btn-no" href="javascript:;">取消</a>';
        }
        _html += '</div></div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
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
			jQuery('#sw-bg').remove();
			if (typeof(callback) == 'function') {
				callback();
			}
		});
	}
	//取消按钮事件
    var btnNo = function(callback) {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-bg').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
})();