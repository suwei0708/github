$(function() {
    var MASK = $('#mask');
    // 首页轮播
    if($('.swiper1').find('.swiper-slide').length > 1) {
        new Swiper('.swiper1',{
            autoplay: 5000,//可选选项，自动滑动
            pagination : '.pagination1',
            loop: true,
        });
    };

    // 引导页轮播
    if($('.swiper-guide').find('.swiper-slide').length > 1) {
        new Swiper('.swiper-guide',{
            autoplay: false,//可选选项，自动滑动
            pagination : '.pagination-guide',
            loop: false,
        });
    };

    //获取键盘搜索按钮事件
    $('.so-input').on('keypress', function(e) {
        var keycode = e.keyCode;
        //获取搜索框的值
        var searchContent = $.trim($(this).val());
        if (keycode == '13') {
            e.preventDefault();
            //请求搜索接口
            if (!searchContent) {
                alert('请输入检索内容！');
            }
            else {
                $('.so-input').val('');
                window.location.href = '搜索结果页.html';
            }
        }
    });

    // 清空搜索内容
    $('.so-txt').on('click', '.ico-close', function() {
        $('.so-input').val('');
        $('.so-txt').find('.ico-close').hide();
    });

    // 是否显示搜索清空按钮
    if($('.so-input').length) {
        soInputVal();
        $('.so-input').bind('input propertychange', function() {
            soInputVal();
        });
    };
    function soInputVal() {
        if(!$('.so-input').val()) {
            $('.so-txt').find('.ico-close').hide();
        }
        else {
            $('.so-txt').find('.ico-close').show();
        }
    }

    // 删除历史记录
    $('.so-history').on('click', '.ico-del', function() {
        var result = confirm('确定删除搜索历史？');
        if(result) {
            $('.so-history').remove();
        }
    });

    // 视频点击下拉
    $('.header-list').on('click', 'h2', function() {
        if($('.list-dropdown').is(':hidden')) {
            $(this).find('span').attr({'class': 'ico-aup'});
            $('.list-dropdown').show().find('ul').scrollTop(0);
            $('body, html').css({'overflow': 'hidden', 'height': $(window).height()});
        }
        else {
            $(this).find('span').attr({'class': 'ico-adown'});
            $('.list-dropdown').hide();
            $('body, html').css({'overflow': 'visible', 'height': 'auto'});
        }
    });

    // 视频下载、观看历史、我的收藏 编辑和取消
    var swiper = true; //是否允许左滑
    $('.header-list').on('click', '.record-editor', function() {
        if($(this).text() == '编辑') {
            $(this).text('取消');

            // 左滑复位
            swiper = false;
            $('.swipe-del').find('li').css({
                left: 0,
                'transition': 'none',
                '-webkit-transition': 'none'
            });

            $('.record').addClass('record-editor');
        }
        else {
            $(this).text('编辑');
            swiper = true;
            $('.record').removeClass('record-editor');
        }
    });

    // 视频下载、观看历史、我的收藏 选中与取消
    $('body').on('click', '.record-editor .vip-qb li', function() {
        console.log(11);
        if($(this).find(':checkbox').prop('checked') == false) {
            $(this).find(':checkbox').prop('checked', true);
            $(this).addClass('cur');
        }
        else {
            $(this).find(':checkbox').prop('checked', false);
            $(this).removeClass('cur');
        }
        // 计算选中个数
        $('.record-del-fixed').find('.num').html($('.record-editor .vip-qb').find('.cur').length);
    });

    // 编辑状态阻止a链接跳转
    $('body').on('click', '.record-editor .vip-qb a', function(e) {
        e.preventDefault();
    });

    // 视频下载、观看历史、我的收藏 全选
    $('.record-del-fixed').find('li:eq(0)').on('click', function() {
        var $li = $('.record-editor .vip-qb li');
        var $checkbox = $li.find(':checkbox');
        // 判断checkbox数量是否都选中
        if($li.length != $('.record-editor').find('.cur').length) {
            $checkbox.prop('checked', true);
        }
        else {
            $checkbox.prop('checked', false);
        }
        // 根据选中来给checkbox加样式
        $.each($checkbox, function(i) {
            if($(this).prop('checked') == false) {
                $(this).parents('li').removeClass('cur');
            }
            else {
                $(this).parents('li').addClass('cur');
            }
        });
        // 计算选中个数
        $('.record-del-fixed').find('.num').html($('.record-editor .vip-qb').find('.cur').length);
    });

    // 视频下载、观看历史、我的收藏 删除
    $('.record-del-fixed').find('li:eq(1)').on('click', function() {
        $('.record-editor').find('.cur').remove();
        // 删除成功后刷新页面
        window.location.href = window.location.href;
    });

    // 左滑删除
    swipeLeft();
    // 删除执行操作
    $('.swipe-del').on('touchend', '.btn-delete', function(e) {
        e.preventDefault();
        $(this).parents('li').slideUp('fast', function() {
            $(this).remove();
            window.location.reload();
        })
    });
    $('.swipe-del').on('click', '.btn-delete', function(e) {
        e.preventDefault();
        $(this).parents('li').slideUp('fast', function() {
            $(this).remove();
            window.location.reload();
        })
    });
    // 左滑删除
    function swipeLeft() {
        if(!$('.swipe-del').length) {
            return false;
        }
        function prevent_default(e) {
            e.preventDefault();
        }
        function disable_scroll() {
            $(document).on('touchmove', prevent_default);
        }
        function enable_scroll() {
            $(document).unbind('touchmove', prevent_default)
        }

        var x;
        var oWidth = $('.swipe-del li .btn-delete').outerWidth();
        $('.swipe-del')
            .on('touchstart', 'li', function(e) {
                $('.swipe-del li').css('left', '0px') // close em all
                x = e.originalEvent.targetTouches[0].pageX // anchor point
            })
            .on('touchmove', 'li', function(e) {
                var dx = e.originalEvent.targetTouches[0].pageX - x;
                if(dx < 0 && swiper) {
                    // 左滑
                    $(e.currentTarget).css({
                        left: Math.floor(dx),
                        'transition': 'none',
                        '-webkit-transition': 'none'
                    });

                    if(Math.abs(dx) > $(window).width() / 2 + 30) {
                        $(e.currentTarget).find('.btn-delete').css({
                            'text-align': 'left',
                            right: -Math.abs(dx),
                            width: '9.68rem',
                        });
                    }
                    else if (Math.abs(dx) > oWidth) {
                        $(e.currentTarget).find('.btn-delete').css({
                            'text-align': 'right',
                            right: -Math.abs(dx),
                            width: Math.abs(dx),
                        });
                    }
                    else {
                        $(e.currentTarget).find('.btn-delete').css({
                            'text-align': 'right',
                            right: -oWidth,
                            width: oWidth
                        });
                    }
                }

                if (dx < -oWidth) disable_scroll() // disable scroll once we hit 10px horizontal slide
            })
            .on('touchend', 'li', function(e) {
                var eX = parseInt(e.currentTarget.style.left)
                var new_left;
                if(eX < 0 && swiper) {
                    if(Math.abs(eX) > $(window).width() / 2 + 30) {
                        $(e.currentTarget).find('.btn-delete').trigger('click');
                    }
                    else if (Math.abs(eX) > oWidth) {
                        $(e.currentTarget).animate({
                            left: -oWidth
                        },300);
                        $(e.currentTarget).find('.btn-delete').css({
                            'text-align': 'right',
                            right: -oWidth,
                            width: oWidth
                        });
                    }
                    else {
                        $(e.currentTarget).animate({
                            left: 0
                        },300);
                    }
                }
                // e.currentTarget.style.left = new_left
                $(e.currentTarget).animate({left: new_left}, 200)
                enable_scroll()
            });
    };

    // 控制播放页视频大小
    if($('.play').length) {
        $('#player_a, #ckplayer_a1').css({
            'width': '10rem',
            'height': '5.6rem'
        });
    };

    // 播放页赞
    $('.play-info').on('click', '.zan', function() {
        $(this).addClass('cur').find('.num').html(+$(this).find('.num').html() + 1);
        // 有怼取消怼高亮，并且怼数量-1，
        if($('.play-info').find('.dui').hasClass('cur')) {
            $('.play-info').find('.dui').removeClass('cur').find('.num').html(+$('.play-info .dui').find('.num').html() - 1)
        }
    });

    // 播放页怼
    $('.play-info').on('click', '.dui', function() {
        $(this).addClass('cur').find('.num').html(+$(this).find('.num').html() + 1);
        // 有赞取消赞高亮，并且赞数量-1，
        if($('.play-info').find('.zan').hasClass('cur')) {
            $('.play-info').find('.zan').removeClass('cur').find('.num').html(+$('.play-info .zan').find('.num').html() - 1)
        }
    });

    // 播放页下载
    $('.play-info').on('click', '.down', function() {
        $('.down-tips').css({
            height: $(window).height() - $('.play').height()
        }).show();
        $('.down-tips').find('.list2').css({
            height: $(window).height() - $('.play').height() - $('.down-tips-fixed').outerHeight() - $('.down-tips').find('.tit').outerHeight()
        });
    });
    // 下载弹窗关闭
    $('.down-tips').on('click', '.ico-close2', function() {
        $('.down-tips').hide();
    });
    // 下载弹窗切换
    $('.down-tips-fixed').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.down-tips').find('.list2').hide().eq($(this).index()).show();
    });

    // 播放页收藏
    $('.play-info').on('click', '.collect', function() {
        if(!$('.collect-tips').length) {
            $('body').append('<div class="collect-tips"></div>')
        }
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
            $('.collect-tips').html('已取消收藏').show();
        }
        else {
            $(this).addClass('cur');
            $('.collect-tips').html('收藏成功，可在“我的”目录查看').show();
        }
        setTimeout(function() {
            $('.collect-tips').hide();
        }, 3000);
        $('.collect-tips').on('click', function() {
            $(this).hide();
        });
    });

    // 播放页分享
    $('#play-share').on('click', function(){
        $('.play-share').show();
    });
    $('.play-share').on('click', function() {
        $(this).hide();
    });
    $('.play-share-box').on('click', 'a', function() {
        $('#' + $(this).data('id'))[0].click();
        return false;
    });
    $('.play-share').on('click', '.play-share-cancel', function() {
        $('.play-share').hide();
    });

    // 播放页关注
    $('.play-info').on('click', '.btn-gz', function() {
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur').html('<span class="ico-follow"></span>关注');
        }
        else {
            $(this).addClass('cur').html('<span class="ico-follow2"></span>已关注');
        }
    });

    // 视频播放页切换
    tab('#play-nav', '#play-ct .play-ct');

    // 需求页、问答交流、我的消息 通用 点赞
    $('.demand-list').on('click', '.laud', function() {
        if(!$(this).hasClass('laud-cur')) {
            $(this).addClass('laud-cur').html('<span class="ico ico-laud"></span>' + (+$(this).text() + 1));
        }
    });

    // 需求页、问答交流、我的消息通用 回复
    $('.demand-list').on('click', '.reply', function() {
        $('#text').focus();
    });

    // 需求页、问答交流通用 点击小图展示大图
    $('.demand-list').on('click', '.show-img', function() {
        if(!$('.pinch-box').length) {
            $('.wrap').append('<div class="pinch-box">'
                + '<a class="close" href="javascript:;">X</a>'
                + '<div class="pinch-zoom">'
                    + '<img src="' + $(this).find('img').attr('data-img') + '"/>'
                + '</div>'
            + '</div>')
        }
        else {
            $('.pinch-zoom').find('img').attr('src', $(this).find('img').attr('data-img'))
        }
        $('.pinch-box').show();
        $('.pinch-zoom').each(function () {
            new RTP.PinchZoom($(this), {});
        });

        $('.pinch-box').on('click', '.close', function() {
            $(this).parents('.pinch-box').remove();
        });
        $('.pinch-box').on('click', function() {
            $(this).remove();
        });
        $('.pinch-zoom').on('click', function() {
            return false;
        });
    });

    // 需求页、问答交流通用 判断textarea显示行数
    $('.demand-fixed').on("keyup", '#text', function(){
        var _this = $(this);
        setTimeout(function() {
            var h = document.getElementById('text').scrollHeight;
            var l = document.getElementById('text').value.length;
            if(h != 66 && l > 21) {
                _this.css({'line-height': '0.43rem'});
            }
            else {
                _this.css({'line-height': '0.88rem'});
            }
        }, 100);
    });

    // 评论和需求图片大小判断
    $('#uploadImg').on('change', function(e) {
        var filemaxsize = 1024 * 8;//8M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;

        if(!this.files[0].type.match(/image.*/)) {
            alert('请选择正确的图片!');
            $('#uploadImg').val('');
            return false;
        }
        else if(Size > filemaxsize) {
            alert('图片过大，请重新选择!');
            $('#uploadImg').val('');
            return false;
        };
    });

    // 需求页、问答交流通用 判断是否上传图片
    $('.demand-fixed .file').on('change', function() {
        if(!!$(this).val()) {
            $(this).parents('.ico-pic').addClass('ico-pic-cur');
        }
        else {
            $(this).parents('.ico-pic').removeClass('ico-pic-cur');
        }
    });

    // 弹窗关闭
    $('.popup-box').on('click', '.popup-close', function() {
        $(this).parents('.popup-box').hide();
        MASK.hide();
    });

    // 基本资料设置头像
    // 上传图片
    $('#avatarInput').on('change', function(e) {
        var filemaxsize = 1024 * 8;//8M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;

        if(!this.files[0].type.match(/image.*/)) {
            alert('请选择正确的图片!');
            return false;
        } else {
            if(Size > filemaxsize) {
                alert('图片过大，请重新选择!');
                $(".avatar-wrapper").childre().remove;
                return false;
            }
            var file = target[0].files[0];
            var src = window.URL.createObjectURL(file);
            $('.avatar-wrapper').html('<img id="image" src="' + src + '"/>');
            $('.avatar-box').show();
            var image = document.getElementById('image');
            $(image).on('load', function() {
                $(image).cropper({
                    aspectRatio: 200 / 200,
                    viewMode : 0,//显示
                    dragMode : "move"
                });
            });
        }
    });

    // 完善资料 提交判断非空
    $('.basic-box').on('click', '.btn', function() {
        var QQ = $('.basic-box').find('.txt').eq(0);
        var Mail = $('.basic-box').find('.txt').eq(1);
        if(!$.trim(QQ.val())) {
            alert('QQ号码不能为空!');
            return false;
        }
        if(!$.trim(Mail.val())) {
            alert('邮箱不能为空!');
            return false;
        }
        if(!isEmail($.trim(Mail.val()))) {
            alert('邮箱格式不正确!');
            return false;
        }
        window.location.href = '个人中心.html';
        return false;
    });

    // 设置图片
    $(".avatar-save").on("click", function() {
        var $imgData = $(image).cropper('getCroppedCanvas', {
            width: 200,
            height: 200
        })
        dataurl = $imgData.toDataURL('image/png');
        $('.data-list .img img').attr('src', dataurl);
        $('.avatar-box').hide();
    });

    // 复制内容
    $('.btn-copy').on('click', function() {
        copyToClipboard();
        alert('复制成功！')
    });

    // 基本资料设置头像
    // 上传图片
    $('#avatarInput').on('change', function(e) {
        var filemaxsize = 1024 * 8;//8M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;

        if(!this.files[0].type.match(/image.*/)) {
            alert('请选择正确的图片!');
            return false;
        } else {
            if(Size > filemaxsize) {
                alert('图片过大，请重新选择!');
                $('.avatar-wrapper').childre().remove;
                return false;
            }
            var file = target[0].files[0];
            var src = window.URL.createObjectURL(file);
            $('.avatar-wrapper').html('<img id="image" src="' + src + '"/>');
            $('.avatar-box').show();
            var image = document.getElementById('image');
            $(image).on('load', function() {
                $(image).cropper({
                    aspectRatio: 200 / 200,
                    viewMode : 0,//显示
                    dragMode : "move"
                });
            });
        }
    });

    // 设置图片
    $('.avatar-save').on("click", function() {
        var $imgData = $(image).cropper('getCroppedCanvas', {
            width: 200,
            height: 200
        })
        dataurl = $imgData.toDataURL('image/png');
        $('.data-info .img img').attr('src', dataurl);
        $('.avatar-box, .data-info .img .bg').hide();
    });

    // 开关
    $('.btn_fath').on('click', function() {
        toogle(this);
    });

    // 清理缓存
    $('.cache').on('click', function() {
        $('.cache-list').show();
    });

    // 确定清理缓存
    $('.cache-list').on('click', 'li', function() {
        if($(this).index() == 0) {
            // 清理缓存
            $('.cache').find('.fr').html('0.0M');
        }
        $(this).parents('.cache-list').hide();
    });

    // 退出
    $('.exit').on('click', function() {
        window.location.href = '登录.html';
    });

    // 意见反馈提示
    $('.feedback').on('click', '.tips', function() {
        if($(this).prevAll('.txt').length) {
            $(this).hide();
            $(this).prevAll('.txt').focus();
        }
    });
    $('.feedback').on('blur', '.txt', function() {
        if(!$.trim($(this).val())) {
            $(this).nextAll('.tips').show();
        }
    });

    // 会员中心价格
    $('.member-list').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        if($('.fixed-btn').length) {
            $('.fixed-btn').find('.price').html($(this).find('.price strong').html());
        }
    });

    // 播放页评论框调整
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if($('.demand-fixed').length && isiOS) {
        var boxHeight = $('.demand-fixed').outerHeight();
        $('body').append($('.demand-fixed'));
        if($('.demand-list').is(':hidden')) {
            $('.demand-fixed').hide();
        }
        else {
            $('.demand-fixed').show();
        }

        $('#play-nav').on('click', 'li', function() {
            if($('.demand-list').is(':hidden')) {
                $('body').removeClass('play-wrap');
                $('.demand-fixed').hide();
                // return false;
            }
            else {
                $('body').addClass('play-wrap');
                $('.demand-fixed').show();
            }
        });
    }
});

