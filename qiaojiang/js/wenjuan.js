$(function() {
	if ($('.wj-list').find('input[type=radio]').length) {
		radioSelect('.wj-list dd');
	}
	if ($('.wj-list').find('input[type=checkbox]').length) {
		checkboxSelect('.wj-list dd');
	}
});


// radio选中效果
function radioSelect(obj) {
    $.each($(obj).find('input[type=radio]'), function(index) {
		if (!$(this).parents('label').find('.ico-radio').length) {
			$(this).wrap('<span class="ico-radio"></span>');
		}
		if ($(this).prop('checked')) {
			$(this).parents('span').addClass('ico-radio-cur');
		}
		$(this).on('change', function() {
			$(obj).find('input[type=radio][name=' + $(this).attr('name') + ']').parents('span').removeClass('ico-radio-cur');
		    if ($(this).prop('checked')) {
		        $(this).parents('span').addClass('ico-radio-cur');
		    }
		});
    });
}
// checkbox选中效果
function checkboxSelect(obj) {
    jQuery.each($(obj).find('input[type=checkbox]'), function(i) {
        if (!$(this).parents('label').find('.ico-radio').length) {
            $(this).wrap('<span class="ico-radio"></span>');
        }
        if ($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur');
        }
        $(this).on('change', function() {
            if ($(this).prop('checked')) {
                $(this).parents('span').addClass('ico-radio-cur');
            } else {
                $(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};