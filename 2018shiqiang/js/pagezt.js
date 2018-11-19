(function($) {
$(function() {
    /*
     * 首页
    */
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
        prizeIndex == prizeLen ? prizeIndex = 0 : prizeIndex++;
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


    // 参选
    $('.ztbtn-canxuan').on('click', function() {
        var cxStatus = rnd(0, 1); //随机生成0，1
        if(cxStatus == 0) {
            $('.ztbtn-canxuan').off('click');
            // 参选成功弹窗提示
            $.ztMsg.Alert('gou', '参与成功！开始为自己拉票吧~', '进入我的参赛主页', '个人拉票页.html#navlink');
            // 参选成功文字变化和增加链接
            $('.ztbtn-canxuan').html('我的主页<span class="zticon"></span>').removeClass('ztbtn-canxuan').attr('href', '个人拉票页.html#navlink');
            return false;
        }
        else {
            // 参选失败弹窗提示
            $.ztMsg.Confirm('tan', '需要 3 个或以上原创作品才能参加哟~', '去上传', 'http://www.zhisheji.com/zuopin/product/add/2/0');
        }
    });

    /*
     * 参选设计师
    */
    var voteNum = 3; //投票次数
    $('.list-election').on('click', '.ztbtn', function() {
        if(!$(this).hasClass('ztbtn-dis')) {
            if(voteNum == 0) {
                // 投票次数用完
                $.ztMsg.Alert('tan', '今天的投票数用完啦！明天再来哦~');
            }
            else {
                $(this).addClass('ztbtn-dis').html('投票成功');
                // 投票次数减1
                voteNum--;
                // 票数加1
                $(this).parents('li').find('.num').html(+$(this).parents('li').find('.num').html() + 1);
            }
        };
    });

    /*
     * 竞猜
    */
    // 点击竞猜
    var selectBox;  // 弹窗取消时保留变量
    $('.list-myelection').on('click', '.ztbtn', function() {
        selectBox = $(this);
        var imgSrc = selectBox.parents('li').find('img').attr('src');
        // 竞猜个数判断，由于分页需要后台判断，这里前端做个展示
        var guessNum = $('.list-myelection').find('.ztbtn-dis').length;;
        // 竞猜数已有10个,不能竞猜直接提示
        if(guessNum == 10) {
            $.ztMsg.Alert('tan', '竞猜人数已满足十位，请等待结果公布。');
            return false;
        }

        if(!$(this).hasClass('ztbtn-dis')) {
            // 竞猜列表竞猜成功
            $(this).addClass('ztbtn-dis').html('竞猜成功');

            // 底部浮窗增加dom
            var dom = '<img src="' + imgSrc + '" alt="" myid="' + selectBox.attr('myid') + '"><span class="icon-fail"></span>'
            $('.fixed-guess').find('.img').eq(guessNum).html(dom);
        }
        else {
            // 竞猜列表取消竞猜
            $(this).removeClass('ztbtn-dis').html('竞猜TA');

            // 判断myid相同，底部悬浮删除img
            $.each($('.fixed-guess .img'), function(i) {
                if($(this).find('img').attr('myid') == selectBox.attr('myid')) {
                    $(this).html('');
                    $(this).parents('.img-box').append($(this));
                }
            });

            // 竞猜选中为0,底部悬浮隐藏
            if(guessNum - 1 == 0) {
                $('.fixed-guess').hide();
            }
        };

        // 竞猜个数判断，由于分页需要后台判断，这里前端做个展示
        guessNum = $('.list-myelection').find('.ztbtn-dis').length;;
        $('.zt-election .tit').find('.num').html(guessNum);
        $('.fixed-guess').find('.num').html(guessNum);

        // 选中10个弹出确定弹窗
        if(guessNum == 10) {
            // 展示图像直接copy底部悬浮头像
            $('.ztpopup-guess').find('.img-box').html($('.fixed-guess').find('.img-box').html());
            // 弹出弹窗
            $('.ztpopup-guess').show();
            // 选中10个底部悬浮展示确定按钮
            $('.fixed-guess .fixed-guess-btn').show();
            // 提示框居中
            var _widht = document.documentElement.clientWidth; //屏幕宽
            var _height = document.documentElement.clientHeight; //屏幕高
            var boxWidth = $('.ztpopup-guess .ztpopup-box').outerWidth();
            var boxHeight = $('.ztpopup-guess .ztpopup-box').outerHeight();
            $('.ztpopup-guess .ztpopup-box').css({
                top: (_height - boxHeight) / 2 + 'px',
                left: (_widht - boxWidth) / 2 + 'px'
            });
        }
        // 选中1个显示底部浮窗
        else if(guessNum == 1) {
            $('.fixed-guess').show();
        }
        else {
            $('.fixed-guess .fixed-guess-btn').hide();
        }
    });

    // 竞猜10位确定
    $('body').on('click', '.ztpopup-guess .ztbtn-sure', function() {
        $.ztMsg.Alert('gou', '竞猜成功，请等待结果公布。');
        $('.ztpopup-guess').hide();
        $('.fixed-guess').hide();
    })
    // 竞猜10位取消
    .on('click', '.ztpopup-guess .ztbtn-cancel', function() {
        // 判断myid相同，竞猜列表取消选中
        selectBox.removeClass('ztbtn-dis').html('竞猜TA');
        // 底部悬浮删除img
        $('.fixed-guess').find('.img').last().html('');
        // 选中个数修改
        $('.zt-election .tit').find('.num').html('9');
        $('.fixed-guess').find('.num').html('9');
        // 竞猜弹窗隐藏
        $('.ztpopup-guess').hide();
        // 选中不为10,底部悬浮确定按钮隐藏
        $('.fixed-guess .fixed-guess-btn').hide();
    })
    // 底部悬浮竞猜取消
    .on('click', '.fixed-guess .icon-fail', function() {
        var _this = $(this);
        // 判断myid相同，列表取消选中
        $.each($('.list-myelection .ztbtn-dis'), function(i) {
            if($(this).attr('myid') == _this.parents('.img').find('img').attr('myid')) {
                $(this).removeClass('ztbtn-dis').html('竞猜TA');
            }
        });
        // 底部悬浮删除img
        _this.parents('.img-box').append(_this.parents('.img').html(''));
        // 选中个数修改
        var guessNum = $('.fixed-guess').find('.img img').length;
        $('.zt-election .tit').find('.num').html(guessNum);
        $('.fixed-guess').find('.num').html(guessNum);
        // 选中为0,底部悬浮隐藏
        if(guessNum == 0) {
            $('.fixed-guess').hide();
        }
        // 选中不为10,底部悬浮确定按钮隐藏
        $('.fixed-guess .fixed-guess-btn').hide();
    })
    // 底部悬浮竞猜确认
    .on('click', '.fixed-guess .ztbtn-sure', function() {
        $.ztMsg.Alert('gou', '竞猜成功，请等待结果公布。');
        $('.ztpopup-guess').hide();
        $('.fixed-guess').hide();
    });

    // 十强公布倒计时
    if($('#times').length) {
        var downcount = $('#times').data('downcount');
        $('#times').downCount({
            date: downcount
        });
    };

    /*
     * 个人拉票页
    */
    // 复制拉票链接
    $('#contents').css('opacity', 0);
    $('.vote-copy').on('click', function() {
        $('#contents').val('我正在参加2018年度十强设计师竞选，求支持~ ' + window.location.href);
        copyToClipboard();
        tipSave('suc', '复制成功');
    });

    // 个人拉票页通知滚动
    notices();
    function notices() {
        if($('.notices li').length <= 1) {
            return false;
        }
        //1文字轮播(2-5页中间)开始
        $('.notices li:eq(0)').clone(true).appendTo($('.notices ul'));//克隆第一个放到最后(实现无缝滚动)
        var liHeight = $('.notices').height();//一个li的高度
        //获取li的总高度再减去一个li的高度(再减一个Li是因为克隆了多出了一个Li的高度)
        var totalHeight = ($('.notices li').length *  $('.notices li').eq(0).height()) -liHeight;
        $('.notices ul').height(totalHeight);//给ul赋值高度
        var index = 0;
        var autoTimer = 0;//全局变量目的实现左右点击同步
        var clickEndFlag = true; //设置每张走完才能再点击
        function tab() {
            $('.notices ul').stop().animate({
                top: -index * liHeight
            }, 400, function() {
                clickEndFlag = true; //图片走完才会true
                if (index == $('.notices li').length - 1) {
                    $('.notices ul').css({
                        top: 0
                    });
                    index = 0;
                }
            })
        }
        function next() {
            index++;
            if(index > $('.notices li').length - 1) {//判断index为最后一个Li时index为0
                index = 0;
            }
            tab();
        }

        //自动轮播
        autoTimer = setInterval(next,3000);
        $('.notices a').hover(function(){
            clearInterval(autoTimer);
        },function() {
            autoTimer = setInterval(next,3000);
        })

        //鼠标放到左右方向时关闭定时器
        $('.notices').hover(function(){
            clearInterval(autoTimer);
        },function(){
            autoTimer = setInterval(next,3000);
        });
    }

    // 个人拉票页投票
    $('.vote-box').on('click', '.ztbtn', function() {
        if(!$(this).hasClass('ztbtn-dis')) {
            if(voteNum == 0) {
                // 投票次数用完
                $.ztMsg.Alert('tan', '今天的投票数用完啦！明天再来哦~');
            }
            else {
                $(this).addClass('ztbtn-dis').find('p').html('投票成功');
                // 投票次数减1
                voteNum--;
                // 票数加1
                $(this).parents('.zt-personal').find('.info .num').html(+$(this).parents('.zt-personal').find('.info .num').html() + 1);
                // TA的支持者增加头像和昵称
                var html = '<li>'
                               +'<a href="#" target="_blank"><img src="http://www.zhisheji.com/uc_server/data/avatar/000/14/64/10_avatar_middle.jpg" width="78" height="78" alt=""></a>'
                               +'<p><a href="#" target="_blank">新出炉小笼包</a></p>'
                           +'</li>';
                $('.supporter .list ul').find('li:last').remove();
                $('.supporter .list ul').prepend(html);
                // 滚动通知增加
                var html = '新增点击 刚刚给 狂奔的蜗牛 投了宝贵的一票';
                $('.notices ul').find('li').eq($('.notices').find('li').length - 2).html(html);
            }
        }
    });

    /*
     * 抽奖
    */
    // 我的奖品
    $('.ztbtn-myluckdraw').on('click', function() {
        $('.ztpopup-lucydraw').show();
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('.ztpopup-lucydraw .ztpopup-box').outerWidth();
        var boxHeight = jQuery('.ztpopup-lucydraw .ztpopup-box').outerHeight();
        //让提示框居中
        jQuery('.ztpopup-lucydraw .ztpopup-box').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    });
    // 获奖名单滚动
    if($('.zt-luckdraw-win').length) {
        $('.zt-luckdraw-win .list').myScroll({
            speed: 40, //数值越大，速度越慢
            rowHeight: 100, //li的高度
            number: 4 //每排滚动个数
        });
    };

    luck.init('luck');
    $('#luck-num').html(luck.num);
    $("#luck-btn").on('click', function(){
        // 每次抽取获得中奖位置
        // luck.prize = parseInt(Math.random() * 8);
        if(luck.num > 0) {
            // 抽奖次数大于0
            luck.num--;
            $('#luck-num').html(luck.num);
            luck.speed = 100;
            roll();
            return false;
        }
        else {
            // 抽奖次数用完
            $.ztMsg.Alert('tan', '抽奖次数用完啦，去竞猜十强赢奖品吧~', '竞猜十强', '竞猜.html#navlink');
        }
    });
});
})(jQuery);

