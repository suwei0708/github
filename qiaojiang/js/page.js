$(function() {
    // 关闭登录注册弹窗
    $('body').on('click', '.mask', function() {
        if($('.popup-play').is(':visible')) {
            $('.popup-play, .mask').hide();
            $('.popup-play').find('.slideDown').removeClass();
        }
    });
    // 头部不同分辨率下展示情况
    fitHeader();
    goscrollTop();
    $(window).on('resize', function() {
        fitHeader();
        goscrollTop();
    });
    $(window).on('scroll', function() {
        goscrollTop();
    });

    function fitHeader() {
        $(window).width() <= 1520 ? $('.header').addClass('header-min') : $('.header').removeClass('header-min');
        $(window).width() >= 1660 ? $('.header .app').show() : $('.header .app').hide();
        $(window).width() >= 1420 && $('.v-video').length ? $('body').addClass('w1420') : $('body').removeClass('w1420');
        if ($('.header-min').length) {
            $('.header-min').find('.search-hot').hide();
        } else {
            $('.header-min').find('.search-hot').show();
        }
    }

    function goscrollTop() {
        if ($(window).scrollTop() < 1) {
            $('#goBack').parents('li').hide();
        } else {
            $('#goBack').parents('li').show();
        }

        if($('.body-fixed').length) {
            if($(window).scrollTop() > $(window).height()) {
                $('.header').addClass('header-fixed');
                $('.body-fixed').css({
                    'padding-top': $('.header').height()
                });
            }
            else {
                $('.header').removeClass('header-fixed');
                $('.body-fixed').css({
                    'padding-top': 0
                });
            }
        }
    }

    // 幻灯片
    if ($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
			hoverPause: true,
			next: 'qj-youfanye',
			prev: 'qj-zuofanye'
        });
    }


    if ($('#sld2').length) {
        $('#sld2').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            animationComplete: function(i) {
                $('.tab-xyzp > li').eq(i - 1).addClass('cur').siblings().removeClass('cur');
            }
        });
    }

    $('.tab-xyzp > li').click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#sld2 .pagination > li').eq($(this).index()).find('a').click();
    });

    // 导航下拉
    $('.nav').on('mouseover', 'li', function() {
            $(this).addClass('hover').find('.nav-sub').show();
        })
        .on('mouseout', 'li', function() {
            $(this).removeClass('hover').find('.nav-sub').hide();
        });

    //返回顶部
    $('#goBack').on('click', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    if ($('.silder-box').length) {
        //回调函数计数
        var callbackIndex = 0;
        $('.silder-box').mySilder({
            width: 290, //容器的宽度 必选参数!!!!!!
            height: 340, //容器的高度 必选参数!!!!!!
            auto: true, //是否自动滚动
            autoTime: 5, //自动滚动时，时间间隙，即多长滚动一次,单位(秒)
            direction: 'x', //滚动方向,默认X方向
            autoType: 'left', //滚动方向，auto为true时生效
            few: 1, //一次滚动几个，默认滚动1张
            showFew: 4, //显示几个,就不用调css了,默认显示一个
            clearance: 20, //容器之间的间隙，默认为 0
            silderMode: 'linear', //滚动方式
            timeGap: 650, //动画间隙，完成一次动画需要多长时间，默认700ms
            buttonPre: '.btl', //上一个，按钮
            buttonNext: '.btr', //下一个，按钮
            jz: true, //点击时，是否等待动画完成
            runEnd: function() { //回调函数
                callbackIndex++;
                // $('.cj em').text(callbackIndex);
            }
        });
    }

    // 名师介绍滑动效果
    $('.box-msjs').on('mouseover', 'li', function() {
            $(this).find('.post').stop().animate({
                'height': '142px'
            }, 400)
        })
        .on('mouseout', 'li', function() {
            $(this).find('.post').stop().animate({
                'height': '38px'
            }, 200)
        });


    // 滚动条
    if ($("#scroll-list").length) {
        $("#scroll-list").mCustomScrollbar();
    }

    // 登录弹出框
    var mask = $('.mask');
    $('.ico-close').on('click', function() {
        $('.popup-box').hide();
        mask.hide();
    });

    // 判断登录
    $('.box-login').on('blur', '.txt', function() {
            var _this = $(this);
            login(_this);
        })
        .on('focus', '.txt', function() {
            $(this).parents('.input').next('.tip').hide();
        });

    $('.box-login').on('click', '.btn', function() {
        var _this = $('.box-login').find('.txt');
        var loginBox = $('.box-login');
        var name = loginBox.find('[name=qq]');
        var email = loginBox.find('[name=email]');
        var password = "" //loginBox.find('[name=password]');
        var repassword = ""; // loginBox.find('[name=repassword]');
        if ($.trim(name.val()) == '' || $.trim(email.val()) == '') {
            if ($.trim(name.val()) == '') {
                name.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>QQ不能为空').show();
            }
            if ($.trim(email.val()) == '') {
                email.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>邮箱不能为空').show();
            }
            if ($.trim(password.val()) == '') {
                // password.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>密码不能为空').show();
            }
            if ($.trim(repassword.val()) == '') {
                // repassword.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>密码不能为空').show();
            }
            return false;
        } else {
            if (!isEmail($.trim(email.val()))) {
                email.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>邮箱格式不正确').show();
                return false;
            }
            //if($.trim(password.val()) != $.trim(repassword.val())) {
            // repassword.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>密码不一致').show();
            // return false;
            //}
        }
    });

    // 上传页
    if ($('.box-upload').length) {
        $('.box-upload').on('mouseover', '.u-select', function() {
            $(this).find('.u-select-list').show();
        }).on('mouseout', '.u-select', function() {
            $(this).find('.u-select-list').hide();
        });
        $('.u-select-list').on('click', 'li', function() {
            $(this).parents('.u-select-list').hide()
            $(this).parents('.u-select').find('.u-select-val').html($(this).text());
            $(this).parents('.u-select').find('.input-val').val($(this).text());
        });
        checkboxSelect('.checkbox');
    };
    // checkbox选中效果
    function checkboxSelect(obj) {
        jQuery.each(jQuery(obj).find('input[type=checkbox]'), function(i) {
            if (!jQuery(this).parents('label').find('.ico-checkbox').length) {
                jQuery(this).wrap('<span class="ico-checkbox"></span>');
            }
            if (jQuery(this).prop('checked')) {
                jQuery(this).parents('span').addClass('ico-checkbox-cur');
            } else {
                jQuery(this).parents('span').removeClass('ico-checkbox-cur');
            }
            jQuery(this).on('change', function() {
                if (jQuery(this).prop('checked')) {
                    jQuery(this).parents('span').addClass('ico-checkbox-cur');
                } else {
                    jQuery(this).parents('span').removeClass('ico-checkbox-cur');
                }
            });
        });
    };

    // 上传视频页弹窗
    if ($('.popup-sp-list')) {
        $('.popup-sp-list').find('li:even').css({
            'background': '#f6f6f6'
        });
        $('.popup-sp-list').on('click', 'li', function() {
            //  复选框
            // if($(this).find("[type=checkbox]").is(':checked')) {
            //     $(this).removeClass('cur');
            //     $(this).find("[type=checkbox]").prop('checked', false);
            //     return false;
            // }
            // else {
            //     $(this).addClass('cur');
            //     $(this).find("[type=checkbox]").prop('checked', true);
            //     return false;
            // }

            // 单选框
            $(this).addClass('cur').siblings('li').removeClass('cur');
            $(this).find("[type=radio]").prop('checked', true);
        })
    };

    $('.sp-add').on('click', function() {
        $('.popup-sp').show();
        mask.show();
    });

    // 学员评价换一组
    var switchNum = 0;
    $('.btn-switch').on('click', function() {
        var switchDom = $(this).parents('.wrap');
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

    // 学员评价自动切换
    if ($('.silder-box2').length) {
        if ($('.silder-box2').width() <= 1220) {
            //回调函数计数
            var callbackIndex = 0;
            $('.silder-box2').mySilder({
                width: 228, //容器的宽度 必选参数!!!!!!
                height: 260, //容器的高度 必选参数!!!!!!
                auto: true, //是否自动滚动
                autoTime: 5, //自动滚动时，时间间隙，即多长滚动一次,单位(秒)
                direction: 'x', //滚动方向,默认X方向
                autoType: 'left', //滚动方向，auto为true时生效
                few: 1, //一次滚动几个，默认滚动1张
                showFew: 5, //显示几个,就不用调css了,默认显示一个
                clearance: 20, //容器之间的间隙，默认为 0
                silderMode: 'linear', //滚动方式
                timeGap: 650, //动画间隙，完成一次动画需要多长时间，默认700ms
                buttonPre: '.btl', //上一个，按钮
                buttonNext: '.btr', //下一个，按钮
                jz: true, //点击时，是否等待动画完成
                runEnd: function() { //回调函数
                    callbackIndex++;
                    // $('.cj em').text(callbackIndex);
                }
            });
        } else {
            //回调函数计数
            var callbackIndex = 0;
            $('.silder-box2').mySilder({
                width: 268, //容器的宽度 必选参数!!!!!!
                height: 300, //容器的高度 必选参数!!!!!!
                auto: true, //是否自动滚动
                autoTime: 5, //自动滚动时，时间间隙，即多长滚动一次,单位(秒)
                direction: 'x', //滚动方向,默认X方向
                autoType: 'left', //滚动方向，auto为true时生效
                few: 1, //一次滚动几个，默认滚动1张
                showFew: 5, //显示几个,就不用调css了,默认显示一个
                clearance: 20, //容器之间的间隙，默认为 0
                silderMode: 'linear', //滚动方式
                timeGap: 650, //动画间隙，完成一次动画需要多长时间，默认700ms
                buttonPre: '.btl', //上一个，按钮
                buttonNext: '.btr', //下一个，按钮
                jz: true, //点击时，是否等待动画完成
                runEnd: function() { //回调函数
                    callbackIndex++;
                    // $('.cj em').text(callbackIndex);
                }
            });
        }
    }

    // 首页最新课程切换
    //$("#wraps").find('.tab-tit').on('click', 'li', function() {
    //   $(this).addClass('cur').siblings().removeClass('cur');
    //   $(this).parents('.wrap').find('.list').hide().eq($(this).index()).show();
    //  if($(this).text().indexOf('IP')>0){
    //      mypages(1)
    //  }
    //});

    // 首页最新课程切换
    $('.tab-tit').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $("#shorturl").val($(this).attr("url"));
        if ($(this).parents('.tab-tit').attr("id") == "one") {
            $(this).parents('.wrap').find('.list').hide().eq($(this).index()).show();
            mypage(1); //所有课程
        } else if ($(this).parents('.tab-tit').attr("id") == "two") {
            mypages(1); // VIP 课程
        }
    });

    // 首页最新最热课程替换
    $('.box-zxkc .tit').on('click', '.point', function() {
        $(this).addClass('cur').siblings('.point').removeClass('cur');
        $("#now_id").val($(this).attr("myid"));
        mypage(1);
    });

    // 视频管理删除
    $('.box-spgl').on('click', '.ico-delete', function() {
        $('.popup-del').show();
        mask.show();
    });
    $('.popup-del').on('click', '.btn-cancel', function() {
        $('.popup-del').hide();
        mask.hide();
    });

    // 上传视频
    $('.box-spgl').on('click', '.up-video', function() {
        $('.popup-video').show();
        mask.show();
    });

    // 需求页
    $('.xqy-comment').on('click', '.laud', function() {
        var _this = $(this);
        if (!$(this).hasClass('laud-yellow')) {
            _this.addClass('laud-yellow').find('.add').fadeIn();
            _this.parent().find('.yellow').html(+_this.parent().find('.yellow').html() + 1);
            setTimeout(function() {
                _this.find('.add').fadeOut();
            }, 800);
        }
    });


    // 视频页tab切换
    $('.v-tab').on('click', 'li', function() {
        var urls = location.href;
        if (urls.indexOf("UserMessage/") <= 0) {
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.v-tab-cont').hide().eq($(this).index()).show();
        }
    });

    // 视频页点赞
    $('.v-comment').on('click', '.laud', function() {
        var _this = $(this);
        if (!$(this).hasClass('laud-yellow')) {
            _this.addClass('laud-yellow').find('.add').fadeIn();
            _this.parent().find('.num').html(+_this.parent().find('.num').html() + 1);
            setTimeout(function() {
                _this.find('.add').fadeOut();
            }, 800);
        }
    });
    // 视频页回复
    $('.v-comment').on('click', '.reply', function() {
        var _this = $(this);

        if (_this.parents('.com-box').text().indexOf("提 交") <= 0) {
            _this.parent('.func').after($("#tmp").html());
        }
        var comment = _this.parent('.func').nextAll('.input2');
        if (comment.is(':hidden')) {
            $(".cont").find(".input2").hide();
            comment.show();
        } else {
            comment.hide();
        }

    });

    // 复制内容赠送视频
    $('.btn-copy').on('click', function() {
        copyToClipboard();
        alert('复制成功！')
    });

    // 上传图片
    $('.v-comment').on('click', '.btn-sc', function() {
        uppic(this);
    });

    // 视频页回复
    $('.v-comment').on('click', '.btn-tj', function() {
        comment(this);
    });

    // 视频页回复图片大图
    $('.v-comment').on('click', '.re-img img', function() {
        var _this = $(this);
        if (!$('.popup-carrousel').length) {
            $('body').append('<div class="popup-carrousel"><a href="javascript:;" class="c-ico close"></a><img /></div>');
        }
        $('.popup-carrousel').find('img').attr('src', _this.data('src'));
        $('.popup-carrousel').show();
    });

    $('body').on('click', '.popup-carrousel .close', function() {
        $(this).parents('.popup-carrousel').hide();
    });
    $('body').on('click', '.popup-carrousel', function() {
        $('.popup-carrousel').hide();
    });


    // 搜索下拉
    $('.search').on('focus', '.txt', function() {
        $('.search-tip').show();
        $('.search-hot').hide();
    });
    $('.search').on('blur', '.txt', function() {
        setTimeout(function() {
            $('.search-tip').hide();
            $('.search-hot').show();
        }, 200);
    });
    $('.search-tip').on('click', 'a', function() {
        $('.search .txt').val($(this).text())
    });

    $('.search-select').on('mouseover', function() {
        $(this).find('.search-select-list').show();
    }).on('mouseout', function() {
        $(this).find('.search-select-list').hide();
    });
    $('.search-select-list').on('click', 'li', function() {
        $('.search-select-list').hide();
        $(this).parents('.search-select').find('.search-select-val').html($(this).text())
    });

    //搜索按钮
    $("#bsearch").click(function() {
        var val = $("#searchkey").val();
        if (val != "") {
            $.get("/Video/Getpy/?key=" + encodeURI(val), function(data) {
                $("#searchform").attr("action", "/search/" + data + "/");

                $("#searchform").submit();
            })
        }
    })

    $("#searchkey").keydown(function(event) {
        event = document.all ? window.event : event;
        if ((event.keyCode || event.which) == 13) {
            $("#bsearch").click();
        }
    });

    // 收藏页删除
    $('.box-collect .list').on('mouseenter', 'li', function() {
            $(this).find('.close-collect').show();
        })
        .on('mouseout', 'li', function() {
            $(this).find('.close-collect').hide();
        });
    $('.close-collect').on('mouseenter', function() {
            $(this).show();
        })
        .on('mouseout', function() {
            $(this).hide();
        })
        .on('click', function() {


        });


    // 上传视频选择checkbox
    $('.up-xzsp').on('click', '.check-ksk', function() {
        var itry;
        if ($(this).find("[type=checkbox]").is(':checked')) {
            $(this).removeClass('check-ksk-cur');
            $(this).find("[type=checkbox]").prop('checked', false);
            itry = 0;
            if ($(this).find("input").attr("myid").length > 0) {
                var myid = $(this).find("input").attr("myid");
                $.post("/UserVideo/Changetry", {
                    id: myid,
                    istry: itry
                }, function() {

                })
            }
            return false;
        } else {
            $(this).addClass('check-ksk-cur');
            $(this).find("[type=checkbox]").prop('checked', true);
            itry = 1;
            if ($(this).find("input").attr("myid").length > 0) {
                var myid = $(this).find("input").attr("myid");
                $.post("/UserVideo/Changetry", {
                    id: myid,
                    istry: itry
                }, function() {

                })
            }
            return false;
        }

    });
    $.each($('.up-xzsp .check-ksk').find("[type=checkbox]"), function(index) {
        if ($(this).is(':checked')) {
            $(this).parents('.check-ksk').addClass('check-ksk-cur');
        } else {
            $(this).parents('.check-ksk').removeClass('check-ksk-cur');
        }
    });

    // 相关搜索tab切换
    $('.search-other > .tit').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.tit').nextAll('.ct').hide().eq($(this).index()).show();
    });

    // 无缝滚动
    if($('.myscroll').length) {
        $('.myscroll').myScroll({
            speed: 50, //数值越大，速度越慢
            rowHeight: 66 //li的高度
        });
    }

    // 未登录弹窗兼容移动端
    if (window.screen.availWidth < 640 && $('.popup-play').length) {
        $('.popup-play').addClass('popup-play-media');
    }


    // 需求页管理员回复
    $('.xqy-comment').on('click', '.btn-xqy-reply', function() {
        var replyBox = $(this).parents('.times').nextAll('.reply-box');
        if (replyBox.is(':visible')) {
            replyBox.hide();
        } else {
            replyBox.show();
        }
    });

    // 需求页弹窗取消
    $('.popup-xqy').on('click', '.btn-xqy-no', function() {
        $('.popup-xqy').hide();
        mask.hide();
    });

    // 需求页弹窗邀请好友
    $('.popup-xqy').on('click', '.btn-xqy-yq', function() {
        $('.popup-xqy').hide();
        $('.popup-yq').show().find('.btn-box p').hide();
    });

    // 需求页弹窗复制
    $('.popup-yq').on('click', '.btn-xqy-copy', function() {
        copyToClipboard();
        $('.popup-yq').find('.btn-box p').show();
        $("#title").val("");
    });

    // 需求页编辑
    $('.xqy-comment').on('click', '.btn-xqy-edit', function() {
        var cont = $(this).parents('.rtt').nextAll('.rct');
        var nid = $(this).parents('.rtt').nextAll('.rct').attr("myid");
        var contTxt = cont.text();
        if (cont.find('.text-edit').length) {
            var contTxt = cont.find('.text-edit').html();
            cont.html('');
            cont.append(contTxt);
        } else {
            cont.html('');
            cont.append('<textarea id="te' + nid + '" class="text-edit">' + contTxt + '</textarea><button class="btn-tj" onclick="savehf(' + nid + ')" type="button"><span class="ico ico-tj"></span>提 交</button>');
        }
    });

    // 需求页催促
    var timer;
    $('.xqy-comment').on('click', '.btn-urge', function() {
        $.post("/Index/Addxuqiu", {
            id: showid,
            counts: ncount
        }, function(data) { //需求+1
        })
        var time = 5;
        clearInterval(timer);
        $('.popup-urge').find('.time').html(time);
        timer = setInterval(function() {
            time--;
            if (time == 0) {
                clearInterval(timer);
                $('.popup-urge').hide();
                mask.hide();
                location.href = '/';
            } else {
                $('.popup-urge').find('.time').html(time);
            }
        }, 1000);
        $('.popup-urge').show();
        mask.show();
    });

    // 上传资料checkbox
    $('.box-upload').on('click', '.input label', function() {
        if ($(this).find('input[type=checkbox]').prop('checked')) {
            $(this).find('.ico-checkbox').addClass('ico-checkbox-cur');
        } else {
            $(this).find('.ico-checkbox').attr('class', 'ico-checkbox');
        }
    });

    // 播放页星星评分
    var starNum;
    var starTxt = ['<span class="yellow">非常差！</span>课程太差了，我要吐槽！',
        '<span class="yellow">差！</span>课程不满意，讲的没有干货。',
        '<span class="yellow">中评！</span>课程一般',
        '<span class="yellow">好评！</span>课程挺不错，继续保持！',
        '<span class="yellow">五星好评！</span>课程非常棒，点赞！'
    ];
    $('.starRating').on('click', 'a', function() {
        $(this).addClass('star-checked').siblings().removeClass('star-checked');
        starNum = $(this).index();
        $(this).parents('.starRating').find('.star-tips').html(starTxt[starNum]);
        // console.log($(this).index());  //0 ~ 4
    });
    $('.starRating').on('mouseover', 'a', function() {
            $("#star").val($(this).index() + 1);
            $(this).parents('.starRating').find('.star-tips').html(starTxt[$(this).index()]);
        })
        .on('mouseleave', 'a', function() {
            if (!starNum) {
                $("#star").val(0);
                $(this).parents('.starRating').find('.star-tips').html('');
            } else {
                $("#star").val(starNum + 1);
                $(this).parents('.starRating').find('.star-tips').html(starTxt[starNum]);
            }
        });

    $('.starShow').on('mouseover', function() {
        $(this).find('.star-tips').html(starTxt[$(this).find('.star-checked').index()]).show();
    })
    .on('mouseleave', function() {
        $(this).find('.star-tips').hide();
    });

    $(".xiazai").click(function() {
        var vid = $(this).attr("myid");
        var vids = $("#scroll-list").find(".cur").attr("myid");
        $(this).attr("href", '/Index/Down/Id/' + vid + '?vid=' + vids);
    });


    // 订阅按钮通用
    $('.btn-dy').on('click', function() {
        var myid = $(this).attr("myid");
        var _this = $(this)
        $.post("/teacher/Actdy", {
            userid: myid
        }, function(data) {
            if (data == 1) {
                if ($('#my-video').length) {
                    if (_this.hasClass('dis')) {
                        $('.btn-dy').removeClass('dis').html('+ 订阅');
                    } else {
                        $('.btn-dy').addClass('dis').html('已订阅');
                    }
                } else {
                    if (_this.hasClass('dis')) {
                        _this.removeClass('dis').html('+ 订阅');
                        _this.parents('.lecturer').find('.ico1803.dy').removeClass('dis');
                    } else {
                        _this.addClass('dis').html('已订阅');
                        _this.parents('.lecturer').find('.ico1803.dy').addClass('dis');
                    }
                }
            } else {
                alert("您尚未登录");
            }
        })


    });

    // 讲师个人主页 菜单横线动画
    if($('.js-nav').length) {
        $('.js-nav ul').moveline({
            color:'#ff8d01',
            height: 3,
            animateType: ''
        });
    }
    // 个人主页 菜单横线动画
    if($('.user-nav').length) {
        $('.user-nav').moveline({
            color:'#ff8d01',
            height: 2,
            animateType: ''
        });
    }

    $('.box-zxkc .lecturer').on('mouseover', function() {
        $(this).find('.lecturer-box').show();
    })
    .on('mouseout', function() {
        $(this).find('.lecturer-box').hide();
    });

    // 翻页显示GO按钮
    if($('.page').length) {
        $.each($('.page'), function(index, val) {
            $(this).bind('input propertychange', function() {
                var val = $.trim($(this).find('input').val());
                if(val.length == 0 || val == $(this).find('.cur').text()) {
                    $(this).find('label').removeClass('active');
                }
                else {
                    $(this).find('label').addClass('active');
                }
            })
        });
    };

    // 播放页 菜单横线动画
    if($('.v-tab').length) {
        $('.v-tab').moveline({
            color:'#ff8d01',
            height: 3,
            animateType: ''
        });
    }

    // 播放页热播榜单
    $('.v-hotlist').find('li:eq(0)').addClass('hover');
    $('.v-hotlist').on('mouseover', 'li', function() {
        $(this).addClass('hover').siblings('li').removeClass('hover');
    });

    // 上传页 菜单横线动画
    if($('.tab-upload').length) {
        $('.tab-upload').moveline({
            color:'#ff8d01',
            height: 3,
            animateType: ''
        });
    };
    // 播放页字数判定
    if($('.new-comment .num-box').length) {
        $.each($('.new-comment .textarea'), function(i) {
            monitorVal($(this), $(this).parent().find('.length').text(), 'minus');
            $(this).bind('input propertychange', function() {
                if($(this).val().length == 0) {
                    $(this).attr('style', '');
                }
                else {
                    $(this).css({
                        'background': '#fff'
                    });
                }
            });
        });
    };

    // 播放页入群交流按钮
    $('.v-video').on('click', '.btn-qun', function() {
        $('.popup-qun, .mask').show();
    });

    // 播放页下载按钮
    $('.v-video').on('click', '.btn-down', function() {
        $('html, body').scrollTop($('.v-info.new-comment').offset().top);
        $('.v-tab').find('li:last()').click();
    });

    // 首页为你推荐换一换
    var wntjNum = 0;
    $('.box-wntj').on('click', '.more a', function() {
        wntjNum == $('.box-wntj').find('.list-wntj').length - 1 ? wntjNum = 0 : wntjNum++;
        $('.box-wntj').find('.list-wntj').hide().eq(wntjNum).show();
    });

    // 首页学习路径换一换
    var xxljNum = 0;
    $('.box-xxlj').on('click', '.more a', function() {
        xxljNum == $('.box-xxlj').find('.list-xxlj').length - 1 ? xxljNum = 0 : xxljNum++;
        $('.box-xxlj').find('.list-xxlj').hide().eq(xxljNum).show();
    });

    // 发送验证码
    $('body').on('click', '.popup-phone .sendcode', function () {
        var dom = $(this).parents('.popup-phone');
        var val = $.trim(dom.find('.phone').val());
        if (!dom.find('.tips').length) {
            dom.find('.item').last().after('<div class="tips"></div>');
        };
        if(dom.find('.drag-outer-box').length && !dom.find('.drag-outer-box').hasClass('act')) {
            dom.find('.tips').html('验证失败！').show();
            return false;
        }
        if(!val) {
            if(dom.hasClass('popup-editphone')) {
                dom.find('.tips').html('新手机号码格式不能为空！').show();
            }
            else {
                dom.find('.tips').html('手机号码格式不能为空！').show();
            }
            return false;
        }
        if(isMobile(val)) {
            if(dom.hasClass('popup-editphone')) {
                dom.find('.tips').html('新手机号码格式不正确！').show();
            }
            else {
                dom.find('.tips').html('手机号码格式不正确！').show();
            }
            return false;
        }

        var _this = $(this).parents('.yzm');
        var i = 59;
        _this.html('<span class="times">' + i + '</span>s重新发送');
        var codeTimer = setInterval(function () {
            i--;
            _this.find('.times').html(i);
            if (i == 0) {
                clearInterval(codeTimer);
                _this.html('<a href="javascript:;" class="sendcode">获取验证码</a>')
            }
        }, 1000);
    });

    // 判断input是否为空，按钮调整
    $('.popup-phone').find('.text').on('focus', function() {
        var dom = $(this).parents('.popup-phone');
        dom.find('.tips').hide();
    });

    $('.popup-phone').find('.text').bind('input propertychange', function() {
        var dom = $(this).parents('.popup-phone');
        dom.find('.btn').addClass('dis');
        var i = 0;
        $.each(dom.find('.text'), function(index, val) {
            if(!$.trim($(this).val())) {
                return false;
            }
            else {
                i++;
            }
        });
        if(i == dom.find('.text').length) {
            dom.find('.btn').removeClass('dis');
        }
    });

    // 绑定手机号码
    $('body').on('click', '.popup-phone .btn', function() {
        var dom = $(this).parents('.popup-phone');
        if($(this).hasClass('dis')) {
            return false;
        }
        if (!dom.find('.tips').length) {
            dom.find('.item').last().after('<div class="tips"></div>');
        };
        if(dom.find('.drag-outer-box').length && !dom.find('.drag-outer-box').hasClass('act')) {
            dom.find('.tips').html('验证失败！').show();
            return false;
        }
        if(dom.find('.oldphone').length && isMobile(dom.find('.oldphone').val())) {
            dom.find('.tips').html('原手机号码格式不正确！').show();
            return false;
        }
        if(dom.find('.phone').length && isMobile(dom.find('.phone').val())) {
            if(dom.hasClass('popup-editphone')) {
                dom.find('.tips').html('新手机号码格式不正确！').show();
            }
            else {
                dom.find('.tips').html('手机号码格式不正确！').show();
            }
            return false;
        }
        if(dom.hasClass('popup-bindphone')) {
            $('.popup-bindphone, .mask').hide();
            console.log('绑定成功');
        }
        else if(dom.hasClass('popup-editphone')) {
            $('.popup-editphone, .mask').hide();
            console.log('修改成功');
        }
        else if(dom.hasClass('popup-loginphone')) {
            $('.popup-loginphone, .mask').hide();
            console.log('手机登录/注册成功');
        }
    });

    // 点击绑定手机号码
    $('.bind-phone').on('click', function() {
        $('.popup-bindphone, .mask').show();
    });
    // 点击修改手机号码
    $('.edit-phone').on('click', function() {
        dragValidation($('#dragouter1'));
        $('.popup-editphone, .mask').show();
    });
});

