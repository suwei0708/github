$(function() {
    // 价格切换
    $('.vip-type').on('click', '.tab li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.vip-type').find('.ct').hide().eq($(this).index()).show();
    });
    // 无缝滚动
    if($('.vip-myscroll').length) {
        $('.vip-myscroll').myScroll({
            speed: 50, //数值越大，速度越慢
            rowHeight: 72 //li的高度
        });
    }
});