// alert和confirm美化，调用方法
// icon根据提示符号显示，有gou(勾),tan(叹号),zan(赞),liwu(礼物); msg为提示信息，btntxt为按钮文字，不填无按钮
// $.ztMsg.Alert('icon', 'msg', 'btntxt', 'btnlink');
// $.ztMsg.Confirm('icon', 'msg', 'btntxt', 'btnlink', func);
(function() {
    jQuery.ztMsg = {
        Alert: function(icon, msg, btntxt, btnlink, callback) {
            GenerateHtml('alert', icon, msg, btntxt, btnlink);
            btnOk(callback);
            btnNo();
        },
        Confirm: function(icon, msg, btntxt, btnlink, callback) {
            GenerateHtml('confirm', icon, msg, btntxt, btnlink);
            btnOk(callback);
            btnNo();
        }
    }
    //生成Html
    var GenerateHtml = function(type, icon, msg, btntxt, btnlink) {
        var _html = '<div id="ztpopup" class="ztpopup ztpopup-' + icon + '"><div id="ztpopup-box" class="ztpopup-box"><a href="javascript:;" class="ztpopup-close" id="zt-close"><span class="icon-fail"></span></a>';
        _html += '<div class="ztpopup-ct"><span class="tipicon tipicon-' + icon + '"></span><p>' + msg + '</p></div>';
        if(!btnlink) {
            btnlink = 'javascript:;'
        }
        if(!btntxt) {
            btntxt = '确定'
        }
        else {
            if (type == 'alert') {
                _html += '<div class="ztpopup-btn"><a class="ztbtn" id="zt-ok" href="' + btnlink + '">' + btntxt +'</a></div>';
            }
            else if (type == 'confirm') {
                _html += '<div class="ztpopup-btn"><a class="ztbtn-sure" id="zt-ok" href="' + btnlink + '">' + btntxt +'</a>';
                _html += '<a class="ztbtn-cancel" id="zt-no" href="javascript:;">再看看</a></div>';
            }
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('#ztpopup-box').outerWidth();
        var boxHeight = jQuery('#ztpopup-box').outerHeight();
        //让提示框居中
        jQuery('#ztpopup-box').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#zt-ok').on('click', function() {
            jQuery('#ztpopup').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#zt-no, #zt-close').on('click', function() {
            jQuery('#ztpopup').remove();
        });
    }
})();

