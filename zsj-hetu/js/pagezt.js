(function($) {
$(function() {
    if($('.zt-activitytime').length) {
        // 活动时间
        var nowDate = new Date();
        var year = nowDate.getFullYear(); //得到年份
        var month = nowDate.getMonth() + 1;//得到月份
        month = month < 10 ? '0' + month : month;
        var date = nowDate.getDate();//得到日期
        date = date < 10 ? '0' + date : date;
        var today = year + '' + month + '' + date;
        $.each($('.zt-activitytime .ct li'), function(i) {
            if(today == $(this).data('time') || (today >= $(this).data('start') && today <= $(this).data('end'))) {
                $(this).addClass('cur');
            }
        });
    };

    showCur();
    $(window).on('scroll', function() {
        showCur();
    });

    // 导航跳转
    if($('#scroll1').length) {
        $('.zt-nav').on('click', 'li', function() {
            var index = +$(this).index();
            if(index == 0) {
                $('html, body').animate({
                    scrollTop: 0
                }, 300);
            }
            else if(index >= 4) {}
            else {
                $('html, body').animate({
                    scrollTop: $('#scroll' + index).offset().top - $('.zt-nav').height()
                }, 300);
            }
        });
    };
});
})(jQuery);

function showCur() {
(function($) {
    // 导航显示
    if($(window).scrollTop() > $('.top-img').offset().top + $('.top-img').height()) {
        $('.zt-nav').css({
            'position': 'fixed'
        });
        $('.nav-all').css({
            'margin-top': '61px'
        });
    }
    else {
        $('.zt-nav').css({
            'position': 'static'
        });
        $('.nav-all').css({
            'margin-top': 0
        });
    };

    if($('#scroll1').length) {
        $.each($('.zt-nav li'), function(i) {
            if(i == 0) {
                $('.zt-nav li').removeClass('cur').eq(0).addClass('cur');
            }
            else if(i >= 4) {}
            else if($(window).scrollTop() >= $('#scroll' + i).offset().top  - $('.zt-nav').height()) {
                $('.zt-nav li').removeClass('cur').eq(i).addClass('cur');
            }
        });
    }
})(jQuery);
}