(function($) {
$(function() {
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

//时间显示
var DateUtil={dateToStr:function(formatStr,date){if(typeof arguments[0]=='undefined'){formatStr="yyyy-MM-dd HH:mm:ss";date=new Date();}else{if(typeof arguments[0]=='string'){formatStr=arguments[0];}else{formatStr="yyyy-MM-dd HH:mm:ss";date=arguments[0];}}
if(typeof arguments[1]=='undefined'){date=new Date();}else{if(typeof arguments[1]=='string'){formatStr=arguments[1];}else{date=arguments[1];}}
var str=formatStr;var Week=['日','一','二','三','四','五','六'];str=str.replace(/yyyy|YYYY/,date.getFullYear());str=str.replace(/yy|YY/,(date.getYear()%100)>9?(date.getYear()%100).toString():'0'+(date.getYear()%100));str=str.replace(/MM/,date.getMonth()>9?(date.getMonth()+1):'0'+(date.getMonth()+1));str=str.replace(/M/g,date.getMonth());str=str.replace(/w|W/g,Week[date.getDay()]);str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0'+date.getDate());str=str.replace(/d|D/g,date.getDate());str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0'+date.getHours());str=str.replace(/h|H/g,date.getHours());str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0'+date.getMinutes());str=str.replace(/m/g,date.getMinutes());str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0'+date.getSeconds());str=str.replace(/s|S/g,date.getSeconds());return str;},strToDate:function(dateStr){var data=dateStr;var reCat=/(\d{1,4})/gm;var t=data.match(reCat);t[1]=t[1]-1;eval('var d = new Date('+t.join(',')+');');return d;},getNowDateStr:function(){var date=new Date();var dateStr=this.dateToStr("yyyy-MM-dd",date);return dateStr;},getNowTimeStr:function(){var date=new Date();var dateStr=this.dateToStr("yyyy-MM-dd HH:mm:ss",date);return dateStr;},getWeek:function(date){date=arguments[0]||new Date();var a=['日','一','二','三','四','五','六'];var week=a[date.getDay()];return week;},addYear:function(date,addYears){var a=new Date();if(typeof date=="string"){a=new Date(Date.parse(date.replace(/-/g,"/")));}else{a=date;}
a.setFullYear(a.getFullYear()+addYears);return a;},addMonth:function(date,addMonths){var a=new Date();if(typeof date=="string"){a=new Date(Date.parse(date.replace(/-/g,"/")));}else{a=date;}
a.setMonth(a.getMonth()+addMonths);return a;},addDay:function(date,addDays){var a=new Date();if(typeof date=="string"){a=new Date(Date.parse(date.replace(/-/g,"/")));}else{a=date;}
a.setDate(a.getDate()+addDays);return a;}};