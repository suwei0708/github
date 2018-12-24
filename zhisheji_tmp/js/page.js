(function($) {
$(function() {
    // 幻灯片
    if($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'icon-youjiantou',
            prev: 'icon-zuojiantou'
        });
    }

    // 推荐设计师关注
    $('.designer').on('click', '.btn', function() {
        if(!$(this).hasClass('dis')) {
            $('.designer').find('.btn').addClass('dis').html('已关注');
            $('.at-gz').find('.btn-gz').html('已关注作者');
        }
        else {
            $('.designer').find('.btn').removeClass('dis').html('关注');
            $('.at-gz').find('.btn-gz').html('+ 关注作者');
        }
    });

    // 推荐设计师切换
    $('.zsj-box.designer h2').on('mouseover', function() {
        $(this).find('a').addClass('cur').parent().siblings().find('a').removeClass('cur');
        $('.zsj-box.designer').find('.list2').hide().eq($(this).index() - 1).show();
    });

    // 列表页下拉
    $('.tab-tit').on('mouseover', '.tab-li', function() {
        $(this).find('.tab-list').show();
    })
    .on('mouseleave', '.tab-li', function() {
        $(this).find('.tab-list').hide();
    })
    .on('mouseover', '.tab-list-li', function() {
        if($(this).find('.tab-list2').length) {
            $(this).find('.tab-list2').show().parents('.tab-list').addClass('tab-list-cur');
        }
    })
    .on('mouseleave', '.tab-list-li', function() {
        if($(this).find('.tab-list2').length) {
            $(this).find('.tab-list2').hide().parents('.tab-list').removeClass('tab-list-cur');
        }
    });

    // 搜索结果页下拉
    $('.so-box').on('mouseover', '.column', function() {
        $(this).find('.column-list').show();
    })
    .on('mouseleave', '.column', function() {
        $(this).find('.column-list').hide();
    });
    $('.column-list').on('click', 'li', function() {
        $(this).parents('.column').find('em').html($(this).text());
        $(this).parents('.column-list').hide();
    });


    $('.so-box').on('focus', '.txt', function() {
        $(this).parents('.so-box').addClass('hover').find('.so-dropdown').show();
    })
    .on('blur', '.txt', function() {
        var _this = $(this);
        setTimeout(function() {
            _this.parents('.so-box').removeClass('hover').find('.so-dropdown').hide();
        }, 200);
    });

    // 点击回复
    $('.ct-comment').on('click', '.btn-replay', function() {
        var replayForm = $(this).parents('.com-box').find('.reply-form');
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

    // 回复内容 250180921
    $('.ct-comment').on('click', '.btn-sure', function() {
        // 判断文本内容非空
        if($(this).hasClass('dis')) {
            return false;
        }
        // 判断回复盒子是否存在，不存在创造追加
        if(!$(this).parents('li').find('.reply-box').length) {
            $(this).parents('li').append('<div class="reply-box"></div>');
        }

        var msgHtml = '<div class="com-box">'
                            + '<a href="#" class="fll avatar">'
                                + '<img src="images/avatar.gif" height="30" width="30">'
                            + '</a>'
                            + '<div class="info"><strong><a href="#">痞先森</a></strong>  回复 <strong><a href="#">木白的白目</a></strong><span class="time">8小时前</span></div>'
                            + '<div class="info">'
                                + '<a href="javascript:;" class="btn-replay">回复</a>'
                                + '<a href="javascript:;" class="btn-del">删除</a>梵高展的时候有看过油画动画的部分展示，很遗憾没认真仔细的去研究。'
                            + '</div>'
                            + '<div class="reply-form" style="display: none;">'
                                + '<textarea class="text" placeholder="回复 痞先森 :"></textarea>'
                                + '<div class="btn-box">'
                                    + '<a href="javascript:;" class="fll"><span class="icon-biaoqing"></span>添加表情</a>'
                                    + '<div class="fr">'
                                        + '<a href="javascript:;" class="btn btn-sure">回复</a>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>';
        $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);
        $(this).parents('.reply-form').find('.text').val('');
    });

    // 判断评论框字数是否输入
    $('.ct-comment-box .textarea').bind('input propertychange', function() {
        var _this = $(this);
        if (_this.val().length > 0) {
            _this.css('background', '#fff');
            _this.parents('.ct-comment-box').find('.btn-comment').removeClass('dis');
        }
        else {
            _this.css('background', '#f7f8fa');
            _this.parents('.ct-comment-box').find('.btn-comment').addClass('dis');
        }
    });
    // 判断回复框字数是否输入
    $.each($('.ct-comment').find('.text'), function(index, val) {
        var _this = $(this);
        _this.bind('input propertychange', function() {
            if (_this.val().length > 0) {
                _this.parents('.reply-form').find('.btn-sure').removeClass('dis');
            }
            else {
                _this.parents('.reply-form').find('.btn-sure').addClass('dis');
            }
        });
    });


    // 内容页点赞、收藏 20180921
    $('.praise-box, .fix-topbar').on('click', '.praise', function() {
        if(!$(this).hasClass('praise-ok')) {
            $('.praise-box, .fix-topbar').find('.praise').addClass('praise-ok').find('.num').html(+$(this).find('.num').text() + 1);
            // 最新点赞增加头像
            var dom = '<a href="#" title="用户名致设计"><img src="images/system.png" height="30" width="30" alt=""></a>';
            $('.ct-tip').find('.view h4').after(dom);
        }
    })
    // 点击编辑跳转链接
    .on('click', '.edit', function() {
        window.location.href = $(this).data('src');
    });
    $('.ct-share, .fix-topbar').on('click', '.collect', function() {
        if($(this).hasClass('dis')) {
            tipSave('suc', '取消收藏成功！');
            $('.content-box, .fix-topbar').find('.collect').removeClass('dis').find('.text').html('收藏');
            $('.content-box, .fix-topbar').find('.collect .num').html(+$('.content-box .collect').find('.num').html() - 1);
        }
        else {
            $('.popup-collect').show(); centerObj('.popup-collect .popup');
        }
    })

    // 点赞后的关注
    $('.at-gz').on('click', '.btn-gz', function() {
        if($(this).text() == '已关注作者') {
            $(this).text('+ 关注作者');
            $('.designer').find('.btn').removeClass('dis').html('关注');
        }
        else {
            $(this).text('已关注作者');
            $('.designer').find('.btn').addClass('dis').html('已关注');
        }
    });
    $('.at-gz').on('mouseover', function() {
        $(this).show();
    })
    .on('mouseout', function() {
        $(this).hide();
    });
    $('.praise-box').on('mouseover', '.praise-ok', function() {
        $(this).nextAll('.at-gz').show();
    })
    .on('mouseout', '.praise-ok', function() {
        $(this).nextAll('.at-gz').hide();
    });

    // 内容页顶部点击
    $('.fix-topbtn').on('click', '.comment', function() {
        $('body, html').animate({
            scrollTop: $('.ct-comment').offset().top - 30
        }, 100);
    });
    // 判断顶部浮窗是否显示
    if($('.fix-topbar').length) {
        fixTopBar();
        $(window).on('scroll', function() {
            fixTopBar();
        });
    }

    // 监听input字数
    if($('.ct-comment-box .textarea').length) {
        monitorVal('.popup-report .textarea', 500);
        monitorVal('.ct-comment-box .textarea', 500, 'minus');
        monitorVal('#cp_comment', 200, 'minus');
        monitorVal('#rp_comment', 200, 'minus');
    }
    // 评论框回复
    $('.cpmbox').on('click', '.rpl a', function() {
        $('#rpfm').show();
        maskShow();
    });
    $('#rpsubmit').on('click', function() {
        if(!$.trim($('#rp_comment').val())) {
            $.msgBox.Alert(null, '回复不能为空！');
            return false;
        }
        $('#rpfm, .mask').hide();
    });

    // 细节点评提示框
    $('.content .cpimgbox').on('mouseover', 'img', function() {
        var _this = $(this).parents('.cpimgbox');
        if(!_this.find('.tips').length) {
            _this.append('<a href="javascript:;" class="tips"></a>');
        }
        var top;
        if(_this.offset().top - $(window).scrollTop() + _this.height() > $(window).height()) {
            if(_this.offset().top - $(window).scrollTop() > 0) {
                top = ($(window).height() - _this.offset().top + $(window).scrollTop()) / 2;
            }
            else {
                top = $(window).height() / 2 + Math.abs(_this.offset().top - $(window).scrollTop());
            }
        }
        else {
            if(_this.offset().top - $(window).scrollTop() > 0) {
                top = _this.height() / 2;
            }
            else {
                top = (_this.offset().top - $(window).scrollTop() + _this.height()) / 2 + Math.abs(_this.offset().top - $(window).scrollTop());
            }
        }

        _this.find('.tips').css({
            'top': top
        });

        if(!_this.find('.cropper-container').length) {
            _this.find('.tips').show();
        }
    })
    .on('mouseleave', 'img', function() {
        $(this).parents('.cpimgbox').find('.tips').hide();
    })
    .on('mouseover', '.tips', function() {
        $(this).show();
    })
    .on('mouseleave', '.tips', function() {
        $(this).hide();
    });

    // 细节点评图像裁剪
    var cropperImage;
    var jcropApi;
    var form = $('#cpfm');
    var cropperImg;
    $('.content .cpimgbox').on('click', '.tips', function() {
        var _this = $(this);

        cropperImg = $(this).parents('.cpimgbox').find('img');
        if(jcropApi || !cropperImg){
            clearSelect();
        }
        var cropperImage = cropperImg.clone();
        cropperImg.after(cropperImage);
        cropperImg.hide();
        jcropApi = $.Jcrop(cropperImage, {
            onSelect: doSelect,
            onChange: doSelect,
            onRelease: clearSelect,
            setSelect: [0, 0, 0, 0]
        });
    });

    function clearSelect() {
        $('.content').find('.cpimgbox > img').show();
        jcropApi.destroy();
        form.hide();
        jcropApi = null;
    };
    function doSelect(c) {
        form.appendTo($(cropperImg).parent());
        form.css('top', c.y2);
        form.css('left', c.x);
        $('#cp_x').val(c.x);
        $('#cp_y').val(c.y);
        $('#cp_w').val(c.w);
        $('#cp_h').val(c.h);
        if(c.x != 0 && c.y != 0 && c.x2 != 0 && c.y2 != 0) {
            form.show();
        }
    };

    $('#cpfm').on('click', '.cancel', function() {
        clearSelect();
    });
    $('.cpmbox').on('mouseover', function() {
        $(this).find('.fold').show();
    })
    .on('mouseleave', function() {
        $(this).find('.fold').hide();
    });

    // 提交图像裁剪评论
    $('#cpsubmit').on('click', function() {
        if(!$.trim($('#cp_comment').val())) {
            $.msgBox.Alert(null, '评论不能为空！');
            return false;
        }
        $(this).hide();
        $('.newhf').show();
        // 裁剪头像X,Y坐标
        var X = jcropApi.tellSelect().x;
        var Y = jcropApi.tellSelect().y;
        var w = jcropApi.tellSelect().w;
        var h = jcropApi.tellSelect().h;
        $("#cp_x").val(X);
        $("#cp_y").val(Y);
        $("#cp_w").val(w);
        $("#cp_h").val(h);
        console.log(jcropApi.tellSelect()); //获取选框的值（实际尺寸）
        clearSelect();
        // 追加到全部评论
        // var dom = '<li>'
        //             + '<div class="com-box">'
        //                 + '<div class="fr btn-box">'
        //                     + '<a href="javascript:;" class="btn-praise"><span class="icon-praise2"></span>赞(<span class="num">52</span>)</a>'
        //                     + '<a href="javascript:;" class="btn-replay">回复</a>'
        //                 + '</div>'
        //                 + '<a href="#" class="fll avatar">'
        //                     + '<img src="images/avatar.gif" height="54" width="54">'
        //                 + '</a>'
        //                 + '<div class="tt"><a href="#" class="blue">痞先森</a> <span class="time">3小时前</span></div>'
        //                 + '<div class="info">' + $.trim($('#cp_comment').val()) + imgurl + '</div>'
        //                 + '<div class="reply-form">'
        //                     + '<textarea class="text" placeholder="回复 木白的白目 : "></textarea>'
        //                     + '<div class="btn-box">'
        //                         + '<a href="javascript:;" class="fll"><span class="icon-smile"></span>添加表情</a>'
        //                         + '<div class="fr">'
        //                             + '<a href="javascript:;" class="btn btn-cancel">取消</a>'
        //                             + '<a href="javascript:;" class="btn btn-sure">回复</a>'
        //                         + '</div>'
        //                     + '</div>'
        //                 + '</div>'
        //             + '</div>'
        //         + '</li>';
        // $('#all-comment').prepend(dom);
        // $('#cp_comment').val('');
        // $(this).show();
        // $('.newhf, #cpfm, #cropper-mask').hide();
        // $('body, html').animate({scrollTop: $('#all-comment').offset().top},100);
    });

    // 提交评论 20180921
    $('.ct-comment-box').on('click', '.btn-comment', function() {
        var _this = $(this).parents('.ct-comment-box');
        if($(this).hasClass('dis')) {
            return false;
        }

        var imgurl = '<div class="onimg"><img src=' + $('.ct-comment-box .btn-add input').val() + '></div>';
        // console.log(X, Y);
        // 追加到全部评论
        var dom = '<li>'
                    + '<div class="com-box">'
                        + '<a href="#" class="fll avatar">'
                            + '<img src="images/avatar.gif" height="54" width="54">'
                        + '</a>'
                        + '<div class="tt"><a href="#"><strong>痞先森</strong></a></div>'
                        + '<div class="info">' + $.trim(_this.find('.textarea').val())
                            + '<div class="times">'
                                + '<div class="fr btn-box">'
                                    + '<a href="javascript:;" class="btn-del">删除</a>'
                                    + '<a href="javascript:;" class="btn-replay"><span class="icon-comment"></span></a>'
                                    + '<a href="javascript:;" class="btn-praise"><span class="icon-praise2"></span><span class="num">0</span></a>'
                                + '</div>3天前'
                            + '</div>'
                        + '</div>'
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
        _this.find('.btn-comment').addClass('dis');
        _this.find('.num').html('500');
        $('body, html').animate({scrollTop: $('#all-comment').offset().top},100);
    });

    // 发布页
    if($('#img-wrap').length) {
        $.each($('.pro-input'), function(index) {
            if($.trim($(this).find('textarea').val().length) > 0) {
                $(this).parents('.pro-item').find('.pro-describe').html('修改描述');
            }
            else {
                $(this).parents('.pro-item').find('.pro-describe').html('添加描述');
            }
        });
        $('body').on('click', function() {
            $.each($('.pro-input'), function(index) {
                if($(this).is(':visible')) {
                    if($.trim($(this).find('textarea').val().length) > 0) {
                        $(this).parents('.pro-item').find('.pro-describe').html('修改描述');
                    }
                    else {
                        $(this).parents('.pro-item').find('.pro-describe').html('添加描述');
                    }
                }
            });
            $('.pro-input').hide();
        });
        // 20180921修改高度
        $('#img-wrap').on('click', '.pro-describe', function() {
            $('#img-wrap').find('.pro-input').hide();
            $(this).parents('.pro-item').find('.pro-input').show();
            $.each($('.pro-input textarea'), function(index, n) {
                if($(this).parents('.pro-input').find('.num-box').length) {
                    monitorVal($(this), 500, 'minus');
                };
                $(n).bind('input propertychange', function() {
                    var H = n.scrollHeight - parseInt($(n).css('padding-top')) - parseInt($(n).css('padding-bottom'));
                    $(n).css('height', '0');
                    $(n).css('height', H >= 96 ? 96 : H);
                });
            });
            return false;
        })
        .on('click', '.btn-sure', function() {
            $(this).parents('.pro-item').find('.pro-input').hide();
            if($.trim($(this).parents('.pro-input').find('textarea').val().length) > 0) {
                $(this).parents('.pro-item').find('.pro-describe').html('修改描述');
            }
            else {
                $(this).parents('.pro-item').find('.pro-describe').html('添加描述');
            }
        })
        .on('click', '.pro-input', function() {
            return false;
        });

        trageImage();
        $('#img-wrap').find('.pro-btn a').on('click', function() {
            trageImage();
        });
    };

    // 学员评价换一组
    var switchNum = 0;
    $('.btn-switch').on('click', function() {
        var switchDom = $(this).parents('.zsj-box');
        $.each(switchDom.find('.list'), function(i) {
            if ($(this).is(':visible')) {
                switchNum = i + 1
            }
        });
        if (switchNum == switchDom.find('.list').length) {
            switchNum = 0;
        }
        switchDom.find('.list').hide().eq(switchNum).show();
    });

    // 首页文章
    $('.article-course .list').on('mouseover', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
    });
});
})(jQuery);

function fixTopBar() {
    (function($) {
        if($(window).scrollTop() > $('.content').offset().top && $(window).scrollTop() < $('.praise-box').offset().top) {
            $('.fix-topbar').show();
        }
        else {
            $('.fix-topbar').hide();
        }
    })(jQuery);
}

function trageImage() {
    (function($) {
        setTimeout(function() {
            if($('#img-wrap').find('.pro-item').length > 1) {
                $('#img-wrap .pro-item').arrangeable();
            }
        }, 300);
    })(jQuery);
}