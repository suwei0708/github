var options = {
    "controls": true,
    "autoplay": false,
    "preload": true,
    "loop": false,
    controlBar: {
        'captionsButton': false,
        'chaptersButton': false,
        'LiveDisplay': true,
        'subtitlesButton': false,
        'progressControl': true,
        'remainingTimeDisplay': true,
        'playbackRateMenuButton': {
            'playbackRates': [0.7, 1, 1.2, 1.5, 2]
        },
        //竖着的音量条
        'VolumePanel': {
            inline: false,
            vertical: true
        },
        'fullscreenToggle': true
    }
}
var qj_time = 0;
var player;
var timeID;

function getvideotime(seconds) {
    var s = Math.floor(seconds % 60);
    var m = Math.floor(seconds / 60 % 60);
    var h = Math.floor(seconds / 3600);
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    h = h < 10 ? "0" + h : h;
    return h + ":" + m + ":" + s;
}

function qj_reset() {
    player.currentTime(0);
}

//播放器初始化操作面板清晰度菜单
function playerInitVideo() {
    $('.vjs-control-bar').wrap('<div class="vjs-wrapper"></div>');
    $('.vjs-control-bar').append('<div class="fll"></div><div class="fr"></div>');
    $('.vjs-control-bar .fr').append($('.vjs-playback-rate'));
    $('.vjs-control-bar .fr').append($('.vjs-volume-panel'));
    $('.vjs-volume-vertical').wrapAll('<div class="vjs-volume-wrapper"></div>')
    $('.vjs-control-bar .fr').append($('.vjs-fullscreen-control'));
    $('.vjs-control-bar .fll').append($('.vjs-play-control'));
    $('.vjs-control-bar .fll').append($('.vjs-remaining-time'));
    // 增加高清切换
    $videoPanelMenu = $('.vjs-playback-rate_no');
    $videoPanelMenu.before('<div class="vjs-subtitles-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button" tabindex="0" role="menuitem" aria-live="polite" aria-expanded="false" aria-haspopup="true">' +
        '<div class="vjs-menu" role="presentation">' +
        '<ul class="vjs-menu-content" role="menu">' +
        '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeUrl(this)">标清 </li>' +
        '<li class="vjs-menu-item vjs-selected" tabindex="-1" role="menuitemcheckbox"  onclick="changeUrl(this)">高清</li>' +
        '<li class="vjs-menu-item" tabindex="-1" role="menuitemcheckbox"  onclick="changeUrl(this)">超清</li>' +
        '</ul></div><div class="vjs-control-text">高清</div></div>');

    // 增加web全屏
    $webfullscreen = $('.vjs-fullscreen-control');
    $webfullscreen.before('<button class="vjs-webfullscreen-control vjs-control vjs-button " type="button" aria-live="polite"><span class="vjs-control-text">webFullscreen</span></button>');

    // 增加下一集
    $next = $('.vjs-play-control_no');
    $next.after('<div class="qjplayer-next">' +
        '<span class="iplay iplay-next"></span>' +
        '<div class="tips">' +
        '<div class="tips-box">' +
        '<a href="#">' +
        '<img src="images/index-img6.jpg" width="110" height="62" alt="">' +
        '<span>下一个</span>' +
        '<p>双十一海报设计教程</p>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>');

    $('.vjs-play-control').append('<div class="tips tips-play">播放</div><div class="tips tips-pause">暂停</div>');
    $('.vjs-fullscreen-control').append('<div class="tips tips-exit">退出全屏</div><div class="tips tips-full">全屏</div>');
    $('.vjs-progress-control').insertBefore($('.vjs-control-bar'));
    $('.vjs-webfullscreen-control').append('<div class="tips tips-exit">退出网页全屏</div><div class="tips tips-full">网页全屏</div>');

    // 会员试看dom
    var $dom = '<div class="qjplayer-tips">' +
        '免费试看5分钟，观看完整视频请<a href="#" class="yellow"><span class="iplay iplay-vip"></span>开通会员</a>' +
        '<a href="javascript:;" class="qjplayer-tips-close"><span class="iplay iplay-close"></span></a>' +
        '</div>'
    //$('.vjs-wrapper').prepend($dom);
    if ($("#svtime").val() > 10) {
        // 上次观看dom
        var $dom2 = '<div class="qjplayer-tips">' +
            '您上次观看至<span class="yellow f12" id="qj_svtime">' + getvideotime(svtime) + '</span>处，正在为您续播' +
            '<a href="javascript:void(0)" class="yellow" onclick="qj_reset()">从头观看</a>' +
            '<a href="javascript:;" class="qjplayer-tips-close"><span class="iplay iplay-close"></span></a>' +
            '</div>'
        $('.vjs-wrapper').prepend($dom2);
    }
}


