(function($) {
$(function() {
    /*
     * 活动频道
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
    // 活动轮播图1
    if($('#hd-sld1').length) {
        $('#hd-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };
});
})(jQuery);