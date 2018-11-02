(function($) {
$(function() {
    // 首页banner
    if($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            effect: 'fade',
            prev: 'ico-prev',
            next: 'ico-next',
        });
    };
    // 云服务
    if($('#sld1').length) {
        $('#sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            prev: 'ico-prev',
            next: 'ico-next',
            animationComplete: function(i) {
                $('.yfw-yycj .tab a').eq(i - 1).addClass('cur').siblings().removeClass('cur');
            }
        });
        $('.yfw-yycj > .tab').on('click', 'a', function() {
            $(this).addClass('cur').siblings().removeClass('cur');
            $('#sld1 .pagination > li').eq($(this).index()).find('a').click();
        });
    };

});
})(jQuery);