(function($) {
$(function() {
    // 大赛时间
    var nowDate = new Date();
    var year = nowDate.getFullYear(); //得到年份
    var month = nowDate.getMonth() + 1;//得到月份
    month = month < 10 ? '0' + month : month;
    var date = nowDate.getDate();//得到日期
    date = date < 10 ? '0' + date : date;
    var today = year + '' + month + '' + date;
    $.each($('.zt-times .list li'), function(i) {
        if(today == $(this).data('time') || (today >= $(this).data('start') && today <= $(this).data('end'))) {
            $(this).addClass('cur');
        }
    });

    // 大赛奖品
    var prizeIndex = 0;
    var prizeLen = $('.zt-prize').find('.list li').length - 2;
    $('.zt-prize').on('mouseenter', '.list li', function() {
        if($(this).index() >= 7) { return false;}
        prizeIndex = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.zt-prize').find('.prize-box').addClass('hide').eq(prizeIndex).removeClass('hide');
    })
    .on('click', '.prev', function() {
        prizeIndex == 0 ? prizeIndex = prizeLen : prizeIndex--;
        $('.zt-prize').find('.list li').removeClass('cur').eq(prizeIndex).addClass('cur');
        $('.zt-prize').find('.prize-box').addClass('hide').eq(prizeIndex).removeClass('hide');
    })
    .on('click', '.next', function() {
        console.log(prizeIndex, prizeLen);
        prizeIndex == prizeLen ? prizeIndex = 0 : prizeIndex++;
        console.log(prizeIndex, prizeLen, 2);
        $('.zt-prize').find('.list li').removeClass('cur').eq(prizeIndex).addClass('cur');
        $('.zt-prize').find('.prize-box').addClass('hide').eq(prizeIndex).removeClass('hide');
    });

    // 悬浮跳转
    if($('.fixed-nav').length) {
        showFixNav();
        $(window).on('scroll', function() {
            showFixNav();
        });
    }
    $('.fixed-nav').on('click', 'a', function() {
        var index = +$(this).parent('li').index();
        console.log(index)
        if(index == 6) {
            $('html, body').animate({
                scrollTop: 0
            }, 300);
        }
        else {
            $('html, body').animate({
                scrollTop: $('#scroll' + index).offset().top
            }, 300);
        }
    });

    // 点击分享
    $('body').on('click', '.ztpopup-btn .btn-share', function() {
        $('#qzone')[0].click();
    });

    // 十强公布倒计时
    if($('#times').length) {
        var downcount = $('#times').data('downcount');
        $('#times').downCount({
            date: downcount
        });
    };

    $.ztMsg.Alert('zan', 'msg', 'btntxt')
});
})(jQuery);

function showFixNav() {
    if($(window).scrollTop() > $('#scroll0').offset().top - 82) {
        $('.fixed-nav').show();
    }
    else {
        $('.fixed-nav').hide();
    }
}

function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
};

function copyToClipboard(){
    var e=document.getElementById('contents');//对象是contents
    e.select(); //选择对象
    document.execCommand('Copy'); //执行浏览器复制命令
}

// 倒计时插件
(function ($) {
    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: '11/11/2090 00:00:00',
                offset: +8
            }, options);
        if (!settings.date) {
            $.error('Date is not defined.');
        }
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }
        var container = this;
        var currentDate = function () {
            var date = new Date();
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            var new_date = new Date(utc + (3600000*settings.offset))
            return new_date;
        };
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date
            var difference = target_date - current_date;
            if (difference < 0) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return;
            }
            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;
            // calculate dates
            var days = Math.floor(difference / _day).toString(),
                hours = Math.floor((difference % _day) / _hour).toString(),
                minutes = Math.floor((difference % _hour) / _minute).toString(),
                seconds = Math.floor((difference % _minute) / _second).toString();
                // fix dates so that it will show two digets
                days = (days.length >= 2) ? days : '0' + days;
                hours = (hours.length >= 2) ? hours : '0' + hours;
                minutes = (minutes.length >= 2) ? minutes : '0' + minutes;
                seconds = (seconds.length >= 2) ? seconds : '0' + seconds;

            container.find('.num-bg:eq(0)').html('<span class="num' + days.slice(days.length-2,days.length-1) + '"></span>');
            container.find('.num-bg:eq(1)').html('<span class="num' + days.slice(days.length-1,days.length) + '"></span>');
            container.find('.num-bg:eq(2)').html('<span class="num' + hours.slice(hours.length-2,hours.length-1) + '"></span>');
            container.find('.num-bg:eq(3)').html('<span class="num' + hours.slice(hours.length-1,hours.length) + '"></span>');
            container.find('.num-bg:eq(4)').html('<span class="num' + minutes.slice(minutes.length-2,minutes.length-1) + '"></span>');
            container.find('.num-bg:eq(5)').html('<span class="num' + minutes.slice(minutes.length-1,minutes.length) + '"></span>');
            container.find('.num-bg:eq(6)').html('<span class="num' + seconds.slice(seconds.length-2,seconds.length-1) + '"></span>');
            container.find('.num-bg:eq(7)').html('<span class="num' + seconds.slice(seconds.length-1,seconds.length) + '"></span>');
        };
        // start
        var interval = setInterval(countdown, 1000);
    };
})(jQuery);

// alert和confirm美化
// 调用方法
// $.ztMsg.Alert('icon', 'msg', 'btntxt');
// $.ztMsg.Confirm('icon', 'msg', 'btntxt', func);
(function() {
    jQuery.ztMsg = {
        Alert: function(icon, msg, btntxt) {
            GenerateHtml('alert', icon, msg, btntxt);
            btnOk();
            btnNo();
        },
        Confirm: function(icon, msg, btntxt, callback) {
            GenerateHtml('confirm', icon, msg, btntxt);
            btnOk(callback);
            btnNo();
        }
    }
    //生成Html
    var GenerateHtml = function(type, icon, msg, btntxt) {
        var _html = '<div class="ztpopup ztpopup-' + icon + '"><div class="ztpopup-box"><a href="javascript:;" class="ztpopup-close" id="zt-close"><span class="icon-fail"></span></a>';
        _html += '<div class="ztpopup-ct"><span class="tipicon tipicon-' + icon + '"></span><p>' + msg + '</p></div><div class="ztpopup-btn">';

        if (type == 'alert') {
            _html += '<a class="btn" id="zt-ok" href="javascript:;">' + btntxt +'</a>';
        }
        if (type == 'confirm') {
            _html += '<a class="btn-sure" id="zt-ok" href="javascript:;">' + btntxt +'</a>';
            _html += '<a class="btn-cancel" id="zt-no" href="javascript:;">再看看</a>';
        }
        _html += '</div></div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('.ztpopup-box').outerWidth();
        var boxHeight = jQuery('.ztpopup-box').outerHeight();
        //让提示框居中
        jQuery('.ztpopup-box').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#zt-ok').on('click', function() {
            jQuery('.ztpopup').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#zt-no, #zt-close').on('click', function() {
            jQuery('.ztpopup').remove();
        });
    }
})();