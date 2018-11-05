(function($) {
$(function() {
    /*
     * 旅游频道
    */
    // 轮播图banner
    if($('#sld-banner').length) {
        $('#sld-banner').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            effect: 'fade'
        });
    };

    // 返回顶部
    $('.ly-talk').on('click', '.back', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    // 菜单悬浮
    var navPos = $('.ly-nav').offset().top;
    fixedNav(navPos);
    $(window).on('scroll', function() {
        fixedNav(navPos);
    });

    // 搜索下拉
    $('.so-box').on('mouseover', '.select', function() {
        $('.so-box').find('.select-box').show();
    })
    .on('mouseout', '.select', function() {
        $('.so-box').find('.select-box').hide();
    })
    .on('click', '.select-box li', function() {
        $('.so-box').find('.select').find('.txt').text($(this).text());
        $('.so-box').find('.select-box').hide();
    });

    // 显示更多
    $('.ly-pics').find('li:gt(6)').hide();

    $('.ly-morepics').on('click', function() {
        if($(this).text() == '显示更多') {
            $(this).text('收起');
            $(this).parents('.ly-pics').find('li').show();
        }
        else {
            $(this).text('显示更多');
            $(this).parents('.ly-pics').find('li:gt(6)').hide();
        }
    });
});

function fixedNav(navPos) {
    if($(window).scrollTop() > navPos) {
        $('.ly-nav').css({
            'position': 'fixed'
        });
    }
    else {
        $('.ly-nav').css({
            'position': 'static'
        });
    }
}
})(jQuery);