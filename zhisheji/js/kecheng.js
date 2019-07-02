$(function() {
	// 幻灯片
	if ($('#sld-kc').length) {
	    $('#sld-kc').slides({
	        generatePagination: true,
	        generateNextPrev: true,
	        play: 3000,
	        pause: 2500,
	        hoverPause: true,
	        next: 'icon-youjiantou',
	        prev: 'icon-zuojiantou'
	    });
	}

	// 首页切换
	$('.zsj-kc').on('click', '.tit h2', function() {
		console.log($(this).index());
		$(this).find('a').addClass('cur').parent().siblings('h2').find('a').removeClass('cur');
		$('.tab-kccont').find('.zsj-kc').hide().eq($(this).index()).show();
	});
});

// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentdate = month + '月' + strDate + "日 " + hours + seperator2 + minutes + seperator2 + seconds;
    return currentdate;
}

function timepicker() {
	// $('.timepicker').datetimepicker('remove');
	$.datetimepicker.setLocale('ch');
	$.each($('.timepicker'), function() {
	    if ($(this).data('format')) {
			data = $(this).data('format');
			var _this = $(this);
			$(this).datetimepicker({
			    // lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
				format: data, //格式化日期
			    timepicker: false, //关闭时间选项
				todayButton: false, //关闭选择今天按钮
				validateOnBlur: false // 失去焦点时验证datetime值输入,。如果值是无效的datetime,然后插入当前日期时间值
			});
		}
		else {
			data = 'Y-m-d';
			$(this).datetimepicker({
			    format: data, //格式化日期
			    timepicker: false, //关闭时间选项
			    todayButton: false //关闭选择今天按钮
			});
	    }
	});

}

// radio选中效果
function radioBeautify(obj) {
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

// 字数判断
function numbox() {
	if ($('.num-box').length) {
	    $.each($('.num-box'), function(i) {
	        monitorVal($(this).parent().find('.input'), $(this).find('.num').text(), 'minus');
	    });
	}
}