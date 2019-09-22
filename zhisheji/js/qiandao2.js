$(function() {
	// 签到有礼任务进度
	if ($('.qd-obtain').length) {
		$.each($('.qd-obtain .item3'), function() {
			for (var i = 1; i < $(this).find('.total').text(); i++) {
				$(this).find('.per').append('<span style="left: ' + i / $(this).find('.total').text() * 100 + '%"></span>');
			}
			$(this).find('.per > div').css({
				width: $(this).find('.num').text() / $(this).find('.total').text() * 100 + '%'
			})
		});
	};

	// 兑换记录
	$('.btn-record').on('click', function() {
		$('.popup-record').show();
	});

    // 签到
    $('.qd-user-info').on('click', '.btn-red', function() {
        $('.popup-qd').show();
        centerObj('.popup-qd .popup');
        $(this).removeClass('btn-red').addClass('btn-gray').html('已签到');
        $('.qd-user-info').find('p').html('您已连续签到2天，获得15设计币');
        // 连续签到天数
        $('.qd-user-info').find('dl:eq(0) .num').html(+$('.qd-user-info').find('dl:eq(0) .num').html() + 1);
        // 获得设计币
        $('.qd-user-info').find('dl:eq(1) .num').html('10');
        // 我的设计币
        $('.qd-user-info').find('dl:eq(2) .num').html(+$('.qd-user-info').find('dl:eq(2) .num').html() + 10);
        setTimeout(function() {
            $('.popup-qd').hide();
        }, 2000);
    });

    $('.qd-top').on('click', '.btn-green', function() {
        // 第一次
        $.msgBox.Confirm(null, '第一次兑换商品需要先完善个人信息哦！', function() {
            $('.popup-infos').show();
            centerObj('.popup-infos .popup');
            $('.popup-box').find('.tips').hide();
        });
        // 非第一次
        // $('.popup-infos').show();
        // centerObj('.popup-infos .popup');
        // $('.popup-box').find('.tips').hide();
    });

    // 保存收货信息
    if ($('.popup-infos').length) {
        var dom1 = jQuery('.popup-infos').find('.popup-ct');
        judgeTips(dom1);
        $('.popup-infos').on('click', '.btn', function() {
            if (judgeBtns(dom1)) {
                $('.popup-infos').hide();
                tipSave('suc', '保存成功');
            }
        });
    };

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
        $('.popup-infos').show();
        $('.popup-box').find('.tips').hide();
        centerObj('.popup-infos .popup');
    });

    // 确认收货地址
    $('body').on('click', '.popup-shdz .btn-blue', function() {
        $('.popup-shdz').hide();
        tipSave('suc', '兑换成功，预计48小时内发货，请注意查收');
	});

	// 抽奖
	luck.init('luck');
	$("#prize-btn").on('click', function() {
	    if (+$('.qd-sjb span').text() >= 20 && luck.isClick) {
			luck.isClick = false;
	        // 抽奖次数大于0
	        $('.qd-sjb span').text($('.qd-sjb span').text() - 20);
	        luck.speed = 100;
	        roll();
	        return false;
	    } else {
	        // 抽奖次数用完
	        $('.popup-prize').find('.tit').html('抱歉(┬＿┬)您的抽奖次数已经用完了');
	        $('.popup-prize').find('.text').html('');
	        $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-add');
	        $('.popup-prize').show();
	        center('.popup-prize');
	        mask.show();
	    }
	});
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

