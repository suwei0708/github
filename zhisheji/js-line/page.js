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
            next: 'icon-b-r',
            prev: 'icon-b-l'
        });

        $('#sld').on('mouseover', function() {
            $('.icon-b-l, .icon-b-r').show();
        }).on('mouseout', function() {
            $('.icon-b-l, .icon-b-r').hide();
        });
    }

    // 推荐设计师关注
    $('.designer,.user-homepage').on('click', '.btn', function() {
        var followid=$(this).attr("followid");
        var _this=$(this);
        if(!$(this).hasClass('dis')) {
            $.get("/userinfo/actfollow/add/"+followid,function(data){
                if(data==0){
                    _this.addClass('dis').html('已关注'); //.removeClass("btn-blue")
                    $('.at-gz').find('.btn-gz').html('已关注作者');
                }
                else if(data==1){
                    _this.addClass('dis').html('相互关注'); //.removeClass("btn-blue")
                    $('.at-gz').find('.btn-gz').html('已相互关注');
                }
                else{
                    $(".h-login .btn-lg").click();
                }
            })
        }
        else {
            $.get("/userinfo/actfollow/del/"+followid,function(data){
                if(data==0||data==1){
                    _this.removeClass('dis').addClass("btn-blue").html('关注');
                    $('.at-gz').find('.btn-gz').html('+ 关注作者');
                }
                else{
                    $(".h-login .btn-lg").click();
                }
            })

        }
    });

    // 首页上传下拉
    $('.iup-box').on('mouseover', function() {
        $(this).addClass('iup-box-hover');
        $(this).find('.iup-list').show();
    }).on('mouseleave', function() {
        $(this).removeClass('iup-box-hover');
        $(this).find('.iup-list').hide();
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
        var replayForm
           replayForm = $(this).parents('.info');
        if($(this).parent('.time').length){
            replayForm=$(this).parent('.time');
        }else{
            $(this).parents('.com-box').find(".btn-replay").addClass("btn-replay-blue").html('<span class="icon-comment"></span> 收起');
        }
        if(replayForm.nextAll('.reply-form').length>0) {
            replayForm.nextAll('.reply-form').remove();
            $(this).parents('.com-box').find(".btn-replay").removeClass("btn-replay-blue").html('<span class="icon-comment"></span> 回复');
        }
        else {
            replayForm.after($("#tmp").html());
            replayForm.nextAll('.reply-form').show();
        }
    });
    // 点击取消
    $('.ct-comment').on('click', '.btn-cancel', function() {
        var replayForm = $(this).parents('.reply-form');
        $(this).parents('.com-box').find(".btn-replay").removeClass("btn-replay-blue").html('<span class="icon-comment"></span> 回复');
        replayForm.remove();
    });

    //个人主页与作品页 回复内容
    $('.ct-comment').on('click', '.btn-sure', function() {
        // // 判断文本内容非空
        // if(!$.trim($(this).parents('.reply-form').find('.text').val())) {
        //     $.msgBox.Alert(null, '回复内容不能为空');
        //     return false;
        // }
        // // 判断回复盒子是否存在，不存在创造追加
        // if(!$(this).parents('li').find('.reply-box').length) {
        //     $(this).parents('li').append('<div class="reply-box"></div>');
        // }
        // var combox=$(this).parents(".com-box");
        // var message=$.trim($(this).parents('.reply-form').find('.text').val());
        // $.post("/userinfo/savepost",{tid:combox.attr("tid"),pid:combox.attr("pid"),tuid:combox.attr("tuid"),fid:combox.attr("fid"),tusername:combox.attr("tusername"),message:message},function(data){
        //     var obj=JSON.parse(data)
        //     if(obj.success==1){
        //         var page=$(".page .cur").text();
        //         gopage(page);
        //     }
        // })
        // 判断文本内容非空
        if(!$.trim($(this).parents('.reply-form').find('.text').val())) {
            $.msgBox.Alert(null, '回复内容不能为空');
            return false;
        }
        $(this).attr("disabled","disabled");
        var __this=$(this);
        // 判断回复盒子是否存在，不存在创造追加
        if(!$(this).parents('li').find('.reply-box').length) {
            $(this).parents('li').append('<div class="reply-box"></div>');
        }
        var replyform=$(this).parents('.reply-form');
         var replybox=$(this).parents('li').find('.reply-box');
        var combox=$(this).parents(".com-box");
        var message=$.trim($(this).parents('.reply-form').find('.text').val());
        $.post("/userinfo/savepost",{tid:combox.attr("tid"),pid:combox.attr("pid"),tuid:combox.attr("tuid"),fid:combox.attr("fid"),tusername:combox.attr("tusername"),message:message},function(data) {
            if(data.length>1000){
                $(".h-login .btn-lg").click();
                return false;
            }else {
                var obj = JSON.parse(data)
                __this.removeAttr("disabled");
                if (data.msg == "尚未实名认证") {
                    tipPhone();
                }
                replyform.find(".btn-cancel").click();
                if (obj.success == 1) {
                    replybox.append(obj.tmp);
                }
            }
        });
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

    // 内容页点赞、收藏
    $('.content-box, .fix-topbar,.praise-box').on('click', '.praise', function() {
        var tid=$(this).attr("tid");
        var _this=$(this)
        if(!$(this).hasClass('praise-ok')) {
            $.get("/userinfo/actrecommend/add/"+tid,function(data){
                if(data==1){
                    $('.content-box, .fix-topbar,.praise-box').find('.praise').addClass('praise-ok').find('.num').html(+_this.find('.num').text() + 1);
                    // 最新点赞增加头像
                    var avator=$(".h-avatar img").eq(0).attr('src');
                    var href=$(".h-avatar a").eq(0).attr('href');
                    var dom = '<a href="'+href+'" title=""><img src="'+avator+'" height="30" width="30" alt=""></a>';
                    $('.ct-tip').find('.view h4').after(dom);
                }
                else if(data==2){

                }
                else{
                    $(".h-login .btn-lg").click();
                }
            })

        }
    }).on('click', '.edit', function() {
            window.location.href = $(this).data('src');
        });
    $('.ct-share, .fix-topbar').on('click', '.collect', function() {
        if($(this).hasClass('dis')) {
            var tid=$(".praise").attr("tid");
            $.get("/userinfo/actfav/del/"+tid+"/0",function(data){
                if(data==1){
                    tipSave('suc', '取消收藏成功！');
                    $('.ct-share, .fix-topbar').find('.collect').removeClass('dis').find('.text').html('收藏');
                    $('.ct-share, .fix-topbar').find('.collect .num').html(+$('.ct-share .collect').find('.num').html() - 1);
                }else{
                    $(".h-login .btn-lg").click();
                }
            })

        }
        else {
            $('.popup-collect').show(); centerObj('.popup-collect .popup');
        }
    })


    // 点赞后的关注
    $('.at-gz').on('click', '.btn-gz', function() {
        if($(this).text() == '已关注作者') {
            $(".info .btn-blue").click();
            $(this).text('+ 关注作者');
            $('.designer').find('.btn').removeClass('dis').html('关注');
        }
        else {
            $(".info .btn-blue").click();
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
        $('#rpfm').hide();
    });

    // 细节点评提示框
    $('.content .cpimgbox').on('mouseover', 'img', function() {
            if(is_message==1){
                return false;
            }
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
        $.get("/login/status",function(data){
            if(data==0){
                $(".h-login .btn-lg").click();
                return false;
            }
            else {
                cropperImg = _this.parents('.cpimgbox').find('img');
                var cropperImage = cropperImg.clone();
                if(cropperImage.attr("src")!="undefined"&&cropperImage.attr("src")!="") {
                    $("#picurl").val(cropperImage.attr("src"));
                }else if(cropperImage.attr("mysrc")!="undefined"&&cropperImage.attr("mysrc")!=""){
                    $("#picurl").val(cropperImage.attr("mysrc"));
                }else{
                    $("#picurl").val(cropperImage.attr("data-path"));
                }
                cropperImg.after(cropperImage);
                cropperImg.hide();
                if(jcropApi || !cropperImg){
                   return clearSelect();
                }
                jcropApi = $.Jcrop(cropperImage, {
                   onSelect: doSelect,
                   onChange: doSelect,
                   onRelease: clearSelect,
                   setSelect: [0, 0, 0, 0]
                });
            }
        })
    });

    function clearSelect() {
        cropperImg.show();
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
        $("#mycomment").find("textarea").val($.trim($('#cp_comment').val()))
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
        //console.log(jcropApi.tellSelect()); //获取选框的值（实际尺寸）
        clearSelect();
        $(".ct-comment-box .btn-comment").click();
        $(".newhf").hide();
        $("#cpsubmit").show();
    });

    // // 点赞提交评论
    // $('#mycomment,#all-comment').on('click', '.com-box .btn-praise', function() {
    //        var pid=$(this).attr('pid');
    //        var tid=$(this).attr("tid");
    //        var _this=$(this);
    //        var num=_this.find(".num").text();
    //        $.post("/userinfo/msgdz/",{pid:pid,tid:tid},function(data){
    //            data = JSON.parse(data);
    //            tipSave(data.icon, data.msg,1000);
    //            if(data.icon=="suc"){
    //                 num=parseInt(num)+1;
    //                _this.find(".num").html(num);
    //            }
    //        })
    // })

        //删除个人评论页
        $('body').on('click', '#all-comments .btn-del', function() {
            var _this=$(this);
            if($(this).attr("dataid").length){
                if(confirm("确定删除该评论")) {
                    $.post("/userinfo/delavatormsg", {cid: _this.attr("dataid")}, function (data) {
                        if (data == 1) {
                            if (_this.parents(".reply-box").length) {
                                _this.parents(".reply-box").remove();
                            } else {
                                _this.parents("li").remove();
                            }
                        } else {
                            $.msgBox.Alert(null, '删除评论失败！');
                        }
                    })
                }
            }
        })

    //删除作品页
    $('body').on('click', '#all-comment .actdel', function() {
        var _this=$(this);
        if($(this).attr("dataid").length){
            if(confirm("确定删除该评论")) {
                $.post("/zuopin/delmsg", {id: _this.attr("dataid")}, function (data) {
                    if (data == 1) {
                        if (_this.parents(".com-box").length) {
                            _this.parents(".com-box").remove();
                        } else {
                            _this.parents("li").remove();
                        }
                    } else {
                        $.msgBox.Alert(null, '删除评论失败！');
                    }
                })
            }
        }
    })

    //删除作品页回复
    $('body').on('click', '#all-comment .actdelo', function() {
        var _this=$(this);
        if($(this).attr("dataid").length){
            if(confirm("确定删除该评论")) {
                $.post("/zuopin/delreply", {id: _this.attr("dataid")}, function (data) {
                    if (data == 1) {
                        if (_this.parents(".com-box").length) {
                            _this.parents(".com-box").remove();
                        } else {
                            _this.parents("li").remove();
                        }
                    } else {
                        $.msgBox.Alert(null, '删除评论失败！');
                    }
                })
            }
        }
    })


    // 个人主页与作品页 提交评论
    $('.ct-comment-box').on('click', '.btn-comment', function() {
        var _this = $(this).parents('.ct-comment-box');
        if($(this).hasClass('dis')) {
            return false;
        }
        if(location.href.indexOf("space-uid")>0){
            if(!$.trim(_this.find('.textarea').val())) {
                $.msgBox.Alert(null, '评论不能为空！');
                return false;
            }
            var combox=$(".ct-comment-box");
            var message=$.trim(_this.find('.textarea').val());
            $.post("/userinfo/savepost",{tid:combox.attr("tid"),pid:combox.attr("pid"),tuid:combox.attr("tuid"),fid:combox.attr("fid"),tusername:combox.attr("tusername"),message:message},function(data){

                if(data.length>1000){
                    $(".h-login .btn-lg").click();
                    return false;
                }else {
                    var obj=JSON.parse(data)
                    if (obj.msg == "尚未实名认证") {
                        tipPhone();
                    }
                    if (obj.success == 1) {
                        _this.find('.textarea').val('');
                        _this.find('.btn-comment').addClass('dis');
                        _this.find('.num').html('500');
                        if ($(".page-words").length > 0) {
                            var page = $(".page-words .page .cur").text();
                            gopages(page);
                        } else {
                            var page = $(".page-comment .page .cur").text();
                            gopage(page);
                        }
                    }
                }
            })
        }else {
            if (!$.trim(_this.find('.textarea').val())) {
                 $.msgBox.Alert(null, '评论不能为空！');
                return false;
            }

            var cp_x=$("#cp_x").val();
            var cp_y=$("#cp_y").val();
            var cp_w=$("#cp_w").val();
            var cp_h=$("#cp_h").val();
            var nowimg=$("#picurl").val();
            var combox = $("#btn-box");
            var message = $.trim($(this).parents('.ct-comment-box').find('.textarea').val());
            $.post("/userinfo/savepost", {
                istop: 1,
                picurl: $('#rsdpic').val(),
                tid: combox.attr("tid"),
                pid: combox.attr("pid"),
                tuid: combox.attr("tuid"),
                fid: combox.attr("fid"),
                tusername: combox.attr("tusername"),
                message: message,
                cp_x:cp_x,
                cp_y:cp_y,
                cp_w:cp_w,
                cp_h:cp_h,
                nowimg:nowimg,
            }, function (data) {
                var obj = JSON.parse(data)
                if(obj.msg=="尚未实名认证"){
                    tipPhone();
                }
                if (obj.icon = "suc") {
                    _this.find('.textarea').val('');
                    _this.find('.btn-comment').addClass('dis');
                    _this.find('.num').html('500');
                    gopage(1);
                } else {
                    tipSave(data.icon, data.msg, 1000);
                }
            })
        }
        // var imgurl = '<div class="onimg"><img src=' + $('.ct-comment-box .btn-add input').val() + '></div>';
        // // console.log(X, Y);
        // // 追加到全部评论
        // var dom = '<li>'
        //             + '<div class="com-box">'
        //                 + '<div class="fr btn-box">'
        //                     + '<a href="javascript:;" class=""><span class="icon-praise2"></span>赞(<span class="num">52</span>)</a>'
        //                     + '<a href="javascript:;" class="btn-replay">回复</a>'
        //                 + '</div>'
        //                 + '<a href="#" class="fll avatar">'
        //                     + '<img src="images/avatar.gif" height="54" width="54">'
        //                 + '</a>'
        //                 + '<div class="tt"><a href="#" class="blue">痞先森</a> <span class="time">3小时前</span></div>'
        //                 + '<div class="info">' + $.trim(_this.find('.textarea').val()) + imgurl + '</div>'
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
        //
        // $('#all-comment').prepend(dom);
        // _this.find('.textarea').val('');
        // $('body, html').animate({scrollTop: $('#all-comment').offset().top},100);
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
    }
    loginhead();

    $(".myavator").each(function(){
        var _this=$(this);
        var width=_this.attr("width");
        _this.on("error",function(){
            var img="small";
            if(width>100){
                img="big";
            }
            else if(width<100&&width>50) {
                img = "middle";
            }
            _this.attr("src","http://cache.zhisheji.com/uc_server/images/noavatar_"+img+".gif");
        })
    })


});
})(jQuery);

