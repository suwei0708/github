$(function() {
    // 幻灯片
    if($('#sld-jy').size()) {
        $('#sld-jy').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    }

    // 经验文章详情收藏
    $('.jycont-tag').on('click', '.collect .btn', function() {
        if($(this).hasClass('dis')) {
            $(this).removeClass('dis');
        }
        else {
            $(this).addClass('dis');
        }
    });

    // 经验文章详情字数判定
    if($('.jycont-comment .num-box').length) {
        $.each($('.jycont-comment .textarea'), function(i) {
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

    // 换一换
    var chageNum = 0;
    $('.sidebar-article .change').on('click', 'a', function() {
        if(chageNum == $('.sidebar-article').find('.list').length - 1) {
            chageNum = 0
        }
        else {
            chageNum++;
        }
        $('.sidebar-article').find('.list').hide().eq(chageNum).show();
    });

    // 管理删除
    $('.box-gl-ct').on('click', '.btn-del', function() {
        if(confirm('确认删除吗？')) {
            $(this).parents('li').remove();
        }
    });

    // sidebar悬浮
    if($('.sidebar-box').length) {
        var sidebarH = $('.sidebar-box').height();
        var offsetTop = $('.sidebar-box').offset().top;

        sidebarScroll();
        $(window).on('scroll', function() {
            sidebarScroll();
        });

        function sidebarScroll() {
            if($(window).scrollTop() >  sidebarH + offsetTop) {
                if($('.jycont-comment').length) {
                    var dom = $('.jycont-comment');
                    var leftDomH = dom.offset().top + dom.outerHeight();
                    var rightDomH = $('.sidebar-box').outerHeight();
                    if(leftDomH > rightDomH + $(window).scrollTop()) {
                        $('.sidebar-box').removeClass('sidebar-box-ab').addClass('sidebar-box-fixed');
                        $('.sidebar-box').css({
                            top: '0',
                            right: ($(window).width() - 1220) / 2
                        });
                    }
                    else {
                        $('.sidebar-box').removeClass('sidebar-box-fixed').addClass('sidebar-box-ab');
                        $('.sidebar-box').css({
                            top: leftDomH - rightDomH,
                            right: ($(window).width() - 1220) / 2
                        });
                    }
                }
                else {
                    $('.sidebar-box').removeClass('sidebar-box-ab').addClass('sidebar-box-fixed');
                    $('.sidebar-box').css({
                        top: '0',
                        right: ($(window).width() - 1220) / 2
                    });
                }
            }
            else {
                $('.sidebar-box').removeClass('sidebar-box-ab').removeClass('sidebar-box-fixed');
                $('.sidebar-box').css({
                    top: '0',
                    right: 0
                });
            }
        }
    };

    // 下拉框
    if($('.change-input').length) {
        $.each($('.change-input'), function(index, val) {
            if($(this).parents('.select-box').find('.select-val').html() != '原创') {
                $(this).parents('.f-txt').nextAll('.f-author').show();
            }
            else {
                $(this).parents('.f-txt').nextAll('.f-author').hide();
            }
        });
    }
    $('.select-txt').on('click', 'li', function() {
        $(this).parents('.select-box').find('.select-val').html($(this).html());
        $(this).parents('.select-box').find('input').val($(this).html());
        $(this).parents('.select-txt').hide();
        if($('.change-input').length) {
            if($(this).parents('.select-box').find('.select-val').html() != '原创') {
                $(this).parents('.f-txt').nextAll('.f-author').show();
            }
            else {
                $(this).parents('.f-txt').nextAll('.f-author').hide();
            }
        }
    });
    $('.select-box').on('mouseover', function() {
        $(this).find('.select-txt').show();
    })
    .on('mouseout', function() {
        $(this).find('.select-txt').hide();
    });

    //添加标签
    if($('#tagValue').length) {
        new Tag('tagValue').initView();
    }

    // 经验首页 菜单横线动画
    if($('.jy-synav-l').length) {
        $('.jy-synav-l').moveline({
            color:'#ff8d01',
            height: 3,
            animateType: ''
        });
    };

    $('.tag-box').on('click', function() {
        $('.tag-input').focus();
    });

});