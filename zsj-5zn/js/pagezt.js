(function($) {
$(function() {
    // ʮ����������
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

    // ��������
    $('.light-up').on('click', '.btn', function() {
        if(!$('.light-up').find('.btn-yellow-small').length) {
            var _this = $(this);
            $.msgBox.Confirm(null, 'ÿλ�û�ֻ�ܵ���һ������Ŷ~<br><strong>ȷ��Ҫ������'+ _this.html() +'����</strong>', function() {
                _this.attr('class', 'btn btn-yellow-small');
                $.msgBox.Alert(null, '<div class="ico-suc"></div><strong>�����ɹ�</strong>');
            });
        }
        else {
            $.msgBox.Alert(null, '���ѵ����˳��У�');
        }
    });

    // ��д����
    var submitFrom;
    $('.zt-txzl').on('click', '.btn', function() {
        submitFrom = 0;
        $.each($('.zt-txzl').find('.input'), function(index, val) {
            if($.trim($(this).val()) == '' && $(this).parents('.item-half').find('.title').html() != 'Э����') {
                var tips = $(this).parent().prevAll('.title').html();
                $.msgBox.Alert(null, tips + '����Ϊ�գ�');
                return false;
            }
            else if($(this).parents('.item-half').find('.title').html() != 'Э����'){
                submitFrom++;
            }
            if(submitFrom == $('.zt-txzl').find('.input').length - 1) {
                $('.zt-txzl').find('.input').val('');
                $.msgBox.Alert(null, '�ύ�ɹ���');
            }
        });
    });

    if($(".top-imgfixed").length) {
        // ͷͼ����
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

        // �������
        $('.top-img2').on('click', '.btn-yellow', function() {
            $.msgBox.Alert(' ', '�������Ϊ����Ƴ������궯ȫ�ǡ�Լһ�ġ�<br>' + window.location.href + '<div style="height:0;width:0;opacity:0"><textarea id="contents" style="height:0;width:0;overflow:hidden">�������Ϊ����Ƴ������궯ȫ�ǡ�Լһ�ġ�' + window.location.href + '</textarea></div>');
            $('#sw-btn-box').html('<a id="sw-btn-copy" href="javascript:;">����</a>');
            $('#sw-msg').css({
                'font-size': '20px',
                'color': '#333'
            });
            $('#sw-btn-copy').on('click', function() {
                copyToClipboard();
                alert('���Ƴɹ���')
            });
        });

        // ����ѡ������
        if ($('#popup-size').length) {
            ztradioboxSelect('#popup-size');
        };

        // ������ʾ����
        $('.left-city').on('click', '.btn-green-big', function() {
            $('.popup-zt-bm').show();
            centerObj('.popup-zt-bm .popup');
        });

        // �ύ������Ϣ
        $('.popup-zt-bm').on('click', '.btn', function() {
            var list= $('#popup-size').find('input:radio:checked').val();
            if(!$.trim($('.popup-zt-bm').find('.txt:eq(0)').val())) {
                alertMsg('��������Ϊ�գ�');
                return false;
            }
            else if(!$.trim($('.popup-zt-bm').find('.txt:eq(1)').val())) {
                alertMsg('�绰����Ϊ�գ�');
                return false;
            }
            else if($.trim($('.popup-zt-bm').find('.txt:eq(1)').val()).length != 11) {
                alertMsg('�绰��ʽ����ȷ��');
                return false;
            }
            else if(list == null) {
                alertMsg('���벻��Ϊ�գ�');
                return false;
            }
            $('.left-city').find('.btn-green-big').addClass('btn-gray-big').removeClass('btn-green-big').html('���ѱ���');
            $('.popup-zt-bm').hide();
            console.log('�ύ�ɹ�')
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
