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

    // 大赛评委自定义class
    if($('.zt-judges').length) {
        $('.zt-judges').find('.list li:gt(3)').find('.bgs').addClass('bgs2');
    }

    // 合作机构自定义class
    if($('.zt-cooperation').length) {
        $('.zt-cooperation').find('.list li:nth-child(3n)').addClass('li3');
        $('.zt-cooperation').find('.list li:nth-child(3n-1)').addClass('li2');
        $('.zt-cooperation').find('.list li:nth-child(3n-2)').addClass('li1 mt0');
        $('.zt-cooperation').find('.list li:eq(0)').removeClass('mt0')
    }

    // 弹窗
    if($('.ztpopup').length) {
        // 弹窗居中
        $('.ztpopup').css({'opacity': 0, 'display': 'block'});
        $.each($('.ztpopup'), function(i) {
            var _this = $(this);
            ztCenterObj(_this);
        });
        $('.ztpopup').css({'opacity': 1, 'display': 'none'});
    };
    // 点击关闭弹窗
    $('body').on('click', '.ztpopup-close', function() {
        $(this).parents('.ztpopup').hide();
    });
    // 点击弹窗确定按钮
    $('body').on('click', '.ztpopup-btn a', function() {
        $(this).parents('.ztpopup').hide();
    });

    // 立即参选
    $('.top-img2').on('click', '.btn', function() {
        // 参选成功
        // $('.ztpopup-election-suc').show();
        // 作品不够
        //$('.ztpopup-election-fail').show();
        var formhash = $('#formhash').val();
        var url = 'plugin.php?id=zsj_ten2017:ajax&formhash='+formhash;
        $.ajax({
            url: url,
            type: "POST",

            //dataType: "json",
            error: function(){
                alert('Error loading XML document');
            },
            success: function(data,status){

                if(data=='1001'){
                    $('.ztpopup-election-suc').show();
                }else if(data=='1003'){
                    showlogin();
                }else if(data=='1002'){
                }else{
                    $('.ztpopup-election-fail').show();
                }

            }
        });
    });

    // 剩余投票次数voteNum
    var voteNum = $('#countday').val();
    voteNum = 10 - voteNum;
    // 参选设计师列表投票
    $('.list-election').on('click', '.btn', function() {
        var uid = $(this).attr('data-id');
        var formhash = $('#formhash').val();
        if(!$(this).hasClass('btn-dis')) {
            if(voteNum == 0) {
                // 投票次数用完
                $('.ztpopup-vote').attr('class', 'ztpopup ztpopup-result ztpopup-result-over').find('p').html('今日投票次数已用完');
                $('.ztpopup-result-over').find('.ztpopup-btn a').html('确 定');
                $('.ztpopup-result-over').show();
            }
            else {
                var curobj= $(this) ;
                $.ajax({
                   url: 'plugin.php?id=zsj_ten2017:support&formhash='+formhash,
                   type: "POST",
                   data: {uid:uid},
                   dataType: "json",
                   error: function(){
                       alert('Error loading XML document');
                   },
                   success: function(data,status){
                       if(data.status==1){
                           curobj.addClass('btn-dis');
                         // 投票次数减1
                         voteNum--;
                         $('.ztpopup-vote').find('.num').html(voteNum);
                         // 票数加1
                         curobj.parents('li').find('.num').html(+curobj.parents('li').find('.num').html() + 1);
                         $('.ztpopup-vote').show();
                       } else if(data.status==2001){
                           $('.popup-login').show();centerObj('.popup-login .popup');
                       }
                   }
                });


            }
        };
    });

    // 个人拉票页投票
    $('.vote-btn').on('click', function() {
        if(!$(this).hasClass('vote-btn-dis')) {
            if(voteNum == 0) {
                // 投票次数用完
                $('.ztpopup-vote').attr('class', 'ztpopup ztpopup-result ztpopup-result-over').find('p').html('今日投票次数已用完');
                $('.ztpopup-result-over').find('.ztpopup-btn a').html('确 定');
                $('.ztpopup-result-over').show();
            }
            else {

                var curobj= $(this) ;
                var uid = $('#uid').val();
                var supportuid = $('#supportuid').val();
                var supportname = $('#supportname').val();
                var formhash = $('#formhash').val();
                $.ajax({
                   url: 'plugin.php?id=zsj_ten2017:support&formhash='+formhash,
                   type: "POST",
                   data: {uid:uid},
                   dataType: "json",
                   error: function(){
                       alert('Error loading XML document');
                   },
                   success: function(data,status){
                       if(data.status==1){
                           curobj.addClass('vote-btn-dis');
                         // 投票次数减1
                         voteNum--;
                         $('.ztpopup-vote').find('.num').html(voteNum);
                         // 票数加1

                         curobj.parents('.zt-personal').find('.info .num').html(+curobj.parents('.zt-personal').find('.info .num').html() + 1);

                         // TA的支持者增加头像和昵称
                        var html = '<li>'
                                       +'<a href="space-uid-'+supportuid+'.html"><img src="uc_server/avatar.php?uid='+supportuid+'&size=middle" width="66" height="66" alt=""></a>'
                                       +'<p><a href="space-uid-'+supportuid+'.html">'+supportname+'</a></p>'
                                   +'</li>';
                        $('.supporter .list ul').find('li:last').remove();
                        $('.supporter .list ul').prepend(html);
                         $('.ztpopup-vote').show();
                       } else if(data.status==2001){
                           $('.popup-login').show();centerObj('.popup-login .popup');
                       }
                   }
                });
            }
        }
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
    // 复制拉票链接
    $('#contents').css('opacity', 0);
    $('.vote-copy').on('click', function() {
        $('#contents').val('我正在参加2017年度十强设计师竞选，求支持~ ' + window.location.href);
        copyToClipboard();
        $.msgBox.Alert(null, '复制成功!');
    });

    // 我的奖品
    $('.rotateTimes').on('click', '.btn', function() {
        $('.ztpopup-myprize').show();
        $('.ztpopup-myprize .list').scrollUnique();
    });

    // 点击分享
    $('body').on('click', '.ztpopup-btn .btn-share', function() {
        var formhash = $('#formhash').val();
        var url = 'plugin.php?id=zsj_ten2017:ajaxshare&formhash='+formhash;
        //这里点击分享会再获得一次抽奖机会
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            error: function(){
                alert('Error loading XML document');
            },
            success: function(data,status){
                if(data.status=='1001'){
                    $('#qzone')[0].click();
                }
            }
        });
    });

    // 抽奖
    var bRotate = false;
    var rotateFn = function(awards, angles, txt, yhm) {
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function() {
                // 抽奖结果展示
                var btnLink = 'javascript:;';
                var btnText = '再来一次&gt;';
                var target = '_top';
                if(awards == 0) {
                    var btnText = '再来一次&gt;';
                    var target = '_top';
                    var yhms = '别灰心，换姿势再来一次！'
                }
                else {
                    var btnText = '立即使用&gt;';
                    var target = '_blank';
                }
                if(awards == 1 || awards == 2) {
                    var btnLink = 'http://www.qiaojiang.tv/jiangquan';
                }
                if(awards == 3 || awards == 4) {
                    var btnLink = 'http://crm2.qq.com/page/portalpage/wpa.php?uin=800800282&ty=1';
                }
                if(awards == 5) {
                    var btnLink = 'http://wpa.qq.com/msgrd?v=3&uin=3919011&site=qq&menu=yes';
                }
                $('.ztpopup-result').attr('class', 'ztpopup ztpopup-result ztpopup-result' + awards);
                $('.ztpopup-result').find('.ztpopup-ct p').html(txt);
                if(yhm) {
                    $('.ztpopup-result').find('.ztpopup-ct .info').html('优惠码：<span>' + yhm + '</span>');
                    if(awards == 3 || awards == 4) {
                        $('.ztpopup-result').find('.ztpopup-ct .info').append('<br>截图本界面给码工助手客服即可');
                    }
                }
                else {
                    $('.ztpopup-result').find('.ztpopup-ct .info').html(yhms);
                };
                $('.ztpopup-result').find('.ztpopup-btn a').attr({'href': btnLink, 'class': 'ztico', 'target': target}).html(btnText);
                $('.ztpopup-result').show();
                ztCenterObj('.ztpopup-result');
                bRotate = !bRotate;
            }
        })
    };
    // 网络超时执行函数 rotateTimeOut()
    var rotateTimeOut = function() {
        $('#rotate').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function() {
                $.msgBox.Alert(null, '网络超时，请检查您的网络设置！');
            }
        });
    };
    // 剩余次数bRotateTimes
    var bRotateTimes = $('.rotateTimes .num').text() || 0;

    $('.pointer').on('click', function() {
        if (bRotate) return;
        // 判断抽奖次数用完
        if(bRotateTimes <= 0) {
            $('.ztpopup-result').attr('class', 'ztpopup ztpopup-result ztpopup-result-over');
            $('.ztpopup-result').find('.ztpopup-ct p').html('抽奖次数用完了');
            $('.ztpopup-result').find('.ztpopup-ct .info').html('分享到QQ群即可增加一次抽奖机会<br><i style="font-size: 14px;">提示：如果点击分享无效，注意是否浏览器屏蔽弹窗</i>');
            $('.ztpopup-result').find('.ztpopup-btn a').attr({'href': 'javascript:;', 'class': 'ztico btn-share', 'target': '_top'}).html('点击分享&gt;');
            $('.ztpopup-result').show();
            ztCenterObj('.ztpopup-result');
            return false;
        }
        // 抽奖结果 现随机item 可用ajax请求，邀请码需ajax结果返回
        var item = rnd(0, 3);

        var formhash = $('#formhash').val();
        var url = 'plugin.php?id=zsj_ten2017:ajaxjiangp&formhash='+formhash;
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            error: function(){
                alert('Error loading XML document');
            },
            success: function(data,status){
                if(data.status=='1001'){
                    bRotateTimes--;
                    $('.rotateTimes .num').text(bRotateTimes)
                    switch (data.item) {
                        case 0:
                            rotateFn(0, 0, '谢谢参与');
                            break;
                        case 1:
                            rotateFn(1, 60, '巧匠课堂VIP 3折优惠券', data.code);
                            break;
                        case 2:
                            rotateFn(2, 240, '巧匠课堂VIP 5折优惠券', data.code);
                            break;
                        case 3:
                            rotateFn(3, 300, '码工助手VIP 3折优惠券', data.code);
                            break;
                        case 4:
                            rotateFn(4, 120, '码工助手VIP 5折优惠券', data.code);
                            break;
                        case 5:
                            rotateFn(5, 180, '美工云VIP 3折优惠券', data.code);
                            break;
                    }
                }
                else if(data=='1003') {
                    $('.popup-login').show();centerObj('.popup-login .popup');
                }
            }
        });
    });

    // 获奖名单滚动
    if($('.zt-luckdraw').length) {
        $('.zt-luckdraw .win .list').myScroll({
            speed: 40, //数值越大，速度越慢
            rowHeight: 89, //li的高度
            number: 3 //每排滚动个数
        });
    }

    // 竞赛保存地址
    /*$('.zt-guess').on('click', '.info .btn', function() {
        $('.ztpopup-save').show();

        return false;
    });*/

    // 十强公布倒计时
    if($('#times').length) {
        var downcount = $('#times').data('downcount');
        $('#times').downCount({
            date: downcount
        });
    };

    // 点击竞猜
    $('.list-myelection').on('click', '.btn', function() {
        if(!$(this).hasClass('btn-dis')) {
            $(this).addClass('btn-dis');
            // 竞猜个数判断，由于分页需要后台判断，这里前端做个展示
            var guessNum = $('.list-myelection').find('.btn-dis').length;
            var jcuids = '';
            $('.list-myelection').find('.btn-dis').each(function(){
            	jcuids+=$(this).data('id')+',';
            })

            $('.zt-election .tit').find('.num').html(guessNum);
            $('.ztpopup-guess-select').show().find('.ztpopup-ct p').html('竞猜成功');
            // 选中10个判断为成功，点击关闭按钮跳转到成功页面

            if(guessNum == 10) {
            	//这里Ajax存储数据到数据库
            	var formhash = $('#formhash').val();
                var url = 'plugin.php?id=zsj_ten2017:ajaxjc&formhash='+formhash+'&jcuids='+jcuids;
                $.ajax({
                    url: url,
                    type: "POST",

                    //dataType: "json",
                    error: function(){
                        alert('Error loading XML document');
                    },
                    success: function(data,status){

                        if(data=='1001'){
                        	$('.ztpopup-guess').show();
                            $('.ztpopup-guess').on('click', '.ztpopup-close', function (){
                                window.location.href = 'plugin.php?id=zsj_ten2017:jingc#navlink';
                            });
                        }else if(data=='1003'){
                            showlogin();
                        }

                    }
                });
            }
        }
        else {
            if($(this).parents('.list').hasClass('list-myelection')) {return false};
            $(this).removeClass('btn-dis');
            // 竞猜个数判断，由于分页需要后台判断，这里前端做个展示
            var guessNum = $('.list-myelection').find('.btn-dis').length;
            $('.zt-election .tit').find('.num').html(guessNum);
            $('.ztpopup-guess-select').show().find('.ztpopup-ct p').html('取消竞猜成功');
        };
    });

    // 结果公布样式控制
    $('.zt-guess').find('.list2 li:odd').addClass('r');
});
})(jQuery);

function showsavesuccess(){
     jQuery('.ztpopup-save').show();
}

function showlogin(){
     jQuery('.popup-login').show();parent.centerObj('.popup-login .popup');
}


function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
};

function copyToClipboard(){
    var e=document.getElementById('contents');//对象是contents
    e.select(); //选择对象
    document.execCommand('Copy'); //执行浏览器复制命令
}

function ztCenterObj(obj) {
    jQuery(obj).find('.ztpopup-box').css('margin-top', -jQuery(obj).find('.ztpopup-box').height() / 2)
}

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