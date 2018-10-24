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
app.music1 = $('audio')[0];
app.music2 = $('audio')[1];
app.music3 = $('audio')[2];
app.music4 = $('audio')[3];
app.music5 = $('audio')[4];
app.music6 = $('audio')[5];

app.init = function () {

    app.loop = getUrlParameterByName('loop') || false;

    // 加载完成后隐藏loading
    var the_images = [app.baseUrl + 'p2/sman2.png', app.baseUrl + 'p2/sman3.png', app.baseUrl + 'p2/sman4.png', app.baseUrl + 'p2/sman5.png', app.baseUrl + 'p2/sman6.png', app.baseUrl + 'p2/video-mask2.png', app.baseUrl + 'p2/video-mask3.png', app.baseUrl + 'p2/video-mask4.png', app.baseUrl + 'p2/video-mask5.png', app.baseUrl + 'p2/video-mask6.png',];
    $.each($('#content img'), function(index) {
        the_images.push($(this).attr('src'));
    });
    $.imgpreload(the_images,{
        each: function(i) {
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == "success") {
                var v = (i.length / the_images.length).toFixed(2);
                $("#percentage").width(Math.round(v * 100) + '%');
            }
        },
        all: function() {
            setTimeout(function() {
                $('.loading').hide();
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
            slideNextTransitionStart: function(){
                var index = this.activeIndex;
                if(index == 1) {
                    app.music1.src = app.music2.src;
                    app.music1.loop = false;
                    app.music1.play();
                }
            },
            slideChangeTransitionEnd: function(){
                var index = this.activeIndex;
                if(index > 0) {
                    $('.arrow').hide();
                }
            }
        }
    });

    // 初始化音乐按钮
    // initMusic();
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
 * ==============================
 * 页面主要JS逻辑交互
 * ===============================
 */
$(function () {
    app.init();
    //微信下兼容音乐处理
    var index = app.swiper.activeIndex;
    if(index != 0) {return false;}
    if(app.music1) {app.music1.play();}
    document.addEventListener("WeixinJSBridgeReady", function () {
        app.music1.play();
    }, false);
    initPageEvents();
});

/**
 * 页面交互事件的初始化写这里
 */
var timer;
var imgI = 1;
var longTap = false;
var end = false;
var cunI = 0;
function initPageEvents() {
    // 防止拖动出现黑块
    $('body').on('touchmove', function(e){ e.preventDefault();});
    // 按住换一张
    $('.page2 .btn-box').on({
        touchstart: function(e){
            longTap = true;
            app.music1.src = app.music3.src;
            app.music1.loop = true;
            app.music1.play();

            $('.select').show();
            $('.div, .hold').hide();
            timer = setInterval(function() {
                if(imgI == 6) {
                    imgI = 1;
                }
                else {
                    imgI++;
                }
                $('.sman').attr({
                    src: 'static/img/p2/sman' + imgI + '.png'
                });
            }, 100);

            e.preventDefault();
        },
        touchend: function(){
            longTap = false;
            app.music1.src = app.music4.src;
            app.music1.loop = true;
            app.music1.play();
            clearInterval(timer);
            $('.select, .div').hide();
            if(imgI == cunI) {
                cunI++;
                if(cunI == 7) {
                    cunI = 1;
                }
                imgI = cunI;
            }
            else {
                cunI = imgI;
            }
            $('.hold, .div' + imgI).show();
            return false;
        }
    });

    if(!isIOS()) {
        $('#video').attr('controls', 'controls');
    }
    // 长按播放视频
    $('.page2').on({
        touchstart: function(e){
            if($('.select').is(':visible')) {
                return false;
            }
            if(!longTap) {
                var video = document.getElementById('video');
                video.src = app.baseUrl + 'p2/video' + imgI + '.mp4';
                video.load();
                video.play();
                app.music1.pause();
                video.onended = function() {
                    app.music1.src = app.music6.src;
                    app.music1.loop = false;
                    app.music1.play();
                    end = true;
                    $('.video').hide();
                    app.swiper.slideTo(2, 0, false);
                };
                $('.video').find('.mask').attr('src', app.baseUrl + 'p2/video-mask' + imgI + '.png');
                $('.video').show();
            }
            e.preventDefault();
        },
        touchend: function(){
            if($('.select').is(':visible')) {
                return false;
            }
            if(isIOS()) {
                if(!end) {
                    app.music1.play();
                }
                $('.video').hide();
                $('#video').attr('src', '');
            }
            return false;
        }
    });

    $('.page3').on('click', '.btn-box', function() {
        $('.page3').hide();
        $('.page4').show();
        app.music1.src = app.music5.src;
        app.music1.loop = false;
        app.music1.play();
        return false;
    });

    // 分享
    $('body').on('click', function() {
        if($('.share').is(':visible')) {
            $('.share').hide();
            $('.main-hb').show();
        }
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
    $('.page4').on('click', '.btn-box', function() {
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
            url: 'https://m.xinliling.com/trees?type=2',
            type: 'POST',
            dataType: 'json',
            data: $('#form').serialize()
        })
        .done(function(res) {
            var wxData = {
                title: '我是' + $.trim($('#form input[name=name]').val()) + '，第' + res.total_user + '位助力长沙成为网红城市的抖友',
                desc: '来湖南首个网红音乐会遇见马可、胡66、马良、面筋哥、亮声OPEN……'
            };
            weixin.bindData(wxData);
            weixin.bindShareInfo();
            $('.main-box').hide();
            $('.tips-suc').show();
            setTimeout(function() {
                $('.tips-suc').hide();
                $('.main-hb').show();
                setTimeout(function() {
                    $('.share').show();
                }, 3000);
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

function isIOS() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
　　　　return true;
    }
    else {
        return false;
    }
}