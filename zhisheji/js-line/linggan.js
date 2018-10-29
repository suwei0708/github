(function($) {
$(function() {
    // 瀑布流
    if ($('#waterfall').length) {
        waterfall();
        $(window).on('resize', function() {
            waterfall();
        });
    };

    // 监听input字数
    if($('.ct-comment-box .num-box').length) {
        monitorVal('.ct-comment-box .textarea', 500);
    }
    if($('.popup-report .num-box').length) {
        monitorVal('.popup-report .textarea', 500);
    }

    // 点击回复
    $('.ct-comment').on('click', '.btn-replay', function() {
        var replayForm = $(this).parent().nextAll('.reply-form');
        if(replayForm.is(':visible')) {
            $('.ct-comment .reply-form').hide();
        }
        else {
            $('.ct-comment .reply-form').hide();
            replayForm.show();
        }
    });
    // 点击取消
    $('.ct-comment').on('click', '.btn-cancel', function() {
        var replayForm = $(this).parents('.reply-form');
        replayForm.hide();
    });

    // 回复内容
    $('.ct-comment').on('click', '.btn-sure', function() {
        // 判断文本内容非空
        if(!$.trim($(this).parents('.reply-form').find('.text').val())) {
            $.msgBox.Alert(null, '回复内容不能为空');
            return false;
        }
        // 判断回复盒子是否存在，不存在创造追加
        if(!$(this).parents('li').find('.reply-box').length) {
            $(this).parents('li').append('<div class="reply-box"></div>');
        }

        var msgHtml = '<div class="com-box">'
                        +    '<span class="arrow"></span>'
                        +    '<a href="#" class="fll avatar">'
                        +        '<img src="../images/avatar.gif" height="30" width="30">'
                        +    '</a>'
                        +    '<div class="info"><strong><a href="#">木白的白目</a></strong>  回复 <strong><a href="#">样佛爷</a></strong>：' + $(this).parents('.reply-form').find('.text').val() + '</div>'
                        +    '<div class="time">' + '刚刚' + '<a href="javascript:;" class="blue btn-replay">回复</a></div>'
                        +    '<div class="reply-form">'
                        +        '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
                        +        '<div class="btn-box">'
                        +            '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
                        +            '<div class="fr">'
                        +                '<a href="javascript:;" class="btn btn-cancel">取消</a>'
                        +                '<a href="javascript:;" class="btn btn-sure">回复</a>'
                        +            '</div>'
                        +        '</div>'
                        +    '</div>'
                        +'</div>';
        $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);
        $(this).parents('.reply-form').find('.text').val('');
    });

    // 提交评论
    $('.ct-comment-box').on('click', '.btn-comment', function() {
        var _this = $(this).parents('.ct-comment-box');
        if(!$.trim(_this.find('.textarea').val())) {
            $.msgBox.Alert(null, '评论不能为空！');
            return false;
        }

        var imgurl = '<div class="onimg"><img src=' + $('.ct-comment-box .btn-add input').val() + '></div>';
        // console.log(X, Y);
        // 追加到全部评论
        var dom = '<li>'
                    + '<div class="com-box">'
                        + '<div class="fr btn-box">'
                            + '<a href="javascript:;" class="btn-praise"><span class="icon-praise2"></span>赞(<span class="num">52</span>)</a>'
                            + '<a href="javascript:;" class="btn-replay">回复</a>'
                        + '</div>'
                        + '<a href="#" class="fll avatar">'
                            + '<img src="../images/avatar.gif" height="54" width="54">'
                        + '</a>'
                        + '<div class="tt"><a href="#" class="blue">痞先森</a> <span class="time">3小时前</span></div>'
                        + '<div class="info">' + $.trim(_this.find('.textarea').val()) + imgurl + '</div>'
                        + '<div class="reply-form">'
                            + '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
                            + '<div class="btn-box">'
                                + '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
                                + '<div class="fr">'
                                    + '<a href="javascript:;" class="btn btn-cancel">取消</a>'
                                    + '<a href="javascript:;" class="btn btn-sure">回复</a>'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</li>';

        $('#all-comment').prepend(dom);
        _this.find('.textarea').val('');
        $('body, html').animate({scrollTop: $('#all-comment').offset().top},100);
    });

    // 设计师关注
    $('.designer').on('click', '.btn', function() {
        if(!$(this).hasClass('dis')) {
            $('.designer').find('.btn').addClass('dis').html('<span>已关注</span><span class="h">取消关注</span>');
        }
        else {
            $('.designer').find('.btn').removeClass('dis').html('关注');
        }
    });

    if($('.lg-matchcolor').length) {
        var k = $('.lg-matchcolor');
        k.find('li').eq(0).addClass('first');
        // 判断颜色选中
        selectColor(k);

        // 颜色拖拽
        var c, g, a, b, f;
        var p = !1;
        var minWith = 13; // 百分比宽度 154/1220
        k.on('mousedown', 'span.separator', function(e) {
            p = !0;
            c = e.clientX;
            g = $(this).parents('li');
            a = k.find('li').eq(g.index() - 1);
            b = k.find('li').eq(g.index());
            f = k.find('li').eq(g.index() - 1);
            e.preventDefault();
            return !1
        })
        .on('mousemove', function(d) {
            d.preventDefault();
            if(!p){return false;}
            (e = d.clientX - c, seWidth = (g.width() - e) / k.width() * 100,
            firWidth = (a.width() + e) / k.width() * 100,
            addWidth = seWidth + firWidth,
            minWith >= firWidth && (firWidth = minWith, seWidth = addWidth - firWidth),
            minWith >= seWidth && (seWidth = minWith, firWidth = addWidth - seWidth),
            g.width(seWidth + '%'),
            a.width(firWidth + '%'),
            b.width(seWidth + '%'),
            f.width(firWidth + '%'),
            a.find('.color-controls').find('.colorwidth').html(Math.round(firWidth) + '%'),
            g.find('.color-controls').find('.colorwidth').html(Math.round(seWidth) + '%'));
            c = d.clientX;
            return !1
        });
        $(document).on('mouseup', function(a) {
            a.preventDefault();
            if(!p){return false;}
            matchcolor(k);
            p = !1;
            return !1
        });

        // 颜色选择器
        colorPicker('.lg-matchcolor .custom-btn');

        // 颜色删除
        k.on('click', '.remove-btn', function() {
            $(this).parents('li').remove();
            var $widthText = parseInt(100 / $(k).find('li').length) + '%';
            $(k).find('li').width($widthText);
            $(k).find('.colorwidth').html($widthText);
            k.find('li').eq(0).addClass('first');
            matchcolor(k);
            selectColor(k);
        });

        // 增加选取颜色
        $('.lg-colorbox').on('click', '.c', function() {
            if($('.lg-matchcolor').find('li').length < 5 && !$(this).hasClass('cur')) {
                var $li = '<li style=" background: ' + getHexBackgroundColor($(this).find('a')) + '">'
                            + '<div class="color-controls">'
                                + '<div class="colortext">' + getHexBackgroundColor($(this).find('a')) + '</div>'
                                + '<div class="colorwidth"></div>'
                                + '<a rel="nofollow" href="javascript:;" class="remove-btn">'
                                    + '<span class="icon-shanchu"></span>'
                                + '</a>'
                                + '<a href="javascript:;" class="custom-btn">'
                                    + '<span class="icon-youqitong"></span>'
                                + '</a>'
                                + '<span class="separator"></span>'
                            + '</div>'
                        + '</li>'
                $(this).addClass('cur');
                $('.lg-matchcolor').find('ol').append($li);
                $('.lg-matchcolor').find('li').last().trigger('click');
                var $widthText = parseInt(100 / $(k).find('li').length) + '%';
                $(k).find('li').width($widthText);
                $(k).find('.colorwidth').html($widthText);
                colorPicker('.lg-matchcolor .custom-btn');
            }
            else {
                tipSave('fail', '最多只能选择5个颜色哦！', 1000);
            }
        });
    };

    // 求解点击
    $('.lg-list').on('click', '.btn-que', function() {
        var _this = $(this);
        if(_this.hasClass('btn-gray')) {
            _this.find('.add').remove();
            _this.removeClass('btn-gray').addClass('btn-red');
            _this.find('.num').html(+_this.find('.num').html() - 1);
        }
        else if(_this.hasClass('btn-red')) {
            _this.removeClass('btn-red').addClass('btn-gray');
            _this.append('<span class="add" style="display: none">+1</span>');
            _this.find('.add').show().animate({top: '-15px'}, 100);
            _this.find('.num').html(+_this.find('.num').html() + 1);
            setTimeout(function() {
                _this.find('.add').fadeOut();
            }, 500);
        }
    });

    // 详情页点赞
    $('.praise-box').on('click', '.praise', function() {
        if(!$(this).hasClass('praise-ok')) {
            $('.praise-box').find('.praise').addClass('praise-ok').find('.num').html(+$(this).find('.num').text() + 1);
        }
    });
});
})(jQuery);

