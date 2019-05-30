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
	    required: "此题不可为空哦！"
	});

	$.validator.setDefaults({
		errorElement: 'div',
		debug: true, // 只验证不提交表单
		errorPlacement: function(error, element) {
			error.appendTo(element.parents('dd'));
		},
	});

	var agreen = true;
	$('.wj-list').on('click', '.btn-agreen', function() {
		// 我愿意
		agreen = true;
		$('#wj-list1').validate({
			// 验证成功后提交
			submitHandler: function(form) {
				if(agreen) {
					agreenFuc();
				}
				else {
					endFuc();
				}
			},
		});
	})
	.on('click', '.btn-end', function() {
		// 结束问卷
		agreen = false;
		$('#wj-list1').validate({
		    // 验证成功后提交
		    submitHandler: function(form) {
				if (agreen) {
				    agreenFuc();
				} else {
				    endFuc();
				}
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

	// 我愿意提交事件
	function agreenFuc() {
		console.log('同意')
		$('.popup-wjstudy, .mask').show();
	}
	// 结束问卷事件
	function endFuc() {
	    console.log('结束');
	    $('.popup-subsuc, .mask').show();
	}

	// 问卷2根据url判断是否有前2题
	if (getUrlParameterByName('study') == '0') {
		$('#wj-list2').find('dl:lt(2)').remove();
		$.each($('#wj-list2').find('.num'), function(i) {
			var num;
			$(this).text() - 2 > 9 ? num = $(this).text() - 2 : num = '0' + ($(this).text() - 2);
			$(this).html(num);
		});
	};
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

function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}