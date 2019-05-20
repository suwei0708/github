$(function() {
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

	/** 回答按钮操作 start */
	$('.wt-main')
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
	});
	/** 回答按钮操作 end */

	/** 评论按钮操作 start */
    // 评论判断回复框字数是否输入
	textareaChange('.wt-comment');

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
		if($(this).parents('li').find('.reply-form').is(':visible')) {
			$(this).parents('li').find('.reply-form').slideUp();
        }
        else {
			$(this).parents('li').find('.reply-form').slideDown();
        }
	})
	// 删除
	.on('click', '.btn-reply', function() {
		if($(this).parents('li').find('.reply-form').is(':visible')) {
			$(this).parents('li').find('.reply-form').slideUp();
        }
        else {
			$(this).parents('li').find('.reply-form').slideDown();
        }
	});
	/** 评论按钮操作 end */
});

function textareaChange(dom) {
	$.each($(dom).find('.textarea'), function(index, val) {
		var _this = $(this);
		_this.unbind()
        monitorVal(_this, 500, 'minus');
        _this.bind('input propertychange', function() {
            if (_this.val().length > 0) {
                _this.parent().find('.btn-sure').removeClass('dis');
            }
            else {
                _this.parent().find('.btn-sure').addClass('dis');
            }
        });
	});
}

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
        var _html = '<div id="sw-con"><a id="sw-close" href="javascript:;"><span class="icon-close"></span></a>';
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
    var btnNo = function(callback) {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-con').remove();
            maskHide();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
})();