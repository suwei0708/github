(function($) {
$(function() {
    // 十大人气城市
    var arrCity = [];
    var valCity = $('.histogram').find('.num');
    $.each(valCity, function(index, val) {
        arrCity.push($(val).html());
    });
    var maxCity = Math.max.apply(null,arrCity);
    $.each(valCity, function(index, val) {
        $('.histogram').find('.item').eq(index).css({
            'height': $(val).html() / maxCity * 100 + '%'
        });
    });

    // 点亮城市
    $('.light-up').on('click', '.btn', function() {
        if(!$('.light-up').find('.btn-yellow-small').length) {
            var _this = $(this);
            $.msgBox.Confirm(null, '每位用户只能点亮一座城市哦~<br><strong>确定要点亮“'+ _this.html() +'”吗？</strong>', function() {
                _this.attr('class', 'btn btn-yellow-small');
                $.msgBox.Alert(null, '<div class="ico-suc"></div><strong>点亮成功</strong>');
            });
        }
        else {
            $.msgBox.Alert(null, '您已点亮了城市！');
        }
    });

    // 填写资料
    var submitFrom;
    $('.zt-txzl').on('click', '.btn', function() {
        submitFrom = 0;
        $.each($('.zt-txzl').find('.input'), function(index, val) {
            if($.trim($(this).val()) == '' && $(this).parents('.item-half').find('.title').html() != '协助者') {
                var tips = $(this).parent().prevAll('.title').html();
                $.msgBox.Alert(null, tips + '不能为空！');
                return false;
            }
            else if($(this).parents('.item-half').find('.title').html() != '协助者'){
                submitFrom++;
            }
            if(submitFrom == $('.zt-txzl').find('.input').length - 1) {
                $('.zt-txzl').find('.input').val('');
                $.msgBox.Alert(null, '提交成功！');
            }
        });
    });

    if($(".top-imgfixed").length) {
        // 头图动画
        var index_div_pro = [{
            sx: 0,
            sy: 0,
            mw: 3,
            mh: 1,
            bx: 8.4,
            by: 10.4,
            rx: -0.6
        }, {
            sx: 0,
            sy: 0,
            mw: 3,
            mh: 0.5,
            bx: 8.4,
            by: 8.4,
            rx: -0.5
        }];

        var ePageX = null;
        var ePageY = null;

        function getMousePos(expression) {
            if (ePageX == null || ePageY == null) return null;
            var _x = $(expression).position().left;
            _x += ePageX - $(expression).parent().position().left;
            var _y = $(expression).position().top;
            _y += ePageY - $(expression).parent().position().top;
            return {
                x: _x,
                y: _y
            }
        };

        var index_xh = setInterval(function() {
            var mousepos = getMousePos(".top-imgfixed");
            if (mousepos != null) {
                var left = parseInt($(".top-imgfixed").css("left")) - 40;
                var l = left + (index_div_pro[1].sx + index_div_pro[1].mw - (mousepos.x - 100) / index_div_pro[1].bx * index_div_pro[1].rx - left) * 0.2;
                $(".top-imgfixed").css({
                    left: l
                })
            }
        },
        15);

        $("body").mousemove(function(event) {
            event = event || window.event;
            ePageX = event.pageX;
            ePageY = event.pageY;
        });

        // 邀请城主
        $('.top-img2').on('click', '.btn-yellow', function() {
            $.msgBox.Alert(' ', '邀请你成为致设计城主，躁动全城“约一夏”<br>' + window.location.href + '<div style="height:0;width:0;opacity:0"><textarea id="contents" style="height:0;width:0;overflow:hidden">邀请你成为致设计城主，躁动全城“约一夏”' + window.location.href + '</textarea></div>');
            $('#sw-btn-box').html('<a id="sw-btn-copy" href="javascript:;">复制</a>');
            $('#sw-msg').css({
                'font-size': '20px',
                'color': '#333'
            });
            $('#sw-btn-copy').on('click', function() {
                copyToClipboard();
                alert('复制成功！')
            });
        });

        // 尺码选项美化
        if ($('#popup-size').length) {
            ztradioboxSelect('#popup-size');
        };

        // 报名显示弹窗
        $('.left-city').on('click', '.btn-green-big', function() {
            $('.popup-zt-bm').show();
            centerObj('.popup-zt-bm .popup');
        });

        // 提交报名信息
        $('.popup-zt-bm').on('click', '.btn', function() {
            var list= $('#popup-size').find('input:radio:checked').val();
            if(!$.trim($('.popup-zt-bm').find('.txt:eq(0)').val())) {
                alertMsg('姓名不能为空！');
                return false;
            }
            else if(!$.trim($('.popup-zt-bm').find('.txt:eq(1)').val())) {
                alertMsg('电话不能为空！');
                return false;
            }
            else if($.trim($('.popup-zt-bm').find('.txt:eq(1)').val()).length != 11) {
                alertMsg('电话格式不正确！');
                return false;
            }
            else if(list == null) {
                alertMsg('尺码不能为空！');
                return false;
            }
            $('.left-city').find('.btn-green-big').addClass('btn-gray-big').removeClass('btn-green-big').html('您已报名');
            $('.popup-zt-bm').hide();
            console.log('提交成功')
        });

    };
});
})(jQuery);

function ztradioboxSelect(obj) {
    jQuery(obj).find('label').removeClass('ico-radio-cur');
    jQuery.each(jQuery(obj).find('input[type=radio]'), function(i) {
        if (jQuery(this).prop('checked')) {
            jQuery(this).parents('label').addClass('ico-radio-cur');
        }
        jQuery(this).on('change', function() {
            if (jQuery(this).prop('checked')) {
                jQuery(this).parents(obj).find('label').removeClass('ico-radio-cur');
                jQuery(this).parents('label').addClass('ico-radio-cur');
            } else {
                jQuery(this).parents('label').removeClass('ico-radio-cur');
            }
        });
    });
};