function isMobile(sMobile) {
    if (/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(sMobile)) {
        return false;
    } else {
        return true;
    }
}
// 无缝滚动js
$.fn.myScroll = function(options) {
    //默认配置
    var defaults = {
        speed: 40, //滚动速度,值越大速度越慢
        rowHeight: 24 //每行的高度
    };
    var opts = $.extend({}, defaults, options),
        intId = [];

    function marquee(obj, step) {

        obj.find("ul").animate({
            marginTop: '-=1'
        }, 0, function() {
            var s = Math.abs(parseInt($(this).css("margin-top")));
            if (s >= step) {
                $(this).find("li").slice(0, 1).appendTo($(this));
                $(this).css("margin-top", 0);
            }
        });
    }

    this.each(function(i) {
        var sh = opts["rowHeight"],
            speed = opts["speed"],
            _this = $(this);
        intId[i] = setInterval(function() {
            if (_this.find("ul").height() <= _this.height()) {
                clearInterval(intId[i]);
            } else {
                marquee(_this, sh);
            }
        }, speed);

        _this.hover(function() {
            clearInterval(intId[i]);
        }, function() {
            intId[i] = setInterval(function() {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);
        });
    });
}

function openCenterLoginWindow(url, name) {
    var url = url; //转向网页的地址;
    var name = ''; //网页名称，可为空;
    var iWidth = 660; //弹出窗口的宽度;
    var iHeight = 560; //弹出窗口的高度;
    var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}


function savehf(nid) //保存编辑管理员回复
    {
        var id = nid;
        var retitle = $("#te" + id).val();
        if (retitle != "") {
            $.post("/Index/ReXuqiu", {
                retitle: retitle,
                id: id
            }, function(data) {
                location.reload();
            })
        }
    }


/*复制代码到剪切板*/
function copyToClipboard() {
    var e = document.getElementById("contents"); //对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
}

function imgCenter(id) {
    var imgWidth;
    if ($(document).width() < 1200) {
        var imgWidth = $(id).find('img').eq(0).width() - 1200
    } else {
        var imgWidth = $(id).find('img').eq(0).width() - $(document).width();
    }
    $(id).find('img').css({
        'position': 'relative',
        'margin-left': -imgWidth / 2
    });
}

function login(_this) {
    if ($.trim(_this.val()) == '') {
        if (_this.attr('name') == 'name') {
            _this.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>昵称不能为空').show();
        } else if (_this.attr('name') == 'email') {
            _this.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>邮箱不能为空').show();
        } else if (_this.attr('name') == 'password') {
            _this.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>密码不能为空').show();
        } else if (_this.attr('name') == 'repassword') {
            _this.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>密码不能为空').show();
        }
    } else if (!isEmail($.trim(_this.val())) && _this.attr('name') == 'email') {
        _this.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>邮箱格式不正确').show();
    } else if ($.trim(_this.val()) != $.trim($('.box-login').find('[name=password]').val()) && _this.attr('name') == 'repassword') {
        _this.parents('.input').next('.tip').html('<span class="ico ico-wrong"></span>密码不一致').show();
    } else {
        _this.parents('.input').next('.tip').html('<span class="ico ico-right"></span>').show();
    }
}

function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}

