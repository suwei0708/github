$(function() {
	if ($('.wj-list').find('input[type=radio]').length) {
		// radio美化
		radioSelect('.wj-list dd');
	};
	if ($('.wj-list').find('input[type=checkbox]').length) {
	    // checkbox美化
		checkboxSelect('.wj-list dd');
	};

	$.extend(jQuery.validator.messages, {
	    required: "<span></span></span>必选字段"
	});

	$.validator.setDefaults({
		errorElement: 'div',
		debug: true, // 只验证不提交表单
		errorPlacement: function(error, element) {
			error.appendTo(element.parents('dd'));
		},
	});
	$('.wj-list').on('click', '.btn-agreen', function() {
		// 我愿意
		$('#wj-list1').validate({
			// 验证成功后提交
			submitHandler: function(form) {
				$('.popup-wjstudy, .mask').show();
			},
		});
	})
	.on('click', '.btn-end', function() {
		// 结束问卷
		$('#wj-list1').validate({
		    // 验证成功后提交
		    submitHandler: function(form) {
		        $('.popup-subsuc, .mask').show();
		    },
		});
	})
	.on('click', '.btn-submit', function() {
		// 结束问卷
		$('#wj-list2').validate({
		    // 验证成功后提交
		    submitHandler: function(form) {
		        $('.popup-submit, .mask').show();
		    },
		});
	});
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