var player;
var options = {
    'controls': true,
    'autoplay': false,
    'preload': true,
    'loop': false,
    'bigPlayButton' : false,
    'posterImage': false,
    'errorDisplay' : false,
    'textTrackDisplay' : false,
    'nativeControlsForTouch': false,
    'controlBar': {
        // 控制显示的按钮和顺序
        'children': [
            {
                name: 'playToggle'
            },
            {
                name: 'currentTimeDisplay'
            },
            {
                name: 'progressControl'
            },
            {
                name: 'durationDisplay'
            },
            {
                name: 'fullscreenToggle'
            },
        ]
    }
}
$(function() {
    player= videojs('my-video', options, function() {
        // console.log('播放器初始化完成');

        var touchtime = new Date().getTime();
        this.on('touchend', function() {
            if( new Date().getTime() - touchtime < 500 && $('.vjs-wait').is(':hidden') && $('.operate-tips').is(':hidden')){
                // 双击播放器
                if(player.paused()) {
                    player.play();
                }
                else {
                    player.pause();
                }
            }
            else{
                touchtime = new Date().getTime();
            }
        });
    });
    //加载页面进行播放器初始化
    player.ready(function() {
        $('.vjs-control-bar').wrapAll('<div class="control-wrapper"></div>');

        // 提示免费次数和提示框5秒后隐藏
        $('.vjs-tips').prependTo('.control-wrapper');
        setTimeout(function() {
            $('.tips-novip, .tips-becomevip').hide();
        }, 5000);
        // 总时间位置调整
        // $('.vjs-duration').before($('.vjs-progress-control'));
        // 提示框位置调整
        $('.vjs-header, .operate-tips, .vjs-wait, .vjs-tips2, .vjs-tips-rate, .watermark, .vjs-back').appendTo('#my-video');
        // 增加暂停提示框
        $('<div class="vjs-paused-tips">已暂停</div>').appendTo('#my-video');
    });

    // 播放页头部箭头点击事件
    $('.vjs-back').on('click', function() {
        if($('#my-video').hasClass('vjs-fullscreen')) {
            // 退出全屏
            $('.vjs-fullscreen-control').click();
        }
        else {
            // 后退
            window.history.go(-1);
        }
        return false;
    });
    // 点击播放
    $('.vjs-wait').on('click', function() {
        $(this).hide();
        player.play();
        // 显示操作提示并且1.5秒后隐藏
        $('.operate-tips').show();
        setTimeout(function() {
            $('.operate-tips').hide();
        }, 1500);
        $('.operate-tips').on('click', function() {
            $(this).hide();
        });
    });

    // 点击调整倍速
    $('body').on('click', '.ico-multiple', function() {
        if($('.vjs-tips-rate').is(':hidden')) {
            $('.vjs-tips-rate').show();
        }
        else {
            $('.vjs-tips-rate').hide();
        }
        return false;
    });
    $('body').on('click', function () {
        if($('.vjs-tips-rate').is(':visible')) {
            $('.vjs-tips-rate').hide();
        }
    });
    $('.vjs-tips-rate').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        player.playbackRate($(this).data('rate'));
        $('.vjs-tips-rate').hide();
        return false;
    });
});