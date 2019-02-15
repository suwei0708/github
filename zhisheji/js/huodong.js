(function($) {
$(function() {
    $('.hd-list').on('click', '.btn-del', function() {
        var _this = $(this);
        $.msgBox.Confirm(null, '确定删除此活动吗？', function() {
            _this.parents('li').remove();
        });
    });

    // 幻灯片
    if($('#sld-hd').length) {
        $('#sld-hd').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'icon-youjiantou',
            prev: 'icon-zuojiantou'
        });

        $('#sld-hd').on('mouseover', function() {
            $('.icon-youjiantou, .icon-zuojiantou').show();
        }).on('mouseout', function() {
            $('.icon-youjiantou, .icon-zuojiantou').hide();
        });
    }
});
})(jQuery);