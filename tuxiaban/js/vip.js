$(function() {
    // 价格切换
    $('.vip-type').on('click', '.tab li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.vip-type').find('.ct').hide().eq($(this).index()).show();
	});

	// 关闭续费提醒
	$('.user-vip-tips').on('click', '.icon-guanbi', function() {
		$('.user-vip-tips').hide();
	})
});