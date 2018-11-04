(function($) {
$(function() {

    // tab切换
    $('.tab-tit').on('hover', 'a', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.yl-tab').find('.list').addClass('hide').eq($(this).index()).removeClass('hide');
    });

    /*
     * 娱乐频道
    */
    // 娱乐轮播图1
    if($('#yl-sld1').length) {
        $('#yl-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };
});
})(jQuery);