// 瀑布流位置控制
function waterfall() {
    var num = parseInt(jQuery(window).width() / 260);
    jQuery('#waterfall').css({
        'width': num * 260,
        'left': '10px'
    });
    jQuery('#waterfall').BlocksIt({
        numOfCol: num,
        offsetX: 10,
        offsetY: 10
    });
    if(!jQuery('#waterfall-more').length) {
        jQuery('#waterfall').after('<div id="waterfall-more"><img src="http://www.zhisheji.com/template/zsj_pc2017/images/loading25.gif"></div>');
        jQuery('#waterfall-more').hide();
    }
}

// 判断是否加载数据
function checkScrollSlide() {
    var $lastBox = jQuery('#waterfall>li').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = jQuery(window).scrollTop();
    var documentH = jQuery(window).height();
    return (lastBoxDis < scrollTop + documentH) ? true : false;
}

// 颜色改变执行函数，跳转链接
function matchcolor(obj) {
    var color = null;
    jQuery.each(obj.find('li'), function(index) {
        color += jQuery(this).find('.colortext').html().replace('#', '_');
        color += jQuery(this).find('.colorwidth').html().replace('%', '');
    });
    if(color != null) {
        color = color.replace('null_', '');
    }
    // 根据color值来跳转地址
    console.log(color);
    if(color == null) {
        window.location.href = '灵感.html'
    }
}

// 判断当前颜色是否选中
function selectColor(obj) {
    jQuery('.lg-colorbox').find('.c').removeClass('cur');
    jQuery.each(jQuery(obj).find('li'), function(i) {
        var $color = jQuery(this).find('.colortext').html();
        jQuery.each(jQuery('.lg-colorbox').find('.c'), function(index, val) {
            if(getHexBackgroundColor(jQuery(this).find('a')) == $color) {
                jQuery(this).addClass('cur');
            }
        });
    });
}

// 颜色选择器
function colorPicker(obj) {
    jQuery.each(jQuery(obj), function(i) {
        jQuery(this).ColorPicker({
            flat: false,
            color: getHexBackgroundColor(jQuery(this).parents('li')),
            onSubmit: function(hsb, hex, rgb, el) {
                console.log(jQuery(el))
                jQuery(el).parents('li').css('backgroundColor', '#' + hex);
                jQuery(el).parents('li').find('.colortext').html('#' + hex);
                jQuery(el).ColorPickerHide();
            }
        });
    });
}

// 颜色转换成hex
function getHexBackgroundColor(dom) {
    var rgb = jQuery(dom).css('background-color');
    if (rgb.indexOf('#') == '-1') {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    return rgb;
}