// 抽奖js
var luck = {
    index: -1,   // 当前转动到哪个位置，起点位置
    count: 8,    // 总共有多少个位置
    timer: 0,    // setTimeout的ID，用clearTimeout清除
    speed: 20,   // 初始转动速度
    times: 10,    // 转动次数
    cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    num: 3,      // 抽奖次数
    prize: 1,   //中奖位置
    prizeData: [
        {
            name: '美工云VIP1年',
            icon: 'liwu',
            msg: '恭喜！抽中美工云享 1 年VIP体验卡！<br />兑换码：****************',
            btntxt: '立即使用',
            btnlink: '',
            func: null
        },
        {
            icon: 'tan',
            msg: '很遗憾，没有抽中，再试一次吧！',
            btntxt: '再试一次',
            func: null
        },
        {
            name: '巧匠课堂VIP1年',
            icon: 'liwu',
            msg: '恭喜！抽中巧匠课堂VIP 1年体验卡！<br />兑换码：****************',
            btntxt: '立即使用',
            btnlink: 'https://www.qiaojiang.tv/rh',
            func: null
        },
        {
            name: '致设计笔记本+鼠标垫',
            icon: 'zan',
            msg: '恭喜！抽中致设计笔记本+鼠标垫，可到我的奖品查看。',
            btntxt: '查看我的奖品',
            func: function() {
                $('.ztbtn-myluckdraw').trigger('click');
            }
        },
        {
            icon: 'tan',
            msg: '很遗憾，没有抽中，再试一次吧！',
            btntxt: '再试一次',
            func: null
        },
        {
            name: '万素网VIP1年',
            icon: 'liwu',
            msg: '恭喜！抽中万素网VIP 1年体验卡！<br />兑换码：****************',
            btntxt: '立即使用',
            btnlink: '',
            func: null
        },
        {
            name: '模库网VIP1年',
            icon: 'liwu',
            msg: '恭喜！抽中模库网VIP 1年体验卡！<br />兑换码：****************',
            btntxt: '立即使用',
            btnlink: 'http://51mockup.com/plugin.php?id=dc_vip&action=key',
            func: null
        },
        {
            name: '致设计公仔U盘',
            icon: 'zan',
            msg: '恭喜！抽中致设计公仔U盘！可到我的奖品查看。',
            btntxt: '查看我的奖品',
            func: function() {
                $('.ztbtn-myluckdraw').trigger('click');
            }
        },

    ],
    init:function(id){
        if ($('#'+id).find('.luck-unit').length > 0) {
            $luck = $('#'+id);
            $units = $luck.find('.luck-unit');
            this.obj = $luck;
            this.count = $units.length;
            $luck.find('.luck-unit-'+this.index).addClass('active');
        };
    },

    roll:function(){
        var index = this.index;
        var count = this.count;
        var luck = this.obj;
        $(luck).find('.luck-unit-'+index).removeClass('active');
        index += 1;
        if (index > count) {
            index = 0;
        };
        $(luck).find('.luck-unit-' + index).addClass('active');
        this.index = index;
        return false;
    },
    stop:function(index){
        // this.prize = index;
        return false;
    }
};