$(function() {

    // vip页面
    $('.user-info .img').on('mouseover', function() {
            $('.vip-tip').show();
        })
        .on('mouseout', function() {
            $('.vip-tip').hide();
        });

    $('.vip-tip').on('mouseover', function() {
            $('.vip-tip').show();
        })
        .on('mouseout', function() {
            $('.vip-tip').hide();
        });


    $(".list-tab-xyzp").find("li").click(function() {

        $(".list-tab-xyzp").find("li").attr("class", "");
        $(this).attr("class", "cur");
        $(".list").hide();
        $("#li" + $(this).attr("nid")).show();

        $("#li" + $(this).attr("nid")).find("img").each(function() {
            var src = $(this).attr("mmysrc");
            $(this).attr("src", src);
        })


    })

    var nowimg = $(".preview").length;

    function xianshi() {
        var win = ($(window).scrollTop() + $(window).height());
        $(".preview").each(function() {
            var top = $(this).offset().top;
            if (top < win) {
                if ($(this).attr("mysrc") != "") {
                    if ($(this).attr("mysrc").indexOf("qiaojiang/首页") > 0 || $(this).attr("mysrc").indexOf("Static/images/pic") > 0) {
                        if (top > 300) {
                            $(this).attr("src", $(this).attr("mysrc"))
                            $(this).attr("mysrc", "");
                        }
                    } else {
                        $(this).attr("src", $(this).attr("mysrc"))
                        $(this).attr("mysrc", "");
                    }
                }
            }
        });
    }
    $(window).scroll(function() {
        if (nowimg > 0) {
            xianshi();
        }
    });
    if (nowimg > 0) {
        xianshi();
    }
});


