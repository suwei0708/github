$(function() {
    // 价格切换
    $('.vip-type').on('click', '.tab li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.vip-type').find('.ct').hide().eq($(this).index()).show();
	});
});