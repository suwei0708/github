$(function() {
    // 观看历史继续观看
    $('.user-list .masks a').on('mouseenter', function() {
        $(this).parents('.masks').show();
    }).on('mousemove', function() {
        $(this).parents('.masks').show();
    });
    $('.user-list .img').on('mouseenter', function() {
        $(this).find('.masks').show();
    }).on('mouseout', function() {
        $(this).find('.masks').hide();
    });

    // 删除单个观看历史
    $('.user-history .close-history').on('click', function() {
         if(confirm("您是否删除该学习记录")){
         $.get("/Userinfo/Delhistory/Id/"+$(this).attr("myid"),function(){
         })
         $(this).parents('li').remove();
        }
    });
    // 删除所有观看历史
    $('#delall').on('click', function() {
         if(confirm("您是否删除该记录")){
         $.get("/Userinfo/Delall/",function(){
             location.reload();
         })
        }
    });

    // 删除单个收藏历史
    $('.user-collect .close-history').on('click', function() {

        if($(this).attr("myattr")=="zy"){
            if(confirm("您是否删除该作业")){
                $.post("/Userinfo/Delzuoye/",{id:$(this).attr("myid")},function(){
                })
                $(this).parents('li').remove();
            }
        }else if($(this).attr("myattr")=="fav"){
            if(confirm("您是否删除该收藏")){
                $.get("/UserFavorite/Delcon/Id/"+$(this).attr("myid"),function(){
                })
                $(this).parents('li').remove();
            }
        }

    });

    // 基本资料性别选项
    $('#sex').find('input[type=radio]').wrap('<span class="user-ico ico-radio"></span>')
    sexSelect('#sex');
    $('#sex').on('change', function() {
        sexSelect('#sex');
    });

    // 裁剪头像
    $('#avatarInput').on('change', function(e) {
        var filemaxsize = 1024 * 1;//5M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;
        if(Size > filemaxsize) {
            alert('图片大于1M，请重新选择!');
            return false;
        }
        if(!this.files[0].type.match(/image.*/)) {
            alert('请选择正确的图片!');
        } else {
            var file = target[0].files[0];
            var src = window.URL.createObjectURL(file);
            $('.user-editbox .img').html('<img id="image" src="' + src + '" width="335" height="335"/>');
            var image = document.getElementById('image');
            $(image).on('load', function() {
                $(image).cropper({
                    aspectRatio: 200 / 200,
                    viewMode : 2,//显示
                    dragMode : "move",
                    preview: '.img-preview'
                });
            });
        }
    });

    // 关闭裁剪头像
    $('.user-editbox-close').on('click', function() {
        $('.user-editbox').hide();
        $('.mask').hide();
    });

    // 上传图像
    $('.data-img').on('click', '.btn', function() {
        $('.user-editbox').show();
        $('.mask').show();

        var src = $('.data-img .img img').attr('src');
        $('.user-editbox .img').html('<img id="image" src="' + src + '" width="335" height="335"/>');
        var image = document.getElementById('image');
        $(image).on('load', function() {
            $(image).cropper({
                aspectRatio: 200 / 200,
                viewMode : 2,//显示
                dragMode : "move",
                preview: '.img-preview'
            });
        });
    });

    // 保存头像
    $('.user-editbox').on('click', '.btn', function() {
        var $image = $('user-editbox img');
        var img_lg = document.getElementById('avatar-img');

        var image = document.getElementById('image');
        var $imgData = $(image).cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        });
        var dataUrl = $imgData.toDataURL('image/png');

        $.post("/Userinfo/Uppic/",{dataurl:dataUrl},function(data){
             if(data!=""){
                $('.user-editbox').hide();
                // 保存成功
                tipSave('suc', '保存成功!');
                $('.data-img').find('img').attr('src', data);
             }
             else{
                $('.user-editbox').hide();
                tipSave('suc', '保存失败!');
             }
        });
    });


    // 初始化城市
    initCitys();

    // 点击城市选项
    $('#city-input').on('click', function() {
        initCitys();
        if($('#city-input').attr('data-city')) {
            $('.sw-select').show();
        }
        else {
            $('.sw-select1').show();
        }
        return false;
    });

    // 点击左侧城市
    $('.sw-select1').on('click', 'a', function() {
        $(this).addClass('cur').parent('li').siblings().find('a').removeClass('cur');
        twoCitys();
        $('.sw-select2').show();
        return false;
    });
    // 点击右侧城市
    $('.sw-select2').on('click', 'a', function() {
        $(this).addClass('cur').parent('li').siblings().find('a').removeClass('cur');
        $('#city-input').val($('.sw-select1').find('.cur').text() + ' / ' + $('.sw-select2').find('.cur').text());
        $('#city-input').attr('data-province', $('.sw-select1').find('.cur').text()).attr('data-city', $('.sw-select2').find('.cur').text())
        $('.sw-select').hide();

        $('#city-input').blur();
        return false;
    });

    // 点击body关闭城市选项
    if($('.sw-select').size()) {
        $('body').on('click', function() {
            $('.sw-select').hide();
        })
    }