(function() {
    //底部的菜单移动效果
    $.fn.moveline = function(options, callback) {
        var _this = this;
        var $this = $(this);
        var defaultValue = {
            height: 2, //高度
            position: '', //线条是显示在内部    inner是在内部
            color: '#F65637', //颜色
            animateTime: 500, //毫秒
            animateType: 'easeOutBack', //动画效果     //没有引用jquery.easing.js  的话  为''就行。
            zIndex: '1', //层级
            top: 0, //自定义top
            customTop: false, //是否自定义top
            randomColor: false, //是否显示随机色线条
            randomOpacity: 1, //透明度
            click: function() {}, //点击菜单触发的效果
        }

        var opt = $.extend(defaultValue, options || {});
        $this.css({
            position: 'relative',
        });

        //li的margin 宽
        var li_width = $this.children().outerWidth();

        //li的margin 高  也是之后滚动线条的top值
        var li_height = opt.position === 'inner' ? $this.children().outerHeight() - opt.height : $this.children().outerHeight();

        //红线的left位置
        var li_left = $this.children().position().left;

        //li的margin left
        var li_marginLeft = Number($this.children().css('margin-left').replace(/[^0-9]+/g, ''));

        //是否显示随机颜色
        var randomColor = function() {
            var opacity = opt.randomOpacity || 1;
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgba(" + r + ',' + g + ',' + b + ',' + opacity + ")";
        };

        var color = opt.randomColor ? randomColor() : opt.color;

        if (opt.customTop) li_height = opt.top;

        var zIndex = opt.height > 5 ? '-1' : opt.zIndex;

        // 定义底部滚动线条
        _this.moveLineDiv = $('<div class="nav_line"></div>').css({
            'position': 'absolute',
            'height': opt.height,
            'background': color,
            'top': li_height,
            'z-index': zIndex,
        }).appendTo($this);


        //判断li中有active 的索引 并获取其left的值
        for (var i = 0; i < $this.children().length; i++) {
            if ($this.children().eq(i).hasClass('cur')) {
                li_left = $this.children().eq(i).position().left;
                li_width = $this.children().eq(i).outerWidth();
            }
        }
        _this.moveLineDiv.css({
           width:li_width,
           left:li_left + li_marginLeft
        });
        // 初始化红线进去
        _this.moveLineDiv.stop().animate({
            width: li_width,
            left: li_left + li_marginLeft
        }, opt.animateTime, opt.animateType);

        //红线的hover效果
        $this.children().hover(function() {
            var li_marginLeft = Number($this.children().css('margin-left').replace(/[^0-9]+/g, ''));
            var li_width = $(this).outerWidth();
            var li_left = $(this).position().left;

            _this.moveLineDiv.stop().animate({
                width: li_width,
                left: li_left + li_marginLeft
            }, opt.animateTime, opt.animateType);
        }, function() {

            for (var i = 0; i < $this.children().length; i++) {
                if ($this.children().eq(i).hasClass('cur')) {
                    li_left = $this.children().eq(i).position().left;
                    li_width = $this.children().eq(i).outerWidth();
                }
            }

            _this.moveLineDiv.stop().animate({
                width: li_width,
                left: li_left + li_marginLeft
            }, opt.animateTime);
        });

        $this.children().on('click', function() {
            var ret = {
                ele: $(this),
                index: $(this).index(),
            }
            opt.click(ret);
            $(this).trigger('mouseover')
        });

        return _this;
    }
})(jQuery);

