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
			next: 'icon-youjiantou',
			prev: 'icon-zuojiantou'
		});
    };

});
})(jQuery);