$(function () {
    window.onerror = function () {
        return true;
    }
    player = videojs('my-video', options, function () {
        // console.log('播放器初始化完成'); //回调函数
        playerInitVideo();
        var _player = this;
        document.onkeydown = function (e) {
            e = window.event || e;
            var n_time = _player.currentTime();
            var n_vo = _player.volume()
            switch (e.keyCode) {
                case 37: //左键
                    //console.log("left");
                    _player.currentTime(n_time - 10);
                    break;
                case 38: //向上键
                    //console.log("top");
                    _player.volume(n_vo + 0.1)
                    return false;
                    break;
                case 39: //右键
                    //console.log("right");
                    _player.currentTime(n_time + 10);
                    break;
                case 40: //向下键
                    //console.log("down");
                    _player.volume(n_vo - 0.1)
                    return false;
                    break;
                case 27: //ESC

                    if ($(".vjs-exitwebfullscreen-control").length) {
                        $(".vjs-exitwebfullscreen-control").click();
                    }
                    break;
                case 96: //ESC
                    if ($(".vjs-exitwebfullscreen-control").length) {
                        $(".vjs-exitwebfullscreen-control").click();
                    }
                    break;
                case 13: //回车键
                    break;
                default:
                    break;
            }

        }
        if ($(".vjs-remaining-time-display").length) {
            $(".vjs-remaining-time-display").remove();
        }

        _player.on('timeupdate', function (e) { //播放时间改变执行函
            if (parseInt(qj_time % 25) == 0) {
                if (qj_time > 0) {
                    $("#qj_svtime").parents(".qjplayer-tips").hide();
                }
            }
            if (parseInt(qj_time % 176) == 0) {
                $.post("/Setvideotime/Setvideotime", {
                    vid: vid,
                    t: escape(_player.currentTime()),
                    num: now,
                    myid: $(".play-list .cur").attr("myid")
                }, function (data) {
                    // if(data!="yes"){
                    //     //_player.pause();
                    //     location.reload();
                    // }
                })
                qj_time = 26;
            }

            if (_player.duration() != "Infinity" && _player.duration() > 0) {
                $(".vjs-remaining-time").html('<div class="vjs-remaining-time-display" aria-live="off">' + getvideotime(_player.currentTime()) + '/' + getvideotime(_player.duration()) + '</div>');
            }
            qj_time++;

        });

        _player.on('play', function (e) { //播放时间改变执行函
            if ($("#nologin").length) {
                $("#nologin").show();
                $(".mask").show();
            } else if ($(".popup-vip").length) {
                $(".popup-vip").show();
                $(".mask").show();
            } else {
                $.post("/Video/Lookvideo/Id/0", {
                    vid: vid,
                    num: $(".play-list .cur").attr("myid")
                }, function (data) {
                    if (data != "yes") {
                        _player.pause();
                        if ($(".popup-study").length) {
                            $(".popup-study").find(".tit").html("成为VIP吧~");
                            $(".popup-study").find(".btn-box").html("");
                            $(".popup-study").show();
                            $(".mask").show();
                        } else if ($(".popup-becomevip").length) {
                            $(".popup-becomevip").show();
                            $(".mask").show();
                        }
                    }
                })
                svtime = $("#svtime").val();
                if (svtime > 10) {
                    _player.currentTime(svtime);
                    $("#svtime").val(0);
                }

            }
        });

    });
    if (window.screen.width < 1400) {
        $(".talk").hide();
    }
    $("#my-video").dblclick(function () {
        $(".vjs-fullscreen-control").click();
    });
    $("#my-video").bind("contextmenu", function (e) {
        return false;
    });

    // 点击收藏
    $('.v-video').on('click', '.collect', function () {
            var _this = $(this);
            if (!_this.hasClass('cur')) {
                _this.addClass('cur').find('.tips').show();
                setTimeout(function () {
                    _this.find('.tips').hide();
                }, 2000);
            }
        })
        // 点击手机播放
        .on('mouseover', '.phone', function () {
            var _this = $(this);
            if (!_this.hasClass('cur')) {
                _this.addClass('cur').find('.tips').show();
            } else {
                _this.removeClass('cur').find('.tips').hide();
            }
            return false;
        })
        .on('click', '.phone .tips', function () {
            return false;
        })
        // 点击关闭观看时间、免费观看提示
        .on('click', '.qjplayer-tips-close', function () {
            $(this).parents('.qjplayer-tips').hide();
            $('.v-video').removeClass('v-video-mini').addClass('v-video-normal');
            $('#area').removeAttr('style');
            $('.v-video').attr("cmd", 'yes');
            $.disable_cloose();
        })
        // 点击关闭、展示右侧列表
        .on('click', '.iplay-bar', function () {
            if ($(this).parents('.v-video').hasClass('v-video-full')) {
                $(this).parents('.v-video').removeClass('v-video-full');
            } else {
                $(this).parents('.v-video').addClass('v-video-full');
            }
        });
    // 任意点击关闭手机观看弹窗
    $('body').on('click', function () {
        if ($('.v-video').find('.phone').hasClass('cur')) {
            $('.v-video').find('.phone').removeClass('cur').find('.tips').hide();
        }
    });
    // 鼠标移入移出播放器按钮显示隐藏
    $('#my-video, .iplay-bar').hover(function () {
        $('.iplay-bar').show();
    }, function () {
        $('.iplay-bar').hide();
    });

    // 鼠标移入移出播放器按钮显示隐藏
    $('#area').hover(function () {
        if ($(window).scrollTop() > $('.area-l').offset().top + $('.area-l').height()) {
            $('.qjplayer-tips-mini').show();
            $('.qjplayer-btn-big').show();
            clearTimeout(timeID);
            minihide();
        }
    });

    // 网页全屏
    $('.v-video').on('click', '.vjs-webfullscreen-control', function () {
        $(this).removeClass('vjs-webfullscreen-control').addClass('vjs-exitwebfullscreen-control');
        $('body').addClass('webfullscreen');
    });
    // 退出网页全屏
    $('.v-video').on('click', '.vjs-exitwebfullscreen-control', function () {
        $(this).addClass('vjs-webfullscreen-control').removeClass('vjs-exitwebfullscreen-control');
        $('body').removeClass('webfullscreen');
    });

    // 是否显示为迷你播放器
    $('#area').Tdrag({
        scope: 'body',
        disable: true,
        disableInput: '.disable'
    });
    qjplayerMini();
    $(window).on('scroll', function () {
        qjplayerMini();
    });
    $(window).on('resize', function () {
        qjplayerMini();
    });
    // 迷你播放器播放
    $('.qjplayer-btn-big').on('click', '.qjplayer-play', function () {
        player.play();
    });
    // 迷你播放器暂停
    $('.qjplayer-btn-big').on('click', '.qjplayer-pause', function () {
        player.pause();
	});

	$('.wait').on('click', function() {
		$(this).hide();
		player.play();
	})
});