$(function() {
    autoHeight('.autoheight');
});

function autoHeight(dom) {
    $.each($(dom), function(i, n) {
        $(n).bind('input propertychange', function() {
            $(n).css('height', '0');
            $(n).css('height', n.scrollHeight - parseInt($(n).css('padding-top')) - parseInt($(n).css('padding-bottom')));
        });
    });
}
function monitorVal(obj, nums, minus) {
    if(minus) {
        jQuery(obj).nextAll('.num-box').find('.num').html(nums - jQuery(obj).val().length);
    }
    else {
        jQuery(obj).nextAll('.num-box').find('.num').html(jQuery(obj).val().length);
    }

    jQuery(obj).bind('input propertychange', function() {
        if(jQuery(obj).val().length >= nums){
            jQuery(obj).val(jQuery(obj).val().substr(0, nums));
        }
        if(minus) {
            jQuery(obj).nextAll('.num-box').find('.num').html(nums - jQuery(obj).val().length);
        }
        else {
            jQuery(obj).nextAll('.num-box').find('.num').html(jQuery(obj).val().length);
        }
    });
};
function loginLine() {
    if(jQuery('.popup-play').find('.nav_line').length) {return false};
    jQuery('.popup-play .popup-play-tit ul').moveline({
        color: '#ff8d01',
        height: 3,
        animateType: '',
        click: function(ret) {
            ret.ele.addClass('cur').siblings().removeClass('cur');
            ret.ele.parents('.popup-play').find('.popup-play-ct').hide().eq(ret.index).show();
        }
    });
}

