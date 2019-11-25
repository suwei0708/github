$(function() {
	// 签到有礼任务进度
	if ($('.qd-obtain').length) {
		$.each($('.qd-obtain .item3'), function() {
			for (var i = 1; i < $(this).find('.total').text(); i++) {
				$(this).find('.per').append('<span style="left: ' + i / $(this).find('.total').text() * 100 + '%"></span>');
			}
			$(this).find('.per > div').animate({
				width: $(this).find('.num').text() / $(this).find('.total').text() * 100 + '%'
			})
		});
	};

	// 兑换记录
	$('.btn-record').on('click', function() {
		$('.popup-record').show();
	});

    // 签到
    $('.qd-sign').on('click', '.btn-sign', function() {
		// 签到的设计币数量
		var $coin = +$('.qd-sign').find('.today').find('strong').html().replace('+', '');
		// 按钮变色
        $(this).removeClass('btn-sign').addClass('btn-gray').html('已签到');
        // 连续签到天数
        $('.qd-coin').find('dd span:eq(2)').html(+$('.qd-coin').find('dd span:eq(2)').html() + 1);
		// 获得设计币
		$('.popup-sign').find('strong').html('签到成功');
		$('.popup-sign').find('p').html('今日签到<span class="blue"> +' + $coin + '</span>&nbsp;&nbsp;&nbsp;&nbsp;累计签到 7 天可获得丰厚奖励');
        $('.popup-sign').show();
        setTimeout(function() {
            $('.popup-sign').hide();
        }, 2000);
        // 我的设计币
		$('.qd-coin').find('strong.blue').html(+$('.qd-coin').find('strong.blue').html() + $coin);
		// 签到样式变化
		$('.qd-sign').find('.today').removeClass('today').addClass('cur');
	});

	// 领取设计币
	$('.qd-obtain').on('click', '.btn-green', function() {
		// 领取样式变化
		$(this).removeClass('btn-green').addClass('btn-dis').html('已完成');
		// 领取的设计币数量
		var $coin = +$(this).parents('li').find('.item2 p').html().replace('+', '').replace(' /次', '');
		// 获得设计币
		$('.popup-sign').find('strong').html('领取成功');
		$('.popup-sign').find('p').html('恭喜完成任务&nbsp;&nbsp;<span class="blue"> +' + $coin + '</span> 设计币');
		$('.popup-sign').show();
		setTimeout(function() { $('.popup-sign').hide(); }, 2000);
	})

    // 兑换
    $('.qd-list').on('click', '.btn-blue', function() {
        var txt = $(this).parents('li').find('.name').html();
        $.msgBox.Confirm(null, '确定要兑换“' + txt + '”吗？', function() {
            $('.popup-shdz').show();
            centerObj('.popup-shdz .popup');
        });
    });

    // 修改收货地址
    $('body').on('click', '.popup-shdz .btn-edit', function() {
        $('.popup-shdz').hide();
        $('.popup-shinfos').show().find('.popup-tit').html('编辑地址');
	})
	.on('click', '.popup-shinfos .btn-cancel', function() {
        $('.popup-shdz').show();
        $('.popup-shinfos').hide();
    });

    // 确认收货地址
    $('body').on('click', '.popup-shdz .btn-blue', function() {
        $('.popup-shdz').hide();
        tipSave('suc', '兑换成功，预计5-7 个工作日发货，请注意查收');
	});

	// 抽奖
	luck.init('luck');
	$('#prize-btn').on('click', function() {
		if (!luck.isClick) {
			return false;
		}
	    if (+$('.qd-sjb span').text() >= 20) {
	        // 设计币大于20开始抽奖
			luck.isClick = false;
	        $('.qd-sjb span').text($('.qd-sjb span').text() - 20);
			luck.speed = 100;
			// luck.prize = parseInt(Math.random() * 8); //中奖位置0~7顺时针
			luck.prize = 5;
	        roll();
	        return false;
		}
		else {
	        // 设计币不足20
	        $('.popup-prize').find('.cjimg').attr('class', 'cjimg no-result');
	        $('.popup-prize').find('.text').html('设计币不足，去赚取设计币');
	        $('.popup-prize').find('.btn-sure').html('赚取设计币').attr('href', '签到有礼.html');
			$('.popup-prize').show();
	    }
	});

	// 无缝滚动
	if ($('.myscroll').length) {
		$('.myscroll').myScroll({
		    speed: 50, //数值越大，速度越慢
		    rowHeight: 40 //li的高度
		});
	}
});

