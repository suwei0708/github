(function($) {
$(function() {
    // ����ʱ��
    var nowDate = new Date();
    var year = nowDate.getFullYear(); //�õ����
    var month = nowDate.getMonth() + 1;//�õ��·�
    month = month < 10 ? '0' + month : month;
    var date = nowDate.getDate();//�õ�����
    date = date < 10 ? '0' + date : date;
    var today = year + '' + month + '' + date;
    $.each($('.zt-times .list li'), function(i) {
        if(today == $(this).data('time') || (today >= $(this).data('start') && today <= $(this).data('end'))) {
            $(this).addClass('cur');
        }
    });

    // ������ί�Զ���class
    if($('.zt-judges').length) {
        $('.zt-judges').find('.list li:gt(3)').find('.bgs').addClass('bgs2');
    }

    // ���������Զ���class
    if($('.zt-cooperation').length) {
        $('.zt-cooperation').find('.list li:nth-child(3n)').addClass('li3');
        $('.zt-cooperation').find('.list li:nth-child(3n-1)').addClass('li2');
        $('.zt-cooperation').find('.list li:nth-child(3n-2)').addClass('li1 mt0');
        $('.zt-cooperation').find('.list li:eq(0)').removeClass('mt0')
    }

    // ����
    if($('.ztpopup').length) {
        // ��������
        $('.ztpopup').css({'opacity': 0, 'display': 'block'});
        $.each($('.ztpopup'), function(i) {
            var _this = $(this);
            ztCenterObj(_this);
        });
        $('.ztpopup').css({'opacity': 1, 'display': 'none'});
    };
    // ����رյ���
    $('body').on('click', '.ztpopup-close', function() {
        $(this).parents('.ztpopup').hide();
    });
    // �������ȷ����ť
    $('body').on('click', '.ztpopup-btn a', function() {
        $(this).parents('.ztpopup').hide();
    });

    // ������ѡ
    $('.top-img2').on('click', '.btn', function() {
        // ��ѡ�ɹ�
        // $('.ztpopup-election-suc').show();
        // ��Ʒ����
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

    // ʣ��ͶƱ����voteNum
    var voteNum = $('#countday').val();
    voteNum = 10 - voteNum;
    // ��ѡ���ʦ�б�ͶƱ
    $('.list-election').on('click', '.btn', function() {
        var uid = $(this).attr('data-id');
        var formhash = $('#formhash').val();
        if(!$(this).hasClass('btn-dis')) {
            if(voteNum == 0) {
                // ͶƱ��������
                $('.ztpopup-vote').attr('class', 'ztpopup ztpopup-result ztpopup-result-over').find('p').html('����ͶƱ����������');
                $('.ztpopup-result-over').find('.ztpopup-btn a').html('ȷ ��');
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
                         // ͶƱ������1
                         voteNum--;
                         $('.ztpopup-vote').find('.num').html(voteNum);
                         // Ʊ����1
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

    // ������ƱҳͶƱ
    $('.vote-btn').on('click', function() {
        if(!$(this).hasClass('vote-btn-dis')) {
            if(voteNum == 0) {
                // ͶƱ��������
                $('.ztpopup-vote').attr('class', 'ztpopup ztpopup-result ztpopup-result-over').find('p').html('����ͶƱ����������');
                $('.ztpopup-result-over').find('.ztpopup-btn a').html('ȷ ��');
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
                         // ͶƱ������1
                         voteNum--;
                         $('.ztpopup-vote').find('.num').html(voteNum);
                         // Ʊ����1

                         curobj.parents('.zt-personal').find('.info .num').html(+curobj.parents('.zt-personal').find('.info .num').html() + 1);

                         // TA��֧��������ͷ����ǳ�
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

    // ������Ʊҳ֪ͨ����
    notices();
    function notices() {
        if($('.notices li').length <= 1) {
            return false;
        }
        //1�����ֲ�(2-5ҳ�м�)��ʼ
        $('.notices li:eq(0)').clone(true).appendTo($('.notices ul'));//��¡��һ���ŵ����(ʵ���޷����)
        var liHeight = $('.notices').height();//һ��li�ĸ߶�
        //��ȡli���ܸ߶��ټ�ȥһ��li�ĸ߶�(�ټ�һ��Li����Ϊ��¡�˶����һ��Li�ĸ߶�)
        var totalHeight = ($('.notices li').length *  $('.notices li').eq(0).height()) -liHeight;
        $('.notices ul').height(totalHeight);//��ul��ֵ�߶�
        var index = 0;
        var autoTimer = 0;//ȫ�ֱ���Ŀ��ʵ�����ҵ��ͬ��
        var clickEndFlag = true; //����ÿ����������ٵ��
        function tab() {
            $('.notices ul').stop().animate({
                top: -index * liHeight
            }, 400, function() {
                clickEndFlag = true; //ͼƬ����Ż�true
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
            if(index > $('.notices li').length - 1) {//�ж�indexΪ���һ��LiʱindexΪ0
                index = 0;
            }
            tab();
        }

        //�Զ��ֲ�
        autoTimer = setInterval(next,3000);
        $('.notices a').hover(function(){
            clearInterval(autoTimer);
        },function() {
            autoTimer = setInterval(next,3000);
        })

        //���ŵ����ҷ���ʱ�رն�ʱ��
        $('.notices').hover(function(){
            clearInterval(autoTimer);
        },function(){
            autoTimer = setInterval(next,3000);
        });
    }
    // ������Ʊ����
    $('#contents').css('opacity', 0);
    $('.vote-copy').on('click', function() {
        $('#contents').val('�����ڲμ�2017���ʮǿ���ʦ��ѡ����֧��~ ' + window.location.href);
        copyToClipboard();
        $.msgBox.Alert(null, '���Ƴɹ�!');
    });

    // �ҵĽ�Ʒ
    $('.rotateTimes').on('click', '.btn', function() {
        $('.ztpopup-myprize').show();
        $('.ztpopup-myprize .list').scrollUnique();
    });

    // �������
    $('body').on('click', '.ztpopup-btn .btn-share', function() {
        var formhash = $('#formhash').val();
        var url = 'plugin.php?id=zsj_ten2017:ajaxshare&formhash='+formhash;
        //������������ٻ��һ�γ齱����
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

    // �齱
    var bRotate = false;
    var rotateFn = function(awards, angles, txt, yhm) {
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function() {
                // �齱���չʾ
                var btnLink = 'javascript:;';
                var btnText = '����һ��&gt;';
                var target = '_top';
                if(awards == 0) {
                    var btnText = '����һ��&gt;';
                    var target = '_top';
                    var yhms = '����ģ�����������һ�Σ�'
                }
                else {
                    var btnText = '����ʹ��&gt;';
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
                    $('.ztpopup-result').find('.ztpopup-ct .info').html('�Ż��룺<span>' + yhm + '</span>');
                    if(awards == 3 || awards == 4) {
                        $('.ztpopup-result').find('.ztpopup-ct .info').append('<br>��ͼ��������빤���ֿͷ�����');
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
    // ���糬ʱִ�к��� rotateTimeOut()
    var rotateTimeOut = function() {
        $('#rotate').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function() {
                $.msgBox.Alert(null, '���糬ʱ�����������������ã�');
            }
        });
    };
    // ʣ�����bRotateTimes
    var bRotateTimes = $('.rotateTimes .num').text() || 0;

    $('.pointer').on('click', function() {
        if (bRotate) return;
        // �жϳ齱��������
        if(bRotateTimes <= 0) {
            $('.ztpopup-result').attr('class', 'ztpopup ztpopup-result ztpopup-result-over');
            $('.ztpopup-result').find('.ztpopup-ct p').html('�齱����������');
            $('.ztpopup-result').find('.ztpopup-ct .info').html('����QQȺ��������һ�γ齱����<br><i style="font-size: 14px;">��ʾ��������������Ч��ע���Ƿ���������ε���</i>');
            $('.ztpopup-result').find('.ztpopup-btn a').attr({'href': 'javascript:;', 'class': 'ztico btn-share', 'target': '_top'}).html('�������&gt;');
            $('.ztpopup-result').show();
            ztCenterObj('.ztpopup-result');
            return false;
        }
        // �齱��� �����item ����ajax������������ajax�������
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
                            rotateFn(0, 0, 'лл����');
                            break;
                        case 1:
                            rotateFn(1, 60, '�ɽ�����VIP 3���Ż�ȯ', data.code);
                            break;
                        case 2:
                            rotateFn(2, 240, '�ɽ�����VIP 5���Ż�ȯ', data.code);
                            break;
                        case 3:
                            rotateFn(3, 300, '�빤����VIP 3���Ż�ȯ', data.code);
                            break;
                        case 4:
                            rotateFn(4, 120, '�빤����VIP 5���Ż�ȯ', data.code);
                            break;
                        case 5:
                            rotateFn(5, 180, '������VIP 3���Ż�ȯ', data.code);
                            break;
                    }
                }
                else if(data=='1003') {
                    $('.popup-login').show();centerObj('.popup-login .popup');
                }
            }
        });
    });

    // ����������
    if($('.zt-luckdraw').length) {
        $('.zt-luckdraw .win .list').myScroll({
            speed: 40, //��ֵԽ���ٶ�Խ��
            rowHeight: 89, //li�ĸ߶�
            number: 3 //ÿ�Ź�������
        });
    }

    // ���������ַ
    /*$('.zt-guess').on('click', '.info .btn', function() {
        $('.ztpopup-save').show();

        return false;
    });*/

    // ʮǿ��������ʱ
    if($('#times').length) {
        var downcount = $('#times').data('downcount');
        $('#times').downCount({
            date: downcount
        });
    };

    // �������
    $('.list-myelection').on('click', '.btn', function() {
        if(!$(this).hasClass('btn-dis')) {
            $(this).addClass('btn-dis');
            // ���¸����жϣ����ڷ�ҳ��Ҫ��̨�жϣ�����ǰ������չʾ
            var guessNum = $('.list-myelection').find('.btn-dis').length;
            var jcuids = '';
            $('.list-myelection').find('.btn-dis').each(function(){
            	jcuids+=$(this).data('id')+',';
            })

            $('.zt-election .tit').find('.num').html(guessNum);
            $('.ztpopup-guess-select').show().find('.ztpopup-ct p').html('���³ɹ�');
            // ѡ��10���ж�Ϊ�ɹ�������رհ�ť��ת���ɹ�ҳ��

            if(guessNum == 10) {
            	//����Ajax�洢���ݵ����ݿ�
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
            // ���¸����жϣ����ڷ�ҳ��Ҫ��̨�жϣ�����ǰ������չʾ
            var guessNum = $('.list-myelection').find('.btn-dis').length;
            $('.zt-election .tit').find('.num').html(guessNum);
            $('.ztpopup-guess-select').show().find('.ztpopup-ct p').html('ȡ�����³ɹ�');
        };
    });

    // ���������ʽ����
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
    var e=document.getElementById('contents');//������contents
    e.select(); //ѡ�����
    document.execCommand('Copy'); //ִ���������������
}

function ztCenterObj(obj) {
    jQuery(obj).find('.ztpopup-box').css('margin-top', -jQuery(obj).find('.ztpopup-box').height() / 2)
}

// �޷�������
(function($) {
   $.fn.myScroll = function(options) {
        //Ĭ������
        var defaults = {
            speed: 40, //�����ٶ�,ֵԽ���ٶ�Խ��
            rowHeight: 24, //ÿ�еĸ߶�,
            number: 1 //����ÿ�Ÿ���
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

// ����ʱ���
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