// 保存成功失败 status为suc或者fail，cont为提示的内容
function tipSave(status, cont, times, classes) {
    var time;
    if (status == 'suc') {
        icon = 'gou'
    }
    if (status == 'fail') {
        icon = 'guanbi'
    }
    times ? time = times : time = 2000
    if (!jQuery('.alert-tip').length) {
        jQuery('body').append('<div class="alert-tip">' + '<span class="qjfont qj-' + icon + '"></span>' + '<span class="text">' + cont + '</span>' + '</div>');
    }
    else {
        jQuery('.alert-tip').find('.qjfont').attr('class', 'qjfont qj-' + icon);
        jQuery('.alert-tip').find('.text').html(cont);
    }
    if(classes) {
        jQuery('.alert-tip').addClass(classes);
    }
    if (!jQuery('.alert-mask').length) {
        jQuery('body').append('<div class="alert-mask"></div>');
    }
    jQuery('.alert-tip').css({
        'margin': -jQuery('.alert-tip').outerHeight() / 2 + 'px 0 0 ' + -jQuery('.alert-tip').outerWidth() / 2 + 'px'
    }).show();
    $('.alert-mask').show();
    if (jQuery('.tip-num').length) {
        var tipTimer = setInterval(function() {
            if (jQuery('.tip-num').html() == 1) {
                jQuery('.alert-tip').hide();
            $('.alert-mask').hide();
                clearInterval(tipTimer);
            }
            jQuery('.tip-num').html(jQuery('.tip-num').html() - 1);
        }, 1000);
    } else {
        setTimeout(function() {
            jQuery('.alert-tip').hide();
            $('.alert-mask').hide();
        }, time);
    }
};

