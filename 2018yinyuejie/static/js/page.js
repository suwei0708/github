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
app.baseUrl = 'static/img/';

app.init = function () {

    app.loop = getUrlParameterByName('loop') || false;

    // 加载完成后隐藏loading
    var the_images = [app.baseUrl + 'p5/option.png', app.baseUrl + 'p6/input.png', app.baseUrl + 'p6/btn.png', app.baseUrl + 'anim1.png', app.baseUrl + 'anim2.png', app.baseUrl + 'anim3.png', app.baseUrl + 'anim4.png'];
    $.each($('#content img'), function(index) {
        the_images.push($(this).attr('src'));
    });
    console.log(the_images)
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
    app.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',  // 是竖排还是横排滚动，不填时默认是横排
        loop: app.loop,  // 循环展示
        longSwipesRatio: 0.1,
        initialSlide: initialSlide,   // 初始展示页是第几页（从0开始
        preventClicks: true,
        preventClicksPropagation: true,
        followFinger: false,
        resistanceRatio: 0,
        speed: 3000,
        allowSlidePrev : false,
        noSwiping : true,
        preventIntercationOnTransition : true,
        on: {
            slideNextTransitionStart: function(){
                var index = this.activeIndex;
                if(index <= 5) {
                    $('.anim' + (index-1) + '-in').hide();
                    $('.anim' + (index-1) + '-out').show();
                    $('.page' + (index-1)).find('.mask').removeClass('fade-in-out');
                    $('.finger-box').hide();
                    app.swiper.allowSlideNext = false;//设置
                }
            },
            slideChangeTransitionEnd: function(){
                var index = this.activeIndex;
                if(index < 5) {
                    $('.finger-box').show();
                    $('.anim' + (index-1)).hide();
                    $('.anim' + index + '-in').show();
                    $('audio').attr('src', app.baseUrl + 'music' + index + '.mp3')[0].play();
                    $('.player-btn').removeClass('player-btn-stop');
                    setTimeout(function() {
                        app.swiper.allowSlideNext = true;//设置
                    }, 3000);
                }
                else if(index == 5) {
                    $('.anim' + (index-1)).hide();
                    app.swiper.allowSlideNext = true;//设置
                    $('audio').attr('src', app.baseUrl + 'music' + index + '.mp3')[0].play();
                }
                $('.player-btn').removeClass('player-btn-stop');
                hanldeAnimate(index);
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
 * ==============================
 * 页面主要JS逻辑交互
 * ===============================
 */
$(function () {
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

/**
 * 页面交互事件的初始化写这里
 */
function initPageEvents() {
    // 防止拖动出现黑块
    $('body').on('touchmove', function(e){ e.preventDefault();});

    // 幸会青春
    $('.page0 .btn').on('click', function() {
        app.swiper.slideTo(1, 0, false);
        hanldeAnimate(1);
        $('.finger-box').show();
        $('.anim1-in').show();
        $('audio').attr('src', app.baseUrl + 'music1.mp3')[0].play();
        $('.player-btn').removeClass('player-btn-stop');
        app.swiper.allowSlideNext = false;//设置
        setTimeout(function() {
            app.swiper.allowSlideNext = true;//设置
        }, 3000);
    });

    // 选项
    $('.page5 .btn').on('click', function() {
        app.swiper.slideTo(6, 0, false);
        hanldeAnimate(6);
    });
    $('.option').on('click', 'li', function() {
        $('.option-result').show().find('img').eq($(this).index()).show();
    });

    // 分享
    $('.share').on('click', function() {
        $(this).hide();
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
            url: 'https://m.xinliling.com/trees?type=1',
            type: 'POST',
            dataType: 'json',
            data: $('#form').serialize()
        })
        .done(function(res) {
            var wxData = {
                title: '3月31日，我是第' + res.total_user + '位来听老狼把青春唱完的见 证者',
                desc: '春暖花开的时节，听一曲老狼，再忆念念不忘的青春时光'
            };
            weixin.bindData(wxData);
            weixin.bindShareInfo();
            $('.page6').find('.result').show();
            setTimeout(function() {
                app.swiper.slideTo(7, 0, false);
                hanldeAnimate(7);
            }, 2000);
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