// 无缝滚动js
(function($){
    $.fn.myScroll = function(options){
    //默认配置
    var defaults = {
        speed:40,       //滚动速度,值越大速度越慢
        rowHeight:24,   //每行的高度
        len: 1          //每行个数
    };

    var opts = $.extend({}, defaults, options),intId = [];

    function marquee(obj, step){
        obj.find("ul").animate({
            marginTop: '-=1'
        },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, opts.len).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
})(jQuery);

// 抽奖js
var luck = {
    index: -1, // 当前转动到哪个位置，起点位置
    count: 12, // 总共有多少个位置
    timer: 0, // setTimeout的ID，用clearTimeout清除
    speed: 20, // 初始转动速度
    times: 5, // 转动次数
    cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    num: 1, // 抽奖次数
	prize: 0, //中奖位置
    isClick: true,
    prizeData: [
        {
            img: 'cjimg cj-sjb888',
			text: '恭喜获得 <span class="blue">888</span> 设计币'
		},
        {
            img: 'cjimg cj-baozhen',
			text: '恭喜获得 <span class="blue">小智抱枕(随机)</span>'
		},
        {
            img: 'cjimg cj-sjb50',
			text: '恭喜获得 <span class="blue">50</span> 设计币'
		},
        {
            img: 'cjimg cj-ipad',
			text: '恭喜获得 <span class="blue">iPad Pro</span>'
		},
		{
		    img: 'cjimg cj-sjb5',
		    text: '恭喜获得 <span class="blue">5设计币</span>'
		},
		{
		    img: 'cjimg cj-no',
		    text: '手抖了'
		},
        {
            img: 'cjimg cj-wacom',
			text: '恭喜获得 <span class="blue">wacom数位板</span>'
		},
        {
            img: 'cjimg cj-gongzai',
			text: '恭喜获得 <span class="blue">小致毛绒公仔</span>'
		},
		{
		    img: 'cjimg cj-sjb28',
		    text: '恭喜获得 <span class="blue">28</span> 设计币'
		},
		{
		    img: 'cjimg cj-shu',
		    text: '恭喜获得 <span class="blue">设计书籍一本（随机）</span>'
		},
		{
		    img: 'cjimg cj-sjb2',
		    text: '恭喜获得 <span class="blue">2</span> 设计币'
		},
		{
		    img: 'cjimg cj-quan100',
		    text: '恭喜获得 <span class="blue">巧匠课堂100元</span> 优惠券'
		},
    ],
    init: function(id) {
        if ($('#' + id).find('.luck-unit').length > 0) {
            $luck = $('#' + id);
            $units = $luck.find('.luck-unit');
            this.obj = $luck;
            this.count = $units.length;
            $luck.find('.luck-unit-' + this.index).addClass('active');
        };
    },

    roll: function() {
        var index = this.index;
        var count = this.count;
        var luck = this.obj;
        $(luck).find('.luck-unit-' + index).removeClass('active');
        index += 1;
        if (index > count) {
            index = 0;
        };
        $(luck).find('.luck-unit-' + index).addClass('active');
        this.index = index;
        return false;
    },
    stop: function(index) {
        return false;
    }
};
function roll() {
    luck.times += 1;
    luck.roll();
    if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
        clearTimeout(luck.timer);
		luck.times = 0;
		setTimeout(function() {
			luck.isClick = true;

			// 中奖弹出窗
			$('.popup-prize').find('.cjimg').attr('class', luck.prizeData[luck.prize].img);
			$('.popup-prize').find('.text').html(luck.prizeData[luck.prize].text);
			var link;
			if (luck.prize == 0) {
			    // 中888设计币
			    $('.qd-sjb span').text(+$('.qd-sjb span').text() + 888);
			    link = '兑换商场.html';
			} else if (luck.prize == 2) {
			    // 中50设计币
			    $('.qd-sjb span').text(+$('.qd-sjb span').text() + 50);
			    link = '兑换商场.html';
			} else if (luck.prize == 4) {
			    // 中5设计币
			    $('.qd-sjb span').text(+$('.qd-sjb span').text() + 5);
			    link = '兑换商场.html';
			} else if (luck.prize == 5) {
				// 中5设计币
				link = 'javascript:;'
			} else if (luck.prize == 0) {
			    // 中优惠券
			    link = 'https://www.qiaojiang.tv/';
			} else {
			    // 中实物 没有收货地址
			    // $('.popup-shinfos').show();
			    // 中实物 有收货地址
			    $('.popup-shdz').show();
			    return false;
			}
			// 按钮显示文字
			if (luck.prize == 5) {
				$('.popup-prize').one('.btn-sure').hide();
			}
			else if (+$('.qd-sjb span').text() >= 20) {
			    $('.popup-prize').find('.btn-sure').html('去使用').attr('href', link);
			} else {
			    $('.popup-prize').find('.btn-sure').html('赚取设计币').attr('href', '签到有礼.html');
			}
			$('.popup-prize').show();
		}, 1000)
	}
	else {
        if (luck.times < luck.cycle) {
            luck.speed -= 10;
        } else if (luck.times == luck.cycle) {
            var index = Math.random() * (luck.count) | 0;
            // luck.prize = index;
        } else {
            if (luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
                luck.speed += 110;
            } else {
                luck.speed += 20;
            }
        }
        if (luck.speed < 40) {
            luck.speed = 40;
        };

        luck.timer = setTimeout(roll, luck.speed);
    }
    return false;
}