// 拖拽验证
function dragValidation(obj) {
    if(!obj.html()) {
        var dom = '<div class="drag-outer"><div class="filter-box"></div><span>请按住滑块，拖动到最右边</span><div class="inner"><i class="qjfont qj-dbyoujiantou"></i></div></div>';
        obj.html(dom);
    };
    SlideCheckFail();
    obj.find('.inner').unbind();
    obj.find('.inner').mousedown(function(e) {
        var dx, os = obj.find('.inner').offset(),
            _differ = obj.width() - obj.find('.inner').width();
        $(document).mousemove(function(e) {
            dx = e.pageX - os.left;
            if (dx < 0) {
                dx = 0;
            } else if (dx > _differ) {
                dx = _differ;
            }
            obj.find('.filter-box').css('width', dx);
            obj.find('.inner').css('left', dx);
        });
        $(document).mouseup(function(e) {
            $(document).off('mousemove');
            $(document).off('mouseup');
            dx = e.pageX - os.left;
            if (dx < _differ) {
                SlideCheckFail();
            } else if (dx >= _differ) {
                SlideCheckSuc(_differ);
            }
        })
    });

    function SlideCheckFail() {
        obj.removeClass('act');
        obj.find('.inner').css('left', 0);
        obj.find('.inner').html('<i class="qjfont qj-dbyoujiantou"></i>');
        obj.find('.filter-box').css('width', 0);
        obj.find('span').html('按住滑块，拖拽到最右边');
        console.log('fail', obj)
        obj.parents('.popup-phone').find('.item-yzm').hide();
    }

    function SlideCheckSuc(dx) {
        obj.addClass('act');
        obj.find('span').html('验证通过！');
        obj.find('.inner').html('<i class="qjfont qj-gou"></i>');
        obj.find('.inner').css('left', dx);
        obj.find('.filter-box').css('width', dx);
        obj.parents('.popup-phone').find('.item-yzm').show();
    }
}