function roll(){
    luck.times += 1;
    luck.roll();
    if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
        clearTimeout(luck.timer);
        luck.times = 0;
        // 中奖弹出窗
        $.ztMsg.Alert(luck.prizeData[luck.prize].icon, luck.prizeData[luck.prize].msg, luck.prizeData[luck.prize].btntxt, luck.prizeData[luck.prize].btnlink, luck.prizeData[luck.prize].func);
        // 实时中奖信息更新
        if(luck.prizeData[luck.prize].name) {
            var html = '<li><a href="#" target="_blank" class="fll">'
                            + '<img src="http://www.zhisheji.com/uc_server/data/avatar/000/14/64/10_avatar_middle.jpg" width="52" height="52" alt="">'
                        + '</a>'
                        + '<p class="name"><a href="#" target="_blank">刚出炉小笼包</a></p>'
                        + '<p>获得了<span>' + luck.prizeData[luck.prize].name + '</span></p></li>'
            $.each($('.zt-luckdraw-win .list').find('ul'), function(i) {
                $(this).prepend(html).find('li').last().remove();
            });
        }
    }
    else {
        if (luck.times < luck.cycle) {
            luck.speed -= 10;
        }else if(luck.times == luck.cycle) {
            var index = Math.random()*(luck.count)|0;
            // luck.prize = index;
        }else{
            if(luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
                luck.speed += 110;
            }else {
                luck.speed += 20;
            }
        }
        if (luck.speed < 40) {
            luck.speed = 40;
        };

        luck.timer = setTimeout(roll,luck.speed);
    }
    return false;
}

