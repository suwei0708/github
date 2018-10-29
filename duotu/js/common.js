$(function() {
    //返回顶部
    $('#goBack').on('click', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });

    // 通用盒子切换
    $('.box-tab').on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.box').find('.list').hide().eq($(this).index()).show()
    });

    // checkbox美化
    if ($('.checkbox-box').length) {
        checkboxSelect('.checkbox-box');
    };
    // radio美化
    if ($('.radio-box').length) {
        radioSelect('.radio-box');
    };

});


function isEmail(str) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(str);
};

function centerObj(obj) {
    var boxWidth = jQuery(obj).outerWidth();
    var boxHeight = jQuery(obj).outerHeight();
    jQuery(obj).css({
        'margin-top': -boxHeight / 2 + 'px',
        'margin-left': -boxWidth / 2 + 'px'
    });
};

// radio选中效果
function radioSelect(obj) {
    jQuery(obj).find('span').removeClass('ico-radio-cur');
    jQuery.each(jQuery(obj).find('input[type=radio]'), function(index) {
        if (!jQuery(this).parents('label').find('.ico-radio').length) {
            jQuery(this).wrap('<span class="ico-radio"></span>');
        }
        if (jQuery(this).prop('checked')) {
            jQuery(this).parents('span').addClass('ico-radio-cur')
        }
        jQuery(this).on('change', function() {
            if (jQuery(this).prop('checked')) {
                jQuery(this).parents(obj).find('span').removeClass('ico-radio-cur');
                jQuery(this).parents('span').addClass('ico-radio-cur');
            } else {
                jQuery(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};
// checkbox选中效果
function checkboxSelect(obj) {
    jQuery(obj).find('span').removeClass('ico-radio-cur');
    jQuery.each(jQuery(obj).find('input[type=checkbox]'), function(i) {
        if (!jQuery(this).parents('label').find('.ico-radio').length) {
            jQuery(this).wrap('<span class="ico-radio"></span>');
        }
        if (jQuery(this).prop('checked')) {
            jQuery(this).parents('span').addClass('ico-radio-cur');
        }
        jQuery(this).on('change', function() {
            if (jQuery(this).prop('checked')) {
                jQuery(this).parents('span').addClass('ico-radio-cur');
            } else {
                jQuery(this).parents('span').removeClass('ico-radio-cur');
            }
        });
    });
};

function isMobile(sMobile) {
    if (/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(sMobile)) {
        return false;
    } else {
        return true;
    }
}


// alert和confirm美化
// 调用方法, 标题为null则不显示标题
// $.msgBox.Alert('title', 'msg');
// $.msgBox.Confirm('title', 'msg', func);
(function() {
    jQuery.msgBox = {
        Alert: function(title, msg) {
            GenerateHtml('alert', title, msg);
            btnOk();
            btnNo();
        },
        Confirm: function(title, msg, callback) {
            GenerateHtml('confirm', title, msg);
            btnOk(callback);
            btnNo();
        }
    }
    //生成Html
    var GenerateHtml = function(type, title, msg) {
        var _html = '<div id="sw-con-mask"><div id="sw-con">';
        if (title) {
            _html += '<div id="sw-tit">' + title + '</div><a id="sw-close" href="javascript:;"><span class="icon-close"></span></a>';
        }
        _html += '<div id="sw-msg">' + msg + '</div><div id="sw-btn-box">';

        if (type == 'alert') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
        }
        if (type == 'confirm') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
            _html += '<a id="sw-btn-no" href="javascript:;">取消</a>';
        }
        _html += '</div></div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('#sw-con').width();
        var boxHeight = jQuery('#sw-con').height();
        //让提示框居中
        jQuery('#sw-con-mask').css({
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 990,
            width: '100%',
            height: '100%',
            background: '#000',
            background: 'rgba(0, 0, 0, .8)'
        });
        jQuery('#sw-con').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#sw-btn-ok').on('click', function() {
            jQuery('#sw-con-mask').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-con-mask').remove();
        });
    }
})();

function alertMsg(title, txt) {
    jQuery.msgBox.Alert(title, txt);
}
function confirmMsg(title, txt, func) {
    jQuery.msgBox.Confirm(title, txt, func);
}

// 无缝滚动插件
(function($){
    $.fn.kxbdMarquee=function(options){
        var opts=$.extend({},$.fn.kxbdMarquee.defaults, options);

        return this.each(function(){
            var $marquee=$(this);               //滚动元素容器
            var _scrollObj=$marquee.get(0);     //滚动元素容器DOM
            var scrollW=$marquee.width();       //滚动元素容器的宽度
            var scrollH=$marquee.height();      //滚动元素容器的高度
            var $element=$marquee.children();   //滚动元素
            var $kids=$element.children();      //滚动子元素
            var scrollSize=0;                   //滚动元素尺寸

            //滚动类型，1左右，0上下
            var _type=(opts.direction=="left"||opts.direction=="right") ? 1:0;

            //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
            $element.css(_type?"width":"height",10000);

            //获取滚动元素的尺寸
            if(opts.isEqual){
                scrollSize=$kids[_type?"outerWidth":"outerHeight"]()*$kids.length;
            }else{
                $kids.each(function(){
                    scrollSize+=$(this)[_type?"outerWidth":"outerHeight"]();
                });
            };

            //滚动元素总尺寸小于容器尺寸，不滚动
            if(scrollSize<(_type?scrollW:scrollH)){return;};

            //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
            $element.append($kids.clone()).css(_type?"width":"height",scrollSize*2);

            var numMoved=0;
            function scrollFunc(){
                var _dir=(opts.direction=="left"||opts.direction=="right") ? "scrollLeft":"scrollTop";
                if (opts.loop>0) {
                    numMoved+=opts.scrollAmount;
                    if(numMoved>scrollSize*opts.loop){
                        _scrollObj[_dir]=0;
                        return clearInterval(moveId);
                    };
                };

                if(opts.direction=="left"||opts.direction=="up"){
                    var newPos=_scrollObj[_dir]+opts.scrollAmount;
                    if(newPos>=scrollSize){
                        newPos-=scrollSize;
                    }
                    _scrollObj[_dir]=newPos;
                }else{
                    var newPos=_scrollObj[_dir]-opts.scrollAmount;
                    if(newPos<=0){
                        newPos += scrollSize;
                    };
                    _scrollObj[_dir]=newPos;
                };
            };

            //滚动开始
            var moveId=setInterval(scrollFunc, opts.scrollDelay);

            //鼠标划过停止滚动
            $marquee.hover(function(){
                clearInterval(moveId);
            },function(){
                clearInterval(moveId);
                moveId=setInterval(scrollFunc, opts.scrollDelay);
            });
        });
    };

    $.fn.kxbdMarquee.defaults={
        isEqual:true,       //所有滚动的元素长宽是否相等,true,false
        loop: 0,            //循环滚动次数，0时无限
        direction: "left",  //滚动方向，"left","right","up","down"
        scrollAmount:1,     //步长
        scrollDelay:20      //时长

    };

    $.fn.kxbdMarquee.setDefaults=function(settings) {
        $.extend( $.fn.kxbdMarquee.defaults, settings );
    };
})(jQuery);

//图片上传预览
var uploadPreview = function(setting) {
    /*
    *work:this(当前对象)
    */
    var _self = this;
    /*
    *work:判断为null或者空值
    */
    _self.IsNull = function(value) {
        if (typeof (value) == "function") { return false; }
        if (value == undefined || value == null || value == "" || value.length == 0) {
            return true;
        }
        return false;
    }
    /*
    *work:默认配置
    */
    _self.DefautlSetting = {
        UpBtn: "",
        DivShow: "",
        ImgShow: "",
        Width: 100,
        Height: 100,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function() { }
    };
    /*
    *work:读取配置
    */
    _self.Setting = {
        UpBtn: _self.IsNull(setting.UpBtn) ? _self.DefautlSetting.UpBtn : setting.UpBtn,
        DivShow: _self.IsNull(setting.DivShow) ? _self.DefautlSetting.DivShow : setting.DivShow,
        ImgShow: _self.IsNull(setting.ImgShow) ? _self.DefautlSetting.ImgShow : setting.ImgShow,
        Width: _self.IsNull(setting.Width) ? _self.DefautlSetting.Width : setting.Width,
        Height: _self.IsNull(setting.Height) ? _self.DefautlSetting.Height : setting.Height,
        ImgType: _self.IsNull(setting.ImgType) ? _self.DefautlSetting.ImgType : setting.ImgType,
        ErrMsg: _self.IsNull(setting.ErrMsg) ? _self.DefautlSetting.ErrMsg : setting.ErrMsg,
        callback: _self.IsNull(setting.callback) ? _self.DefautlSetting.callback : setting.callback
    };
    /*
    *work:获取文本控件URL
    */
    _self.getObjectURL = function(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    /*
    *work:绑定事件
    */
    _self.Bind = function() {
        document.getElementById(_self.Setting.UpBtn).onchange = function(e) {
            var filemaxsize = 1024 * 10;//10M
            var target = jQuery(e.target);
            var Size = target[0].files[0].size / 1024;

            // console.log(Size);
            if(Size > filemaxsize) {
                alertMsg(null, '图片大于10M，请重新选择!');
                return false;
            }
            if(!this.files[0].type.match(/image.*/)) {
                alertMsg(null, '请选择正确的图片!');
                return false;
            }

            if (this.value) {
                if (!RegExp("\.(" + _self.Setting.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alertMsg(_self.Setting.ErrMsg);
                    this.value = "";
                    return false;
                }
                if (navigator.userAgent.indexOf("MSIE") > -1) {
                    try {
                        document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                    } catch (e) {
                        var div = document.getElementById(_self.Setting.DivShow);
                        this.select();
                        top.parent.document.body.focus();
                        var src = document.selection.createRange().text;
                        document.selection.empty();
                        document.getElementById(_self.Setting.ImgShow).style.display = "none";
                        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        div.style.width = _self.Setting.Width + "px";
                        div.style.height = _self.Setting.Height + "px";
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                }
                _self.Setting.callback();
            }
        }
    }
    /*
    *work:执行绑定事件
    */
    _self.Bind();
}