var nowimg = $(".preview").length;
var nowimg2 = $(".previews").length;
function xianshi() {
    var win = ($(window).scrollTop() + $(window).height());
    $(".preview").each(function() {
        var top = $(this).offset().top;
        if (top < win) {
            if ($(this).attr("mysrc") != "") {
                $(this).attr("src", $(this).attr("mysrc"));
                $(this).attr("mysrc", "");
            }
        }
    });

    $(".previews").each(function() {
        var _mythis=$(this);
        var top = $(this).offset().top;
        if (top < win) {
            if (_mythis.attr("mysrc") != ""&&_mythis.attr("mysrc")!="undefined") {
                if (_mythis.attr("mysrc").indexOf("cache.zhisheji.com/data/attachment") > 0) {
                    _mythis.attr("src",_mythis.attr("mysrc") + "?imageMogr2/quality/90/thumbnail/!100p")
                } else if (_mythis.attr("mysrc").indexOf("cache.zhisheji.com/uc_server/data") > 0) {
                    _mythis.attr("src", _mythis.attr("mysrc") + "&imageMogr2/quality/90/thumbnail/!100p")
                } else {
                    _mythis.attr("src", $(this).attr("mysrc"))
                }
                _mythis.attr("mysrc", "");
            }
        }
    });
}
$(window).scroll(function() {
    if (nowimg > 0 || nowimg2 > 0) {
        xianshi();
    }
});
if (nowimg > 0 || nowimg2 > 0) {
    xianshi();
}

//操作作品
function modthreads(tid,type){
    if(confirm("是否确认该操作")) {
        if (type == "del") {
            $.post("/zuopin/delpro", {id: tid}, function (data) {
                if (data == 1) {
                    location.href = '/'
                } else {
                    $.msgBox.Alert(null, '删除作品失败！');
                }
            })
        }
        else {
            $.post("/zuopin/tjpro", {id: tid, type: type}, function (data) {
                if (data == 1) {
                    $.msgBox.Alert(null, '操作成功');
                    location.reload();
                } else {
                    $.msgBox.Alert(null, '作品推荐失败！');
                }
            })
        }
    }
}

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