function minihide() {
    timeID = setTimeout("$('.qjplayer-tips-mini').hide();$('.qjplayer-btn-big').hide();", 5000)
}
//通过id获取DOM
function get(index) {
    return document.getElementById(index);
}
//修改播放地址并播放
function writeAddressAndPlay(index, url, type) {
    //播放器操作
    if ($("#area").find(".wait").length) {
        $("#area").find(".wait").remove();
    }
    setsrc(index, url, type ? type : "rtmp/flv");
    play(index);
}
//高清标清切换就是应用名加减HD
function changeUrl(video) {
    var index = $(video).text();
    //获取当前播放的url
    var CurrentUrl = getCurrentAddr(player);
    $(".vjs-menu-item").removeClass("vjs-selected");
    $(video).addClass("vjs-selected");
    if (index == "高清") {
        CurrentUrl = 'video/' + '480P';
    } else if (index == '超清') {
        CurrentUrl = 'blob:https://v.qq.com/8256529e-bf03-45a4-8e16-ad6c7ae88217';
        console.log(CurrentUrl);
    } else {
        CurrentUrl = CurrentUrl + '270P'
    }
    //修改地址并播放
    writeAddressAndPlay(player, CurrentUrl);
}
//获取当前类型
function getCurrentType(idnex) {
    return idnex.currentType();
}
//获取当前播放地址
function getCurrentAddr(index) {
    return index.currentSrc();
}
//获取当前播放时间
function getCurrentTime(index) {
    return index.currentTime();
}
//获取当前网络状态
function networkState(index) {
    return index.networkState();
}
//修改播放地址
function setsrc(index, url, type) {
    index.src({
        type: type,
        src: url
    });
}
//重载播放器
function reset(index) {
    index.reset();
    index.load();
}
//播放
function play(index) {
    if ($(".popup-vip").length) {
        $(".popup-vip").show();
        $(".mask").show();
        return false;
    } else if ($(".popup-study").length) {
        $(".popup-study").show();
        $(".mask").show();
        return false;
    } else if ($("#nologin").length) {
        $("#nologin").show();
        $(".mask").show();
        return false;
    }
    index.play();
}
//暂停
function pause(index) {
    index.pause();
}
// 迷你播放器
function qjplayerMini() {
    if ($(window).scrollTop() > $('.area-l').offset().top + $('.area-l').height()) {
        if ($('.v-video').attr("cmd") != "yes") {
            $('.v-video').removeClass('v-video-normal').addClass('v-video-mini');
            $.disable_open();
            minihide();
        }
    } else {
        $('.v-video').removeClass('v-video-mini').addClass('v-video-normal');
        $('#area').removeAttr('style');
        $.disable_cloose();
    }
}