// tab切换
function tab(tit, list) {
    $(tit).on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(tit).find('.line').animate({
            'width': $(tit).find('.cur a').width(),
            'left': $(tit).find('.cur a').position().left
        }, 200);
        $(list).eq($(this).index()).fadeIn().siblings().hide();
    });
}

// 邮箱验证
function isEmail(str){
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
};

/*复制代码到剪切板*/
function copyToClipboard(){
    var e = document.getElementById("contents");//对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
}

// 模拟开关
function toogle(th) {
    var ele = $(th).children('.move');
    if (ele.attr('data-state') == 'on') {
        ele.animate({
            left: '0.04rem'
        }, 300, function() {
            ele.attr('data-state', 'off');
        });
        $(th).removeClass('on').addClass('off');
    } else if (ele.attr('data-state') == 'off') {
        ele.animate({
            left: '0.48rem'
        }, 300, function() {
            $(this).attr('data-state', 'on');
        });
        $(th).removeClass('off').addClass('on');
    }
}

//图片上传预览
function previewImage(file) {
  var MAXWIDTH  = 90;
  var MAXHEIGHT = 90;
  var div = document.getElementById('preview');
  if (file.files && file.files[0]) {
      div.innerHTML ='<img id=imghead onclick=$("#previewImg").click()>';
      var img = document.getElementById('imghead');
      img.onload = function(){
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        img.width  =  rect.width;
        img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
        img.style.marginTop = rect.top+'px';
      }
      var reader = new FileReader();
      reader.onload = function(evt){img.src = evt.target.result;}
      reader.readAsDataURL(file.files[0]);
  }
  else //兼容IE
  {
    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    var src = document.selection.createRange().text;
    div.innerHTML = '<img id=imghead>';
    var img = document.getElementById('imghead');
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
    div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
  }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight ){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight ){
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else{
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}