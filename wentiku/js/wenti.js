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

    // 下拉没有帮助
    $('.wt-main').on('click', '.help', function() {
        if($(this).text() == '没有帮助') {
            $(this).html('撤销没有帮助');
        }
        else {
            $(this).html('没有帮助');
        }
    })
    .on('click', '.btn-zan', function() {
        var $parents = $(this).parents('.wt-operate');
        var $numDom = $(this).find('i');
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
            $numDom.html($numDom.html() - 1);
        }
        else {
            if($parents.find('.btn-cai').hasClass('cur')) {
                $parents.find('.btn-cai').removeClass('cur');
            }
            $(this).addClass('cur');
            $numDom.html(+$numDom.html() + 1);
        }
    })
    .on('click', '.btn-cai', function() {
        var $parents = $(this).parents('.wt-operate');
        var $numDom = $parents.find('.btn-zan i');
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
        }
        else {
            if($parents.find('.btn-zan').hasClass('cur')) {
                $parents.find('.btn-zan').removeClass('cur');
                $numDom.html($numDom.html() - 1);
            }
            $(this).addClass('cur');
        }
    });

    // 判断回复框字数是否输入
    $.each($('.wt-comment').find('.textarea'), function(index, val) {
        var _this = $(this);
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
});

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