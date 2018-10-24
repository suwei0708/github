/**
 * app 模块
 *
 * @namespace
 */
var app = {};
app.width;
app.height;
app.loop = false;  // 循环展示
app.DEFAULT_WIDTH = 750;
app.DEFAULT_HEIGHT = 1212;

app.init = function () {

    app.loop = getUrlParameterByName('loop') || false;

    // 加载完成后隐藏loading
    var the_images = ['static/img/p2/p2-paper.png', 'static/img/p2/p2-text1.png', 'static/img/p2/p2-text2.png', 'static/img/p2/p2-text3.png', 'static/img/p2/p2-text4.png', 'static/img/p2/p2-text5.png', 'static/img/p3/p3-sidebar.png', 'static/img/p3/p3-select.png', 'static/img/p3/sidebar2.png', 'static/img/p3/nengliang-select.png', 'static/img/p3/text-yang.png', 'static/img/p3/text-liu.png', 'static/img/p3/text-xing.png', 'static/img/p4/p4-text.png', 'static/img/p5/p5-text.png', 'static/img/p5/input.png', 'static/img/p5/btn-sub.png', 'static/img/p5/p5-text2.png', 'static/img/p5/num.png', 'static/img/p5/p5-text2.png'];
    $.each($('#content img'), function(index) {
        the_images.push($(this).attr('src'));
    });
    $.imgpreload(the_images,{
        each: function(i) {
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == "success") {
                var v = (i.length / the_images.length).toFixed(2);
                $("#percentage").html(Math.round(v * 100) + '%');
            }
        },
        all: function() {
            setTimeout(function() {
                $('.loading').hide(0, function() {
                    hanldeAnimate(0);
                });
            }, 500);
        }
    });

    var initialSlide = 0;
    var swiperH = $(window).height() > app.DEFAULT_HEIGHT ? $(window).height() : app.DEFAULT_HEIGHT;
    app.swiper = new Swiper('.swiper-container', {
        direction: 'vertical',  // 是竖排还是横排滚动，不填时默认是横排
        loop: app.loop,  // 循环展示
        longSwipesRatio: 0.1,
        initialSlide: initialSlide,   // 初始展示页是第几页（从0开始
        preventClicks: true,
        preventClicksPropagation: true,
        width: app.DEFAULT_WIDTH,
        height: swiperH,
        noSwiping : true,
        allowSlidePrev : false,
        on: {
            slideChangeTransitionEnd: function(){
                // 初始化箭头指示
                if (app.loop) {return;}
                var arrow = $('.arrow');
                var slideCount = $('.swiper-slide').length;
                hanldeAnimate(this.activeIndex);
                // 是否最后一页
                if(this.activeIndex == slideCount - 2) {
                    arrow.show();
                    setTimeout(function() {
                        $('.page5 .text-1').hide();
                        $('.page5 .text-2').show();
                    }, 3500);
                }
                else if (this.activeIndex >= slideCount - 1) {
                    $('audio')[1].pause();
                    arrow.hide();
                }
                else {
                    arrow.hide();
                }
            }
        }
    });

    // 初始化音乐按钮
    initMusic();
};

/**
 * 获取URL中的参数
 *
 * @param {string} name 参数名
 * @return {string} 参数值
 */
function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
    return results === null ? '': decodeURIComponent(results[1].replace(/\+/g, ' '))
}

/**
 * 初始化音乐播放和暂停事件
 */
function initMusic() {
    var music = $('audio')[0];
    $('.player-btn').on('click', function () {
        var _me = $(this);
        if (_me.hasClass('player-btn-stop')) {
            music.play();
        }
        else {
            music.pause();
        }

        _me.toggleClass('player-btn-stop');
    });
}

/**
 * 页面交互事件的初始化写这里
 */
/**
 * ==============================
 * 页面主要JS逻辑交互
 * ===============================
 */

$(function () {
    // if (checkIsPC()) {
    //     app.width = app.DEFAULT_WIDTH;
    //     app.height = app.DEFAULT_HEIGHT;
    // }
    // else {
    //     // 浏览器适配
    //     fit('#content');
    //     $(window).on('resize', function() {
    //         fit('#content');
    //     });
    // }
    app.init();
    //微信下兼容音乐处理
    var slideCount = app.swiper.slides.length;
    var curIndex = app.swiper.activeIndex;
    var music = $('audio')[0];
    var _me = $('.player-btn');
    if(music) {music.play();}
    document.addEventListener("WeixinJSBridgeReady", function () {
        if (_me.hasClass('player-btn-stop')) {
            music.pause();
        }
        else {
            music.play();
        }
    }, false);
    initPageEvents();
});

