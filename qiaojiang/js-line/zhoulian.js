$(function() {
    // 下拉
    $('.popup-zl').on('mouseover', '.u-select', function() {
        $(this).find('.u-select-list').show();
    }).on('mouseout', '.u-select', function() {
        $(this).find('.u-select-list').hide();
    });
    $('.u-select-list').on('click', 'li', function() {
        $(this).parents('.u-select-list').hide()
        $(this).parents('.u-select').find('.u-select-val').html($(this).text());
        $(this).parents('.u-select').find('.input-val').val($(this).text());
    });

    // 赠送奖品
    $('.zl-list, .zyxq-tit').on('click', '.btn-give', function() {
        $('.popup-give').show();
        $('.mask').show();
        monitorVal($('.popup-give .textarea'), $('.popup-give').find('.length').text(), 'minus');
        return false;
    });

    // 赠送成功
    $('.popup-give').on('click', '.btn-green', function() {
        if(!$(this).parents('.popup-give').find('.textarea').val().length) {
            tipSave('fail', '内容不能为空！');
            return false;
        }
        $(this).parents('.popup-box').find('.ico-close').trigger('click');
        $(this).parents('.popup-give').find('.textarea').val('');
        tipSave('suc', '赠送成功');
    });

    // 删除周练作品
    var delIndex; //删除的周练的位置
    $('.zl-list').on('click', '.btn-del', function() {
        delIndex = $(this).parents('li').index();
        $('.popup-delete, .mask').show();
        monitorVal($('.popup-delete .textarea'), $('.popup-delete').find('.length').text(), 'minus');
        return false;
    });

    // 删除 作业详情
    $('.zyxq-tit').on('click', '.btn-del', function() {
        $('.popup-delete, .mask').show();
        monitorVal($('.popup-delete .textarea'), $('.popup-delete').find('.length').text(), 'minus');
        return false;
    });

    // 发布周练添加奖品
    $('.fb-prize').on('click', function() {
        $('.popup-addprize').find('.tit').html('添加奖品');
        $('.popup-addprize').find('.u-select-val').html('一等奖');
        $('.popup-addprize').find('.input-val').val('一等奖');
        $('.popup-addprize').find('.txt').val('');
        $('.popup-addprize').find('.img img').attr('src', '../images/zhoulian/fm_1.png');
        $('.popup-addprize, .mask').show();
        monitorVal($('.popup-addprize .txt'), $('.popup-addprize').find('.length').text(), 'minus');
    });

    // 发布周练修改奖品
    $('.prize').on('click', '.btn-edit', function() {
        $('.popup-addprize').find('.tit').html('修改奖品');
        var arr = $(this).parents('li').find('p').html().split('：');
        $('.popup-addprize').find('.u-select-val').html(arr[0]);
        $('.popup-addprize').find('.input-val').val(arr[0]);
        $('.popup-addprize').find('.txt').val(arr[1]);
        $('.popup-addprize').find('.img img').attr('src', $(this).parents('li').find('img').attr('src'));
        $('.popup-addprize, .mask').show();
        monitorVal($('.popup-addprize .txt'), $('.popup-addprize').find('.length').text(), 'minus');
        return false;
    });

    // 发布周练删除奖品
    var delPrizeIndex; //删除的周练的位置
    $('.prize').on('click', '.btn-del', function() {
        delPrizeIndex = $(this).parents('li').index();
        $('.popup-delete, .mask').show();
        monitorVal($('.popup-delete .textarea'), $('.popup-delete').find('.length').text(), 'minus');
        return false;
    });

    // 发布周练选中
    $('.prize').on('click', 'li', function() {
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
        }
        else {
            $(this).addClass('cur');
        }
    });

    // 发布周练删除奖品成功
    $('.popup-delete').on('click', '.btn-green', function() {
        if(!$(this).parents('.popup-delete').find('.textarea').val().length) {
            tipSave('fail', '原因不能为空！');
            return false;
        }
        if($('.zl-list').length) {
            // 删除周练作品
            $('.zl-list').find('li').eq(delIndex).remove();
        }
        else if($('.prize').length) {
            // 发布周练删除奖品
            $('.prize').find('li').eq(delPrizeIndex).remove();
        }
        else if($('.zyxq-tit').length) {
            // 作业详情删除
        }
        else if($('.zl-list-xkc').length) {
            // 删除首页周练
            $('.zl-list-xkc').find('li').eq(delIIndex).remove();
        }

        $(this).parents('.popup-box').find('.ico-close').trigger('click');
        $(this).parents('.popup-delete').find('.textarea').val('');
        tipSave('suc', '删除成功');
    });

    // 发布周练字数判定
    if($('.form-works .num-box').length) {
        $.each($('.form-works .input'), function(i) {
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

    // 关注
    $('.sidebar-author').on('click', '.btn-dy', function() {
        if($(this).hasClass('btn-gray')) {
            $(this).removeClass('btn-gray');
            $(this).html('+ 关注');
        }
        else {
            $(this).addClass('btn-gray');
            $(this).html('已关注');
        }
    });

    // 点赞
    $('.praise-box').on('click', '.praise.btn-yellow', function() {
        $(this).removeClass('btn-yellow').addClass('btn-gray');
        $(this).find('.num').html(+$(this).find('.num').html() + 1);
    });

    // 修改点赞数
    $('.praise-box').on('click', '.edit', function() {
        $('.popup-editpraise, .mask').show();
        $('.popup-editpraise').find('.text').val($(this).parents('.praise-box').find('.num').text());
    });
    $('.popup-editpraise').on('click', '.btn-box a', function() {
        if(!$(this).parents('.popup-editpraise').find('.text').val()) {
            tipSave('fail', '点赞数不能为空');
        }
        $('.praise-box').find('.num').text($(this).parents('.popup-editpraise').find('.text').val());
        $('.popup-editpraise, .mask').hide();
    });

    // 作业详情字数判定
    if($('.zyxq-comment .num-box').length) {
        $.each($('.zyxq-comment .textarea'), function(i) {
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

    // 上传后删除作品
    $('#img-wrap').on('click', '.btn-del', function() {
        $(this).parents('.pro-item').remove();
        tipSave('suc', '删除成功', 500);
    });

    // 首页删除周练作品
    var delIIndex; //删除的周练的位置
    $('.zl-list-xkc').on('click', '.btn-del', function() {
        delIIndex = $(this).parents('li').index();
        $('.popup-delete, .mask').show();
        monitorVal($('.popup-delete .textarea'), $('.popup-delete').find('.length').text(), 'minus');
        return false;
    });

    // 首页编辑周练
    $('.zl-list-xkc').on('click', '.btn-edit', function() {
        var link = $(this).attr('data-link');
        var target = $(this).attr('data-target');
        if(target == '_blank') {
            window.open(link);
        }
        else {
            window.location.href = link;
        }
        return false;
    });

    // 图像裁剪
    var cropperImage;
    var jcropApi;
    var cropperImg;

    $('#fm_teb_box_right').on('click', '.fm_teb_pad li', function() {
        var _this = $(this);
        _this.addClass('select_on').siblings().removeClass('select_on');
        $('#fm_teb_box_right').find('.fm_teb_cont').find('li').hide().eq(_this.index()).show();
        cropperImg = $('#fm_teb_box_right').find('.fm_teb_item').eq(_this.index()).find('img');
        // 图像裁剪区域
        var cropperImage = cropperImg.clone();
        cropperImg.after(cropperImage);
        cropperImg.hide();
        if(jcropApi || !cropperImg) {
            clearSelect();
        }
        jcropApi = $.Jcrop(cropperImage, {
            allowSelect: false,
            minSize: [290, 210],
            aspectRatio: 290 / 210,
            onSelect: doSelect,
            onChange: doSelect,
            onRelease: clearSelect,
            setSelect: [0, 0, 290, 210]
        });
        // 左边图片区域
        $('.fm_box').find('.img').html(cropperImg.clone().show()).attr('class', 'img img2');
    })

    function clearSelect() {
        jcropApi.destroy();
        jcropApi = null;
    };
    function doSelect(c) {
        $('#cp_x').val(c.x);
        $('#cp_y').val(c.y);
        $('#cp_w').val(c.w);
        $('#cp_h').val(c.h);
        $('.fm_box').find('.img img').css({
            'margin-left': -c.x,
            'margin-top': -c.y
        });
    };
});