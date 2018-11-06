(function($) {
$(function() {
    /*
     * 旅游频道
    */
    // 轮播图banner
    if($('.swiper-container').length) {
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            // mousewheel: true,
            width: 1200,
            loop : true,
            effect : 'fade',
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
        })
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
    var liLen = $('.ly-pics').find('li').length - 1;
    console.log(liLen);
    var html = $('.ly-pics').find('ul').html();

    $('.ly-morepics').on('click', '.more', function() {
        $('.ly-pics').find('ul').append(html);
    });
    $('.ly-morepics').on('click', '.shou', function() {
        $('.ly-pics').find('li:gt(' + liLen + ')').hide();
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