function judgeTips(obj) {
    jQuery(obj).find('.txt').on('blur', function() {
        if (!jQuery(this).nextAll('.tips').length) {
            jQuery(this).parents('.item').append('<span class="tips"></span>');
        }
        if (jQuery.trim(jQuery(this).val()).length) {
            jQuery(this).parents('.item').addClass('has-val');
        }
        if (!jQuery.trim(jQuery(this).val()).length) {
            jQuery(this).parents('.item').removeClass('has-val');
            jQuery(this).nextAll('.tips').html('<span class="triangle"></span>' + jQuery(this).parents('.item').find('.input-label').text() + '不能为空！').show();
        }
        else if(!(/^1\d{10}$/.test(jQuery.trim(jQuery(this).val()))) && jQuery(this).parents('.item').find('.input-label').text() == '手机号') {
            jQuery(this).nextAll('.tips').html('<span class="triangle"></span>' + jQuery(this).parents('.item').find('.input-label').text() + '格式不正确！').show();
            return false;
        }
    });
    jQuery(obj).find('.txt').on('focus', function() {
        jQuery(this).nextAll('.tips').hide();
    });
}

function judgeBtns(obj) {
    var pass = true;
    jQuery.each(jQuery(obj).find('.txt'), function(index, val) {
        if (!jQuery.trim(jQuery(this).val()).length) {
            if (!jQuery(this).nextAll('.tips').length) {
                jQuery(this).parents('.item').append('<span class="tips"></span>');
            }
            jQuery(this).nextAll('.tips').html('<span class="triangle"></span>' + jQuery(this).parents('.item').find('.input-label').text() + '不能为空！').show();
            pass = false;
        }
    });
    return pass;
}
// 抽奖js
var luck = {
    index: -1, // 当前转动到哪个位置，起点位置
    count: 8, // 总共有多少个位置
    timer: 0, // setTimeout的ID，用clearTimeout清除
    speed: 20, // 初始转动速度
    times: 5, // 转动次数
    cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    num: 1, // 抽奖次数
	// prize: parseInt(Math.random() * 8), //中奖位置
    prize: 0, //中奖位置
    isClick: true,
    prizeData: [
        '50元优惠券',
        'VIP3天',
        '谢谢参与',
        'VIP1天',
        'VIP7天',
        '100元优惠券',
        'VIP1天',
        '谢谢参与',
    ],
    init: function(id) {
        if ($("#" + id).find(".luck-unit").length > 0) {
            $luck = $("#" + id);
            $units = $luck.find(".luck-unit");
            this.obj = $luck;
            this.count = $units.length;
            $luck.find(".luck-unit-" + this.index).addClass("active");
        };
    },

    roll: function() {
        var index = this.index;
        var count = this.count;
        var luck = this.obj;
        $(luck).find(".luck-unit-" + index).removeClass("active");
        index += 1;
        if (index > count) {
            index = 0;
        };
        $(luck).find(".luck-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function(index) {
		// this.prize = index;
		luck.isClick = true;
		console.log('stop')
        return false;
    }
};
var mask = $('#mask');

function roll() {
    luck.times += 1;
    luck.roll();
    if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
        clearTimeout(luck.timer);
        luck.times = 0;
        // 中奖弹出窗
        if (luck.prize == 2 || luck.prize == 7) {
            // 没有中奖
            $('.popup-prize').find('.tit').html(luck.prizeData[luck.prize]);
            $('.popup-prize').find('.text').html('什么？还没抽到永久VIP 就没机会了？快让好友送你抽奖机会把');
            $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-continue');
            $('.popup-prize').show();
            mask.show();
        } else if (luck.prize == 0 || luck.prize == 5) {
            // 中优惠券
            $('.popup-prize-quan').find('.text').html('恭喜您，获得' + luck.prizeData[luck.prize]);
            $('.popup-prize-quan').show();
            center('.popup-prize-quan');
            mask.show();
        } else {
            // 中奖
            $('.popup-prize').find('.tit').html('恭喜获得' + luck.prizeData[luck.prize] + '，已经入账');
            $('.popup-prize').find('.text').html('注释：如VIP 标识没有显示，可以试着重新登录下哦');
            // if(luck.prize == 5) {
            //     $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-share');
            // }
            // else {
            //     $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-sure');
            // }
            $('.popup-prize').show();
            center('.popup-prize');
            mask.show();
        }
    } else {
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