(function($) {
$(function() {
    /*
     * 体育频道
    */
    // 体育轮播图1
    if($('#ty-sld1').length) {
        $('#ty-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };
});
})(jQuery);