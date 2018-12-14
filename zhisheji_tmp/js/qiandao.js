(function($) {
$(function() {
    // 幻灯片
    if($('#sld-qd').length) {
        $('#sld-qd').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 4000,
            pause: 3500,
            hoverPause: true,
            next: 'icon-youjiantou',
            prev: 'icon-zuojiantou'
        });
        $('#sld-qd').on('mouseover', function() {
            $('.icon-zuojiantou, .icon-youjiantou').show();
        }).on('mouseout', function() {
            $('.icon-zuojiantou, .icon-youjiantou').hide();
        });
    };

    // 无缝滚动
    if($('.qd-top .notice').length) {
        $('.qd-top .notice').rollSlide({
            orientation: 'top',
            num: 1,
            v: 500,
            space: 3000,
            isRoll: true
        });
    };

    // 无缝滚动
    if($('.scroll-dhxx').length) {
        $('.scroll-dhxx').myScroll({
            speed: 50,      //数值越大，速度越慢
            rowHeight: 72,  //li的高度
            len: 2
        });
    };

    // 签到
    $('.qd-user-info').on('click', '.btn-red', function() {
        $('.popup-qd').show();
        centerObj('.popup-qd .popup');
        $(this).removeClass('btn-red').addClass('btn-gray').html('已签到');
        $('.qd-user-info').find('p').html('您已连续签到2天，获得15设计币');
        // 连续签到天数
        $('.qd-user-info').find('dl:eq(0) .num').html(+$('.qd-user-info').find('dl:eq(0) .num').html() + 1);
        // 获得设计币
        $('.qd-user-info').find('dl:eq(1) .num').html('10');
        // 我的设计币
        $('.qd-user-info').find('dl:eq(2) .num').html(+$('.qd-user-info').find('dl:eq(2) .num').html() + 10);
        setTimeout(function() {
            $('.popup-qd').hide();
        }, 2000);
    });

    $('.qd-top').on('click', '.btn-green', function() {
        // 第一次
        $.msgBox.Confirm(null, '第一次兑换商品需要先完善个人信息哦！', function() {
            $('.popup-infos').show();
            centerObj('.popup-infos .popup');
            $('.popup-box').find('.tips').hide();
        });
        // 非第一次
        // $('.popup-infos').show();
        // centerObj('.popup-infos .popup');
        // $('.popup-box').find('.tips').hide();
    });

    // 保存收货信息
    if ($('.popup-infos').length) {
        var dom1 = jQuery('.popup-infos').find('.popup-ct');
        judgeTips(dom1);
        $('.popup-infos').on('click', '.btn', function() {
            if (judgeBtns(dom1)) {
                $('.popup-infos').hide();
                tipSave('suc', '保存成功');
            }
        });
    };

    // 兑换
    $('.qd-list').on('click', '.btn-blue', function() {
        var txt = $(this).parents('li').find('.name').html();
        $.msgBox.Confirm(null, '确定要兑换“' + txt + '”吗？', function() {
            $('.popup-shdz').show();
            centerObj('.popup-shdz .popup');
        });
    });

    // 修改收货地址
    $('body').on('click', '.popup-shdz .btn-edit', function() {
        $('.popup-shdz').hide();
        $('.popup-infos').show();
        $('.popup-box').find('.tips').hide();
        centerObj('.popup-infos .popup');
    });

    // 确认收货地址
    $('body').on('click', '.popup-shdz .btn-blue', function() {
        $('.popup-shdz').hide();
        tipSave('suc', '兑换成功，预计48小时内发货，请注意查收');
    });
});

})(jQuery);

// 无缝滚动js
(function($){
    $.fn.myScroll = function(options){
    //默认配置
    var defaults = {
        speed:40,       //滚动速度,值越大速度越慢
        rowHeight:24,   //每行的高度
        len: 1          //每行个数
    };

    var opts = $.extend({}, defaults, options),intId = [];

    function marquee(obj, step){
        obj.find("ul").animate({
            marginTop: '-=1'
        },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, opts.len).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
})(jQuery);

function judgeTips(obj) {
    jQuery(obj).find('.txt').on('blur', function() {
        if (!jQuery(this).nextAll('.tips').length) {
            jQuery(this).parents('.item').append('<span class="tips"></span>');
        }
        if (jQuery.trim(jQuery(this).val()).length) {
            jQuery(this).parents('.item').addClass('has-val');
        }
        if (!jQuery.trim(jQuery(this).val()).length) {
            jQuery(this).parents('.item').removeClass('has-val');
            jQuery(this).nextAll('.tips').html('<span class="triangle"></span>' + jQuery(this).parents('.item').find('.input-label').text() + '不能为空！').show();
        }
        else if(!(/^1\d{10}$/.test(jQuery.trim(jQuery(this).val()))) && jQuery(this).parents('.item').find('.input-label').text() == '手机号') {
            jQuery(this).nextAll('.tips').html('<span class="triangle"></span>' + jQuery(this).parents('.item').find('.input-label').text() + '格式不正确！').show();
            return false;
        }
    });
    jQuery(obj).find('.txt').on('focus', function() {
        jQuery(this).nextAll('.tips').hide();
    });
}

function judgeBtns(obj) {
    var pass = true;
    jQuery.each(jQuery(obj).find('.txt'), function(index, val) {
        if (!jQuery.trim(jQuery(this).val()).length) {
            if (!jQuery(this).nextAll('.tips').length) {
                jQuery(this).parents('.item').append('<span class="tips"></span>');
            }
            jQuery(this).nextAll('.tips').html('<span class="triangle"></span>' + jQuery(this).parents('.item').find('.input-label').text() + '不能为空！').show();
            pass = false;
        }
    });
    return pass;
}