var isfalses=0;
    // 保存基本资料
    $('.btn-save').on('click', function() {
        $.each($('.user-data .txt'), function(index) {
            var _this = $(this);
            if(_this.attr("id")!="city-input"&&!$.trim(_this.val())) {
                if(_this.nextAll('.tips').size()) {
                    _this.nextAll('.tips').attr('class', 'tips tips-error');
                    _this.nextAll('.tips').find('.text').text(_this.parents('dl').find('dt').text() + '不能为空')
                }
                else {
                    _this.after('<div class="tips tips-error"><span class="user-ico"></span><span class="text">' + _this.parents('dl').find('dt').text() + '不能为空</span></div>')
                }
            }
        });
        isfalses=$(".tips-error").length;
        if(isfalses>0){
            return false;
        }
        if ($("#realname").val() != "" && $("#qq").val() != "") {
            var addr = $("#city-input").attr("data-province") + "/" + $("#city-input").attr("data-city");
            $.post("/Userinfo/SaveInfo/", {
                realname: $("#realname").val(),
                qq: $("#qq").val(),
                sex: $('input[name="sex"]:checked ').val(),
                addr: addr,
                job: $("#job").val(),
                teacherid: $("#teacherid").val(),
                useremail: $("#useremail").val(),
                url: $("#url").val(),
                other: $("#other").val(),
                sign: $("#sign").val(),
                content: $("#content").val(),
                userface: $(".data-img img").attr("src")
            }, function() {
                //保存成功
                tipSave('suc', '保存成功!');
                $('.mask').show();
            })
        }

        // var submit = 0;
        // $.each($('.user-data .txt'), function(index) {
        //     var _this = $(this);
        //     if(!$.trim(_this.val()) && !_this.hasClass('qq') && !_this.hasClass('sex') && !_this.hasClass('email')) {
        //         if(_this.nextAll('.tips').size()) {
        //             _this.nextAll('.tips').attr('class', 'tips tips-error');
        //             _this.nextAll('.tips').find('.text').text(_this.parents('dl').find('dt').text().replace(/[*]/g, '') + '不能为空')
        //         }
        //         else {
        //             _this.after('<div class="tips tips-error"><span class="user-ico"></span><span class="text">' + _this.parents('dl').find('dt').text().replace(/[*]/g, '') + '不能为空</span></div>')
        //         }
        //         submit++;
        //         return false;
        //     }
        // });
        // if(submit == 0) {
        //     // 保存成功
        //     tipSave('suc', '保存成功!');
        //     $('.mask').show();
        //     // 保存成功
        //     // tipSave('fail', '保存失败!');
        // }


    });

    function sumkey(_this,num){
       var len=$(_this).val().length()
        $(_this).parents("dd .num").html(len);
        if(len>num){
            $(_this).val( $(_this).val().substring(num))
        }
    }
    // input失去焦点判断
    $('.user-data .txt').on('blur', function() {
        var _this = $(this);
        var text = _this.parents('dl').find('dt').text();

        if(!$.trim(_this.val()) && !_this.hasClass('qq') && !_this.hasClass('sex') && !_this.hasClass('email')) {
            if(_this.nextAll('.tips').size()) {
                _this.nextAll('.tips').attr('class', 'tips tips-error');
                _this.nextAll('.tips').find('.text').text(_this.parents('dl').find('dt').text().replace(/[*]/g, '') + '不能为空')
            }
            else {
                _this.after('<div class="tips tips-error"><span class="user-ico"></span><span class="text">' + _this.parents('dl').find('dt').text().replace(/[*]/g, '') + '不能为空</span></div>')
            }
            return false;
        }
        else {
            if(_this.hasClass('qq') || _this.hasClass('sex') || _this.hasClass('email')) {
                return false;
            }
            if(_this.nextAll('.tips').size()) {
                _this.nextAll('.tips').attr('class', 'tips tips-right');

                if(_this.attr('id') == 'realname') {
                    _this.nextAll('.tips').find('.text').text('需重新登录才会显示修改后的昵称哦~');
                }
                else {
                    _this.nextAll('.tips').find('.text').text('');
                }
            }
            else {
                if(_this.attr('id') == 'realname') {
                    _this.after('<div class="tips tips-right"><span class="user-ico"></span><span class="text">需重新登录才会显示修改后的昵称哦~</span></div>')
                }
                else {
                    _this.after('<div class="tips tips-right"><span class="user-ico"></span><span class="text"></span></div>')
                }
            }
            return false;
        }
    });

    // 我的作业大图展示
    if($('.user-task').size()) {
        $('.user-task').on('click', '.masks a:even', function() {
            var _this = $(this);
            console.log(_this)
            if(!$('.popup-carrousel').size()) {
                $('body').append('<div class="popup-carrousel"><a href="javascript:;" class="c-ico close"></a><img /></div>');
            }
            $('.popup-carrousel').find('img').attr('src', _this.parents('.masks').prev('img').data('src'));
            $('.popup-carrousel').show();
        });
    }

    // 删除单个我的作业
    $('.user-task .close-history').on('click', function() {
        if(confirm("确认删除该作业吗")){
         $.post("/Userinfo/Delzuoye",{id:$(this).attr("myid")},function(){

         })
        $(this).parents('li').remove();
        }
    });

    if($('#masonry').size()) {
        var $container = $('#masonry');
        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: '.masonry-box',
                gutter: 33,
                isAnimated: true,
            });
        });
    }

    // 个人资料下拉
    $('.user-select').on('click', '.txt', function() {
        $(this).parents('.user-select').find('.user-select-list').show();
    });
    if($('.user-select').length) {
        $('body').on('click', function() {
            $('.user-select-list').hide();
        })
    };
    $('.user-select').on('click', function(e) {
        e.stopPropagation();
    });
    $('.user-select-list1').on('click', 'li', function() {
        $(this).parents('.user-select').find('.txt').val($(this).text()).blur();
        $(this).parents('.user-select-list').hide();
    });

    // 领域3个判定
    var lingyu = [];
    $('.user-select-list2').on('click', 'li', function() {
        if($(this).hasClass('cur')) {
            $(this).removeClass('cur');
            removeArr(lingyu, $(this).text());
        }
        else {
            if(lingyu.length >= 3) {
                return false;
            }
            $(this).addClass('cur');
            lingyu.push($(this).text());
        }
        $(this).parents('.user-select').find('.txt').val(lingyu.toString().replace(/,/g, ' / ')).blur();
        console.log(lingyu)
    });
    if($('.user-data .num-box').length) {
        $.each($('.user-data .txt2'), function(i) {
            monitorVal($(this), $(this).parent().find('.length').text(), 'minus');
        });
    }

    // 我的消息字数判定
    if($('.user-message .num-box').length) {
        $.each($('.user-message .textarea'), function(i) {
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
});


// 基本资料性别选项
function sexSelect(obj) {
    $(obj).find('span').removeClass('ico-radio-cur');
    $.each($(obj).find('input[type=radio]'), function(index) {
        if($(this).prop('checked')) {
            $(this).parents('span').addClass('ico-radio-cur')
        }
    });
}

// 保存成功失败 status为suc或者fail，cont为提示的内容
function tipSave(status, cont) {
    if(!$('.user-tip').size()) {
        $('body').append('<div class="user-tip">'
            + '<span class="user-ico ico-' + status + '"></span>'
            + '<span class="text">' + cont + '</span>'
        +'</div>');
    }
    else {
        $('.user-tip').find('.user-ico').attr('class', 'user-ico ico-' + status);
        $('.user-tip').find('.text').html(cont);
    }
    $('.user-tip').show();
    setTimeout(function() {
        $('.user-tip').hide();
        $('.mask').hide();
    }, 1500);
}

// 判断邮箱
function CheckMail(mail) {
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) return true;
    else {
        return false;
    }
}

