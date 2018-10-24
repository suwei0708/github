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
            next: 'icon-b-r',
            prev: 'icon-b-l'
        });

        $('#sld-hd').on('mouseover', function() {
            $('.icon-b-l, .icon-b-r').show();
        }).on('mouseout', function() {
            $('.icon-b-l, .icon-b-r').hide();
        });
    }
});
})(jQuery);