$(function() {

	// 删除字体
	$('.ziti-list').on('click', '.btn-del', function() {
	    var _this = $(this);
	    $.msgBox.Confirm(null, '确认删除此字体吗？', function() {
	        _this.parents('li').remove();
	    });
	});

	// 监听input字数
	if ($('.ziti-form').length) {
	    numbox();
	}

	// 上传附件关闭
	$('.upload-enclosure').on('click', '.upload-enclosure-close', function() {
	    $(this).parents('.upload-enclosure').find(".btn-enclosure").css({ display: 'inline-block' });
	    $(this).parents('.upload-enclosure').find(".tips").css({ display: 'inline-block' });
	    $(this).parents('.upload-enclosure-list').hide();
	});
});

// 字数判断
function numbox() {
    if ($('.num-box').length) {
        $.each($('.num-box'), function(i) {
            monitorVal($(this).parent().find('.input'), $(this).find('.num').text(), 'minus');
        });
    }
}