function initPageEvents() {
    // 防止拖动出现黑块
    $('body').on('touchmove', function(e){ e.preventDefault()});

    // 背景介绍
    $('.page1').on('click', '.intro-text', function() {
        $('.intro-mask').show();
    });
    $('.intro-mask').on('click', '.close', function() {
        $(this).parents('.intro-mask').hide();
    });

    // 点击弹出文字，3次弹出文字
    var clickNum = 0;
    $('.page2').one('click', '.tree:eq(0)', function() {
        clickNum++;
        $(this).find('img:eq(1)').hide();
        $(this).find('.text').fadeIn();
        if(clickNum == 3) {setTimeout(showText, 2000)}
    });
    $('.page2').one('click', '.tree:eq(1)', function() {
        clickNum++;
        $(this).find('img:eq(1)').hide();
        $(this).find('.text').fadeIn();
        if(clickNum == 3) {setTimeout(showText, 2000)}
    });
    $('.page2').one('click', '.tree:eq(2)', function() {
        clickNum++;
        $(this).find('img:eq(1)').hide();
        $(this).find('.text').fadeIn();
        if(clickNum == 3) {setTimeout(showText, 2000)}
    });

    // 开始游戏
    $('.start .btn').on('click', function() {
        app.swiper.slideTo(3, 0, false);
        hanldeAnimate(3);
    });

    // 规则
    $('.start .btn-rule').on('click', function() {
        $('.rule-mask').show();
    });

    $('.rule-mask').on('click', '.close', function() {
        $(this).parents('.rule-mask').hide();
    });

    // 点击选择树苗
    var treeName;
    $('.sidebar').one('click', 'li', function() {
        $(this).addClass('cur');
        if($(this).index() == 0) {
            treeName = 'yang';
        }
        else if($(this).index() == 1) {
            treeName = 'liu';
        }
        else {
            treeName = 'xing';
        }
        $('.litter-tree').fadeIn(500);
        $('.sidebar').find('ul').removeClass('right-in').addClass('right-out');
        $('.sidebar').find('.tit').removeClass('right-in').addClass('right-out');
        setTimeout(function() {
            $('.sidebar1').hide();
            $('.sidebar2').show();
        }, 1000);

    });

    var nlNum = 0;
    var shuiNum = 0;
    var sunNum = 0;
    var chongNum = 0;
    $('.sidebar2').on('click', 'li', function() {
        if($(this).hasClass('dis') || nlNum >= 4) {return;};
        var _this = $(this);
        nlNum++;
        $('.sidebar2 li').addClass('dis');
        _this.addClass('cur');

        if(_this.index() == 0) {
            shuiNum++;
            $('.tips-shui' + shuiNum).delay(500).fadeIn(500);
            $('.shui').fadeIn(300);
        }
        else if(_this.index() == 1) {
            sunNum++;
            $('.tips-sun' + sunNum).delay(500).fadeIn(500);
            $('.sun').fadeIn(300);
        }
        else {
            chongNum++;
            $('.tips-chong' + chongNum).delay(500).fadeIn(500);
            $('.chong').fadeIn(300);
            $('.wave').show();
            setTimeout(function() {
                $('audio')[2].play();
            }, 300);
            setTimeout(function() {
                $('.wave').hide();
            }, 1500);
        }
        setTimeout(function() {
            $('.sidebar2 li').removeClass('dis');
            _this.removeClass('cur');
            $('.shui').hide();
            $('.sun').hide();
            $('.chong').hide();
            $('.page4 .tips').hide();
        }, 2000);

        if(nlNum == 1) {
            setTimeout(function() {
                $('.litter-tree').fadeOut(1000);
                $('.' + treeName + nlNum).fadeIn(1000);
            }, 800);
        }
        else {
            setTimeout(function() {
                $('.' + treeName + (nlNum - 1)).fadeOut(1000);
                $('.' + treeName + nlNum).fadeIn(1000);
            }, 800);
            if(nlNum == 4) {
                setTimeout(function() {
                    $('.text-' + treeName).show();

                    if(treeName == 'liu') {
                        $('.tips-yc').addClass('tips-yc-liu');
                    }
                    $('.tips-yc').show();
                    $('.page4').removeClass('swiper-no-swiping');
                    app.swiper.update();
                    $('.arrow').show();
                }, 1500);
            }
        }
    });

    // 播放水声
    $('.sound').on('click', function() {
        $('audio')[1].play();
    });

    // form提交
    var placeholder;
    $('#form input').on('focus', function() {
        placeholder = $(this).attr('placeholder');
        $(this).attr('placeholder', '');
    })
    .on('blur', function() {
        $(this).attr('placeholder', placeholder);
    });
    $('#form').on('click', '.btn', function() {
        if(!$.trim($('#form input[name=name]').val())) {
            alert('姓名不能为空！');
            return false;
        }
        if(!$.trim($('#form input[name=mobile]').val())) {
            alert('手机号码不能为空！');
            return false;
        }

        if(!(/^1\d{10}$/.test($.trim($('#form input[name=mobile]').val())))) {
            alert('电话号码格式不正确');
            return false;
        }

        $.ajax({
            url: 'http://www.xinliling.com/trees',
            type: 'POST',
            dataType: 'json',
            data: $('#form').serialize()
        })
        .done(function(res) {
            var wxData = {
                title: '我今天种下了第' + res.total_tree + '棵树，成为湘江的第' + res.total_user + '位绿化天使 '
            };
            weixin.bindData(wxData);
            weixin.bindShareInfo();

            var str1 = '0';
            var str1 = res.total_tree.toString().split("");
            var num1;
            for (var i = 0; i < str1.length; i++) {
                num1 += '<span class="num' + str1[i] + '"></span>';
            }
            var str2 = '0';
            str2 = res.total_user.toString().split("");
            var num2;
            for (var i = 0; i < str2.length; i++) {
                num2 += '<span class="num' + str2[i] + '"></span>';
            }
            $('.page6 .result2 .num').html(num1);
            $('.page6 .result4 .num').html(num2);
            $('.page6').find('.text').hide();
            $('.page6').find('.result').show();
            $('.page6').find('.logo').fadeIn(500);
            $('.page6').find('.p5-intro').show();
        })
        .fail(function(res) {
            if(res.status == 422) {
                alert(res.responseText);
            }
            else {
                alert('网络错误，请稍后重试')
            }
        });

        return false;
    });

}