/*
*  全国二级城市联动 json
*/
var cityJson = {
    "0": ["北京市","天津市","上海市","重庆市","河北省","山西省","内蒙古","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西","海南省","四川省","贵州省","云南省","西藏","陕西省","甘肃省","青海省","宁夏","新疆","香港","澳门","台湾省"],
    "0_0": ["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云县","延庆县","延庆镇"],
    "0_1": ["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","蓟县","宁河县","芦台镇","静海县","静海镇"],
    "0_2": ["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","闵行区","宝山区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区","崇明县","城桥镇"],
    "0_3": ["渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万州区","涪陵区","黔江区","长寿区","合川市","永川区市","江津市","南川市","綦江县","潼南县","铜梁县","大足县","荣昌县","璧山县","垫江县","武隆县","丰都县","城口县","梁平县","开县","巫溪县","巫山县","奉节县","云阳县","忠县","石柱土家族自治县","彭水苗族土家族自治县","酉阳土家族苗族自治县","秀山土家族苗族自治县"],
    "0_4": ["石家庄市","张家口市","承德市","秦皇岛市","唐山市","廊坊市","保定市","衡水市","沧州市","邢台市","邯郸市"],
    "0_5": ["太原市","朔州市","大同市","阳泉市","长治市","晋城市","忻州市","晋中市","临汾市","吕梁市","运城市"],
    "0_6": ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","呼伦贝尔市","鄂尔多斯市","乌兰察布市","巴彦淖尔市","兴安盟","锡林郭勒盟","阿拉善盟"],
    "0_7": ["沈阳市","朝阳市","阜新市","铁岭市","抚顺市","本溪市","辽阳市","鞍山市","丹东市","大连市","营口市","盘锦市","锦州市","葫芦岛市"],
    "0_8": ["长春市","白城市","松原市","吉林市","四平市","辽源市","通化市","白山市","延边州"],
    "0_9": ["哈尔滨市","齐齐哈尔市","七台河市","黑河市","大庆市","鹤岗市","伊春市","佳木斯市","双鸭山市","鸡西市","牡丹江市","绥化市","大兴安岭地区"],
    "0_10": ["南京市","徐州市","连云港市","宿迁市","淮安市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"],
    "0_11": ["杭州市","湖州市","嘉兴市","舟山市","宁波市","绍兴市","衢州市","金华市","台州市","温州市","丽水市"],
    "0_12": ["合肥市","宿州市","淮北市","亳州市","阜阳市","蚌埠市","淮南市","滁州市","马鞍山市","芜湖市","铜陵市","安庆市","黄山市","六安市","巢湖市","池州市","宣城市"],
    "0_13": ["福州市","南平市","莆田市","三明市","泉州市","厦门市","漳州市","龙岩市","宁德市"],
    "0_14": ["南昌市","九江市","景德镇市","鹰潭市","新余市","萍乡市","赣州市","上饶市","抚州市","宜春市","吉安市"],
    "0_15": ["济南市","青岛市","聊城市","德州市","东营市","淄博市","潍坊市","烟台市","威海市","日照市","临沂市","枣庄市","济宁市","泰安市","莱芜市","滨州市","菏泽市"],
    "0_16": ["郑州市","开封市","三门峡市","洛阳市","焦作市","新乡市","鹤壁市","安阳市","濮阳市","商丘市","许昌市","漯河市","平顶山市","南阳市","信阳市","周口市","驻马店市","济源市"],
    "0_17": ["武汉市","十堰市","襄樊市","荆门市","孝感市","黄冈市","鄂州市","黄石市","咸宁市","荆州市","宜昌市","随州市","省直辖县级行政单位","恩施州"],
    "0_18": ["长沙市","张家界市","常德市","益阳市","岳阳市","株洲市","湘潭市","衡阳市","郴州市","永州市","邵阳市","怀化市","娄底市","湘西州"],
    "0_19": ["广州市","深圳市","清远市","韶关市","河源市","梅州市","潮州市","汕头市","揭阳市","汕尾市","惠州市","东莞市","珠海市","中山市","江门市","佛山市","肇庆市","云浮市","阳江市","茂名市","湛江市"],
    "0_20": ["南宁市","桂林市","柳州市","梧州市","贵港市","玉林市","钦州市","北海市","防城港市","崇左市","百色市","河池市","来宾市","贺州市"],
    "0_21": ["海口市","三亚市","省直辖行政单位"],
    "0_22": ["成都市","广元市","绵阳市","德阳市","南充市","广安市","遂宁市","内江市","乐山市","自贡市","泸州市","宜宾市","攀枝花市","巴中市","达州市","资阳市","眉山市","雅安市","阿坝州","甘孜州","凉山州"],
    "0_23": ["贵阳市","六盘水市","遵义市","安顺市","毕节地区","铜仁地区","黔东南州","黔南州","黔西南州"],
    "0_24": ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","德宏州","怒江州","迪庆州","大理州","楚雄州","红河州","文山州","西双版纳州"],
    "0_25": ["拉萨市","那曲地区","昌都地区","林芝地区","山南地区","日喀则地区","阿里地区"],
    "0_26": ["西安市","延安市","铜川市","渭南市","咸阳市","宝鸡市","汉中市","榆林市","安康市","商洛市"],
    "0_27": ["兰州市","嘉峪关市","白银市","天水市","武威市","酒泉市","张掖市","庆阳市","平凉市","定西市","陇南市","临夏州","甘南州"],
    "0_28": ["西宁市","海东地区","海北州","海南州","黄南州","果洛州","玉树州","海西州"],
    "0_29": ["银川市","石嘴山市","吴忠市","固原市","中卫市"],
    "0_30": ["乌鲁木齐市","克拉玛依市","自治区直辖县级行政单位","喀什地区","阿克苏地区","和田地区","吐鲁番地区","哈密地区","克孜勒苏柯州","博尔塔拉州","昌吉州","巴音郭楞州","伊犁州","塔城地区","阿勒泰地区"],
    "0_31": ["香港特别行政区"],
    "0_32": ["澳门特别行政区"],
    "0_33": ["台北","高雄","台中","花莲","基隆","嘉义","金门","连江","苗栗","南投","澎湖","屏东","台东","台南","桃园","新竹","宜兰","云林","彰化"]
};

