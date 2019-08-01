$(function() {
	// 头部下拉
	$('body').on('click', '.menu-down', function() {
		if ($(this).find('.menu-sub').is(':hidden')) {
			$(this).find('.menu-sub').slideDown();
		}
		else {
			$('.menu-sub').slideUp();
		}
	})
	// 下拉收起
	.on('click', '.menu-sub', function(e) {
		$('.menu-sub').slideUp();
		e.stopPropagation();
	})
	// 下拉阻止冒泡
	.on('click', '.menu-sub ul', function(e) {
	    e.stopPropagation();
	});
});