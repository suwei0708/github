(function ($) {
    $.fn.timeCountDown = function(d, callback){
        this.each(function(){
            var $this = $(this);
            var o = {
                hm: $this.find(".hm"),
                sec: $this.find(".sec"),
                mini: $this.find(".mini"),
                hour: $this.find(".hour"),
                day: $this.find(".day"),
                month:$this.find(".month"),
                year: $this.find(".year"),
                end: 0
            };
            var f = {
                haomiao: function(n){
                    m = n.toString().slice(0, 2);
                    if(m < 10)return '0' + n.toString();
                    return m.toString();
                },
                zero: function(n){
                    var _n = parseInt(n, 10);//解析字符串,返回整数
                    if(_n > 0){
                        if(_n <= 9){
                            _n = "0" + _n
                        }
                        return String(_n);
                    }else{
                        return "00";
                    }
                },
                dv: function(){
                    //d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
                    var _d = $this.data("end") || d;
                    var now = new Date(),
                        endDate = new Date(_d);
                    //现在将来秒差值
                    //alert(future.getTimezoneOffset());
                    var dur = (endDate - now.getTime()) / 1000 , mss = endDate - now.getTime() ,pms = {
                        hm:"00",
                        sec: "00",
                        mini: "00",
                        hour: "00",
                        day: "00",
                        month: "00",
                        year: "0"
                    };
                    if(mss > 0){
                        pms.hm = f.haomiao(mss % 1000);
                        pms.sec = f.zero(dur % 60);
                        pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                        pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                        pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                        //月份，以实际平均每月秒数计算
                        pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                        //年份，按按回归年365天5时48分46秒算
                        pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
                    }
                    else {
                        pms.year=pms.month=pms.day=pms.hour=pms.mini=pms.sec=pms.hm="00";
                        o.end = 1;
                    }
                    return pms;
                },
                ui: function(){
                    if(o.hm){
                        var hm = f.dv().hm.split('');
                        o.hm.html('<span class="num-bg">' + hm[0] + '</span><span class="num-bg">' + hm[1] + '</span>');
                    }
                    if(o.sec){
                        var sec = f.dv().sec.split('');
                        o.sec.html('<span class="num-bg">' + sec[0] + '</span><span class="num-bg">' + sec[1] + '</span>');
                    }
                    if(o.mini){
                        var mini = f.dv().mini.split('');
                        o.mini.html('<span class="num-bg">' + mini[0] + '</span><span class="num-bg">' + mini[1] + '</span>');
                    }
                    if(o.hour){
                        var hour = f.dv().hour.split('');
                        o.hour.html('<span class="num-bg">' + hour[0] + '</span><span class="num-bg">' + hour[1] + '</span>');
                    }
                    if(o.day){
                        var day = f.dv().day.split('');
                        o.day.html('<span class="num-bg">' + day[0] + '</span><span class="num-bg">' + day[1] + '</span>');
                    }
                    if(o.month){
                        var month = f.dv().month.split('');
                        o.month.html('<span class="num-bg">' + month[0] + '</span><span class="num-bg">' + month[1] + '</span>');
                    }
                    if(o.year){
                        var year = f.dv().year.split('');
                        o.year.html('<span class="num-bg">' + year[0] + '</span><span class="num-bg">' + year[1] + '</span>');
                    }
                    if(o.end && typeof(callback) == 'function') {
                        callback();
                    }
                    if(!o.end) {
                        setTimeout(f.ui, 1);
                    }
                }
            };
            f.ui();
        });
    }
})(jQuery);