function initCitys() {
    if($('#city-input').size()) {
        var province = $('#city-input').attr('data-province');
        var city = $('#city-input').attr('data-city');

        if(!$('.sw-select').size()) {
            $('#city-input').after('<ul class="sw-select sw-select1"></ul><ul class="sw-select sw-select2"></ul>');
        }
        if(!$('.sw-select1 a').hasClass('cur')) {
            $.each(cityJson[0], function(i, val) {
                if(val == province) {
                    $('.sw-select1').append('<li><a href="javascript:;" class="cur" data-num="' + i + '">' + val + '<span class="user-ico arrow"></span></a></li>');
                }
                else {
                    $('.sw-select1').append('<li><a href="javascript:;" data-num="' + i + '">' + val + '<span class="user-ico arrow"></span></a></li>');
                }
            });
        };
        if($('.sw-select1 a').hasClass('cur')) {
            var citys = cityJson['0_' + $('.sw-select1').find('.cur').attr('data-num')];
            $.each(citys, function(i, val) {
                if(val == city) {
                    $('.sw-select2').append('<li><a href="javascript:;" class="cur" data-num="' + i + '">' + val + '</a></li>');
                }
                else {
                    $('.sw-select2').append('<li><a href="javascript:;">' + val + '</a></li>');
                }
            });
        }
    }
}

function twoCitys() {
    var city = $('#city-input').attr('data-city');
    var citys = cityJson['0_' + $('.sw-select1').find('.cur').attr('data-num')];
    $('.sw-select2').html('');
    $.each(citys, function(i, val) {
        if(val == city) {
            $('.sw-select2').append('<li><a href="javascript:;" class="cur">' + val + '</a></li>');
        }
        else {
            $('.sw-select2').append('<li><a href="javascript:;">' + val + '</a></li>');
        }
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

function removeArr(arr, item) {
    for(var i=arr.length-1;i>=0;i--)
      {
       if(arr[i]==item)
         {
           arr.splice(i,1);
          }
       }
    return arr;
}