function showText() {
    $('.page2 .bird').addClass('birdm').find('img').addClass('birdh');
    $('.page2 .r-tree').animate({
        'opacity': '0.3'
    });
    $('.fix-text1').show();
    setTimeout(function() {
        $('.page2').removeClass('swiper-no-swiping');
        app.swiper.update();
        $('.arrow').show();
    }, 3000);
}
/**
 * 返回是否是PC页面
 *
 * @return {boolean} true / false
 */
function checkIsPC() {
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);
    var winWidth = $(window).width();
    if (winWidth > app.DEFAULT_WIDTH && (system.win || system.mac || system.xll)) {
        return true;
    }
    else {
        return false;
    }
}

function hanldeAnimate(curIndex) {
    // 找到有[data-anim]属性的DOM元素，分别给它们加上data-anim设定的动画classname
    $('.swiper-slide').find('[data-anim]').each(function () {
        $(this).removeClass($(this).data('anim'));
    });
    $('.swiper-slide').eq(curIndex).find('[data-anim]').each(function () {
        $(this).addClass($(this).data('anim'));
    });
}

// 页面调整
function fit(obj) {
    var winW = $(window).width();
    var winH = $(window).height();
    var winScale = winW / winH;
    var pageScale = app.DEFAULT_WIDTH / app.DEFAULT_HEIGHT;
    var initScale;
    if(winScale > pageScale) {
        initScale = winH / app.DEFAULT_HEIGHT;
    }
    else {
        initScale = winW / app.DEFAULT_WIDTH;
    }
    $(obj).css({
        '-webkit-transform': 'scale(' + initScale + ')',
        'transform': 'scale(' + initScale + ')',
        '-webkit-transform-origin': '50% 50% 0',
        'transform-origin': '50% 50% 0',
        'margin-left': (app.DEFAULT_WIDTH - winW) / -2 + 'px',
        'margin-top': (app.DEFAULT_HEIGHT - winH) / -2 + 'px'
    });
}