// 悬浮滚动
function showFixNav() {
    if($(window).scrollTop() > $('#scroll0').offset().top - 82) {
        $('.fixed-nav').show();
    }
    else {
        $('.fixed-nav').hide();
    };

    $.each($('.fixed-nav').find('li'), function(i) {
        if(i >= $('.fixed-nav').find('li').length - 1) {
            return false;
        }
        if($(window).scrollTop() >= $('#scroll' + i).offset().top) {
            $(this).addClass('cur').siblings().removeClass('cur');
        }
    });
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

            container.find('.num-bg:eq(0)').html(days.slice(days.length-2,days.length-1));
            container.find('.num-bg:eq(1)').html(days.slice(days.length-1,days.length));
            container.find('.num-bg:eq(2)').html(hours.slice(hours.length-2,hours.length-1));
            container.find('.num-bg:eq(3)').html(hours.slice(hours.length-1,hours.length));
            container.find('.num-bg:eq(4)').html(minutes.slice(minutes.length-2,minutes.length-1));
            container.find('.num-bg:eq(5)').html(minutes.slice(minutes.length-1,minutes.length));
            container.find('.num-bg:eq(6)').html(seconds.slice(seconds.length-2,seconds.length-1));
            container.find('.num-bg:eq(7)').html(seconds.slice(seconds.length-1,seconds.length));
        };
        // start
        var interval = setInterval(countdown, 1000);
    };
})(jQuery);

// 无缝滚动插件
(function($) {
   $.fn.myScroll = function(options) {
        //默认配置
        var defaults = {
            speed: 40, //滚动速度,值越大速度越慢
            rowHeight: 24, //每行的高度,
            number: 1 //滚动每排个数
        };
        var opts = $.extend({}, defaults, options),
            intId = [];
        if($(this).find('ul').height() <= $(this).height()) {return false;}
        $(this).append($(this).find('ul').clone()).wrapInner('<div class="sw-scroll"></div>');
        function marquee(obj, step, num) {
            obj.find('.sw-scroll').animate({
                marginTop: '-=1'
            }, 0, function() {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                var end = Math.ceil(obj.find('ul:eq(0) li').length / num) * step;
                if (s >= end) {
                    $(this).find('ul').eq(0).appendTo(obj.find('.sw-scroll'));
                    $(this).css('margin-top', 0);
                }
            });
        }
        this.each(function(i) {
            var sh = opts["rowHeight"],
                speed = opts["speed"],
                _this = $(this),
                num = opts["number"];
            intId[i] = setInterval(function() {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh, num);
                }
            }, speed);
            _this.hover(function() {
                clearInterval(intId[i]);
            }, function() {
                intId[i] = setInterval(function() {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh, num);
                    }
                }, speed);
            });
        });
    }
})(jQuery);