(function($) {
$(function() {
    // 轮播图banner
    if($('#sld-banner').length) {
        $('#sld-banner').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            effect: 'fade'
        });
    };
    // 出版轮播图1
    if($('#cb-sld1').length) {
        $('#cb-sld1').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };
    // 出版轮播图2
    if($('#cb-sld2').length) {
        $('#cb-sld2').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };

    // 湘版好书榜
    $('.cb-hsb').on('hover', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    // tab切换
    $('.tab-tit').on('hover', 'a', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.cb-tab').find('.cb-list').addClass('hide').eq($(this).index()).removeClass('hide');
        $(this).parents('.yl-tab').find('.list').addClass('hide').eq($(this).index()).removeClass('hide');
    });

    // 无缝滚动
    if($('.myscroll').length) {
        $('.myscroll').myScroll({
            speed: 50, //数值越大，速度越慢
            rowHeight: 72 //li的高度
        });
    };

    /*
     * 体育频道
    */
    // 体育轮播图1
    if($('#ty-sld1').length) {
        $('#ty-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };

    /*
     * 娱乐频道
    */
    // 娱乐轮播图1
    if($('#yl-sld1').length) {
        $('#yl-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };

    /*
     * 文化频道
    */
    // 时间显示
    if($('#wh-time').length) {
        getTimes();
        setInterval(getTimes, 1000);
        function getTimes() {
            var times = DateUtil.dateToStr("yyyy-MM-dd HH:mm:ss", new Date()) + ' 星期' + DateUtil.getWeek(new Date());
            $('#wh-time').html(times);
        }
    };

    // 文化轮播图1
    if($('#wh-sld1').length) {
        $('#wh-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };

    // 文化轮播图2
    if($('#wh-sld2').length) {
        $('#wh-sld2').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    };

});
})(jQuery);

// 无缝滚动js
jQuery.fn.myScroll = function(options) {
    //默认配置
    var defaults = {
        speed: 40, //滚动速度,值越大速度越慢
        rowHeight: 24 //每行的高度
    };
    var opts = jQuery.extend({}, defaults, options),
        intId = [];

    function marquee(obj, step) {

        obj.find("ul").animate({
            marginTop: '-=1'
        }, 0, function() {
            var s = Math.abs(parseInt(jQuery(this).css("margin-top")));
            if (s >= step) {
                jQuery(this).find("li").slice(0, 1).appendTo(jQuery(this));
                jQuery(this).css("margin-top", 0);
            }
        });
    }

    this.each(function(i) {
        var sh = opts["rowHeight"],
            speed = opts["speed"],
            _this = jQuery(this);
        intId[i] = setInterval(function() {
            if (_this.find("ul").height() <= _this.height()) {
                clearInterval(intId[i]);
            } else {
                marquee(_this, sh);
            }
        }, speed);

        _this.hover(function() {
            clearInterval(intId[i]);
        }, function() {
            intId[i] = setInterval(function() {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);
        });
    });
}

//时间显示
var DateUtil={dateToStr:function(formatStr,date){if(typeof arguments[0]=='undefined'){formatStr="yyyy-MM-dd HH:mm:ss";date=new Date();}else{if(typeof arguments[0]=='string'){formatStr=arguments[0];}else{formatStr="yyyy-MM-dd HH:mm:ss";date=arguments[0];}}
if(typeof arguments[1]=='undefined'){date=new Date();}else{if(typeof arguments[1]=='string'){formatStr=arguments[1];}else{date=arguments[1];}}
var str=formatStr;var Week=['日','一','二','三','四','五','六'];str=str.replace(/yyyy|YYYY/,date.getFullYear());str=str.replace(/yy|YY/,(date.getYear()%100)>9?(date.getYear()%100).toString():'0'+(date.getYear()%100));str=str.replace(/MM/,date.getMonth()>9?(date.getMonth()+1):'0'+(date.getMonth()+1));str=str.replace(/M/g,date.getMonth());str=str.replace(/w|W/g,Week[date.getDay()]);str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0'+date.getDate());str=str.replace(/d|D/g,date.getDate());str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0'+date.getHours());str=str.replace(/h|H/g,date.getHours());str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0'+date.getMinutes());str=str.replace(/m/g,date.getMinutes());str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0'+date.getSeconds());str=str.replace(/s|S/g,date.getSeconds());return str;},strToDate:function(dateStr){var data=dateStr;var reCat=/(\d{1,4})/gm;var t=data.match(reCat);t[1]=t[1]-1;eval('var d = new Date('+t.join(',')+');');return d;},getNowDateStr:function(){var date=new Date();var dateStr=this.dateToStr("yyyy-MM-dd",date);return dateStr;},getNowTimeStr:function(){var date=new Date();var dateStr=this.dateToStr("yyyy-MM-dd HH:mm:ss",date);return dateStr;},getWeek:function(date){date=arguments[0]||new Date();var a=['日','一','二','三','四','五','六'];var week=a[date.getDay()];return week;},addYear:function(date,addYears){var a=new Date();if(typeof date=="string"){a=new Date(Date.parse(date.replace(/-/g,"/")));}else{a=date;}
a.setFullYear(a.getFullYear()+addYears);return a;},addMonth:function(date,addMonths){var a=new Date();if(typeof date=="string"){a=new Date(Date.parse(date.replace(/-/g,"/")));}else{a=date;}
a.setMonth(a.getMonth()+addMonths);return a;},addDay:function(date,addDays){var a=new Date();if(typeof date=="string"){a=new Date(Date.parse(date.replace(/-/g,"/")));}else{a=date;}
a.setDate(a.getDate()+addDays);return a;}};