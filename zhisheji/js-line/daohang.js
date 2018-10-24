(function($) {
$(function() {
    if($('#fixed-dh-main').length) {
        // 导航悬浮和滚动
        sidebarNav();
        $(window).on('scroll', function() {
            sidebarNav();
        });
        // 导航跳转
        $('.dh-nav').on('click', 'a', function() {
            var index = +$(this).index();
            var _this = $(this);
            $('html, body').animate({
                scrollTop: $('#fixed-dh-main').find('.dh-box').eq(index).offset().top
            }, 300);
            setTimeout(function() {
                _this.addClass('cur').siblings().removeClass('cur');
            }, 310);

        });

        // 点击更多
        $('#fixed-dh-main').on('click', '.more', function() {
            if($(this).hasClass('cur')) {
                $(this).removeClass('cur');
                $(this).parents('.dh-box').find('.list').css({
                    'height': 172
                });
            }
            else {
                $(this).addClass('cur');
                $(this).parents('.dh-box').find('.list').css({
                    'height': Math.ceil($(this).parents('.dh-box').find('.list li').length / 3) * 86
                });

            }
        })
    }
});

function sidebarNav() {
    $.each($('.dh-nav a'), function(i) {
        if($(window).scrollTop() >= $('#fixed-dh-main').find('.dh-box').eq(i).offset().top) {
            $('.dh-nav a').removeClass('cur').eq(i).addClass('cur');
        }
        // else if ($(window).scrollTop() < $('#fixed-dh-main').find('.dh-box').eq(0).offset().top) {
        //     $('.dh-nav a').removeClass('cur');
        // }
    });

    var positonNum = $('#fixed-dh-main').offset().top;
    if($(window).scrollTop() > positonNum) {
        $('.dh-nav').css({
            'position': 'fixed',
            'top': 0
        });
    }
    else {
        $('.dh-nav').css({
            'position': 'static'
        });
    }
}
})(jQuery);