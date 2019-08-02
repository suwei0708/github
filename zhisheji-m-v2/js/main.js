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

	// 评论展示更多
	$('.content-comment').on('click', '.more-comment', function() {
	    if ($(this).find('.more-comment-text').text() == '收起评论') {
	        $(this).find('.more-comment-text').text('查看更多评论');
	        $(this).parents('.reply-box').find('.more-comment-box').hide();
	    } else {
	        $(this).find('.more-comment-text').text('收起评论');
	        $(this).parents('.reply-box').find('.more-comment-box').show();
	    }
	});
});