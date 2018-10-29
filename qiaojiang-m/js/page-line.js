$(function() {
    var MASK = $('#mask');
    // 首页轮播
    if($('.swiper1').length) {
        new Swiper('.swiper1',{
            autoplay: 5000,//可选选项，自动滑动
            pagination : '.pagination1',
            loop: true,
        });
    }

    // 首页课程切换
    tab('#index-nav', '#index-list ul');

    // 视频教程页课程切换
    $('#list-nav').on('click', 'li', function() {
        if(!$(this).hasClass('cur')) {
            MASK.show();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('#list-list').find('ul').eq($(this).index()).fadeIn().siblings().hide();
            $('.header').css({'z-index': '991'});
        }
        else {
            MASK.hide();
            $('#list-nav').find('li').removeClass('cur');
            $('#list-list').find('ul').hide();
        }
    });
    // 视频播放页切换
    tab('#play-nav', '#play-ct .play-ct');

    var $so = $('#so');
    var $input = $so.find('.txt');
    var $close = $so.find('.ico-close');
    var $soBtn = $('#so-btn');
    var $cancelBtn = $('#so-cancel');

    // 点击弹出搜索框
    $('.header .ico-so, #so-index').on('click', function() {
        $so.show();
        $input.focus()
        MASK.show();
        // 点击背景隐藏列表下拉
        if($('#list-nav').length) {
            $('#list-nav').find('li').removeClass('cur');
            $('#list-list').find('ul').hide();
        }
    });
    // 取消搜索
    $cancelBtn.on('click', function() {
        $so.hide();
        MASK.hide();
    });
    // 搜索输入
    $input.bind('input propertychange', function() {
        if(!!$.trim($input.val())) {
            $cancelBtn.hide();
            $soBtn.css('display', 'inline-block');
            $close.show();
        }
        else {
            $cancelBtn.css('display', 'inline-block');
            $soBtn.hide();
            $close.hide();
        }
    });
    // 清空搜索内容
    $close.on('click', function() {
        $cancelBtn.css('display', 'inline-block');
        $soBtn.hide();
        $input.val('');
        $close.hide();
    });
    // 点击搜索
    $soBtn.on('click', function() {
        msearch();
    });

    MASK.on('click', function() {
        $(this).hide();
        // 点击背景隐藏搜索框
        if($('#so').is(':visible')) {
            $('#so').hide();
        }
        // 点击背景隐藏列表下拉
        if($('#list-nav').length) {
            $('#list-nav').find('li').removeClass('cur');
            $('#list-list').find('ul').hide();
        }
        // 点击背景弹窗隐藏
        if($('.popup-box').length) {
            $('.popup-box').hide();
        }
    });

    // 搜索结果页
    var $input2 = $('#so2').find('.txt');
    var $close2 = $('#so2').find('.ico-close');
    $input2.bind('input propertychange', function() {
        if(!!$.trim($input2.val())) {
            $close2.show();
        }
        else {
            $close2.hide();
        }
    });
    // 搜索结果页清空搜索内容
    $close2.on('click', function() {
        $input2.val('');
        $close2.hide();
    });

    // 需求页、问答交流、我的消息 通用 点赞
    $('.demand-list').on('click', '.laud', function() {
        if(!$(this).hasClass('laud-cur')) {
            $(this).addClass('laud-cur').html('<span class="ico ico-laud"></span>' + (+$(this).text() + 1));
        }
    });

    // 需求页、问答交流、我的消息通用 回复
    $('.demand-list').on('click', '.reply', function() {
        $('#text').focus();
    });

    // 需求页、问答交流通用 点击小图展示大图
    $('.demand-list').on('click', '.show-img', function() {
        if(!$('.pinch-box').length) {
            $('.wrap').append('<div class="pinch-box">'
                + '<a class="close" href="javascript:;">X</a>'
                + '<div class="pinch-zoom">'
                    + '<img src="' + $(this).find('img').attr('data-img') + '"/>'
                + '</div>'
            + '</div>')
        }
        else {
            $('.pinch-zoom').find('img').attr('src', $(this).find('img').attr('data-img'))
        }
        $('.pinch-box').show();
        $('.pinch-zoom').each(function () {
            new RTP.PinchZoom($(this), {});
        });

        $('.pinch-box').on('click', '.close', function() {
            $(this).parents('.pinch-box').remove();
        });
        $('.pinch-box').on('click', function() {
            $(this).remove();
        });
        $('.pinch-zoom').on('click', function() {
            return false;
        });
    });

    // 需求页、问答交流通用 判断textarea显示行数
    $('.demand-fixed').on("keyup", '#text', function(){
        var _this = $(this);
        setTimeout(function() {
            var h = document.getElementById('text').scrollHeight;
            var l = document.getElementById('text').value.length;
            if(h != 66 && l > 21) {
                _this.css({'line-height': '0.43rem'});
            }
            else {
                _this.css({'line-height': '0.88rem'});
            }
        }, 100);
    });

    // 需求页、问答交流通用 判断是否上传图片
    $('.demand-fixed .file').on('change', function() {
        if(!!$(this).val()) {
            $(this).parents('.ico-pic').addClass('ico-pic-cur');
        }
        else {
            $(this).parents('.ico-pic').removeClass('ico-pic-cur');
        }
    });

    // 播放页分享
    $('#play-share').on('click', function(){
        $('.play-share').fadeIn();
    });
    $('.play-share').on('click', function() {
        $(this).hide();
    });
    $('.play-share-box').on('click', 'a', function() {
        $('#' + $(this).data('id'))[0].click();
        return false;
    });
    $('.play-share').on('click', '.play-share-cancel', function() {
        $('.play-share').hide();
    });

    // 完善资料 提交判断非空
    $('#basic-btn-save').on('click', function() {
        var QQ = $("#qq");
        var Mail = $("#useremail");
        if(!$.trim(QQ.val())) {
            alert('QQ号码不能为空!');
            return false;
        }
        if(!$.trim(Mail.val())) {
            alert('邮箱不能为空!');
            return false;
        }
        if(!isEmail($.trim(Mail.val()))) {
            alert('邮箱格式不正确!');
            return false;
        }
        var basicsex=0;
        if($("#picker1").val()=="女") {
            basicsex = 1;
        }
        $.post("/Userinfo/SaveInfo/",{realname:$("#realname").val(),qq:$("#qq").val(),sex:basicsex,addr:$("#picker2").val(),job:$("#job").val(),useremail:$("#useremail").val()},function(){
            //保存成功
             alert("保存成功");
        })


        //window.location.href = '个人中心.html';
        return false;
    });

    // 观看历史、我的收藏 编辑和取消
    $('.header').on('click', '.record-editor', function() {
        if($(this).text() == '编辑') {
            $(this).text('取消');
            $('.record').addClass('record-editor');
        }
        else {
            $(this).text('编辑');
            $('.record').removeClass('record-editor');
        }
    });

    // 观看历史、我的收藏 选中与取消
    $('body').on('click', '.record-editor .vip-qb li', function() {
        if($(this).find(':checkbox').prop('checked') == false) {
            $(this).find(':checkbox').prop('checked', true);
            $(this).addClass('cur');
        }
        else {
            $(this).find(':checkbox').prop('checked', false);
            $(this).removeClass('cur');
        }
        // 计算选中个数
        $('.record-del-fixed').find('.num').html($('.record-editor .vip-qb').find('.cur').length);
    });

    // 观看历史、我的收藏 全选
    $('.record-del-fixed').find('li:eq(0)').on('click', function() {
        var $li = $('.record-editor .vip-qb li');
        var $checkbox = $li.find(':checkbox');
        // 判断checkbox数量是否都选中
        if($li.length != $('.record-editor').find('.cur').length) {
            $checkbox.prop('checked', true);
        }
        else {
            $checkbox.prop('checked', false);
        }
        // 根据选中来给checkbox加样式
        $.each($checkbox, function(i) {
            if($(this).prop('checked') == false) {
                $(this).parents('li').removeClass('cur');
            }
            else {
                $(this).parents('li').addClass('cur');
            }
        });
        // 计算选中个数
        $('.record-del-fixed').find('.num').html($('.record-editor .vip-qb').find('.cur').length);
    });

    // 观看历史、我的收藏 删除
    $('.record-del-fixed').find('li:eq(1)').on('click', function() {
        if($(this).attr("myid")=="history") {
            $('.record-editor').find('.cur').each(function () {   //删除浏览记录
                $.get("/Userinfo/Delhistory/Id/" + $(this).find("input").val(), function () {

                })
            })
        }else{
            $('.record-editor').find('.cur').each(function () {   //删除收藏记录
                $.get("/UserFavorite/Delcon/Id/" + $(this).find("input").val(), function () {
                })
            })
        }

        $('.record-editor').find('.cur').remove();
        // 删除成功后刷新页面
        //window.location.href = window.location.href;
    });

    // 弹窗关闭
    $('.popup-box').on('click', '.popup-close', function() {
        $(this).parents('.popup-box').hide();
        MASK.hide();
    });

    // 评论和需求图片大小判断
    $('#uploadImg').on('change', function(e) {
        var filemaxsize = 1024 * 8;//8M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;

        if(!this.files[0].type.match(/image.*/)) {
            alert('请选择正确的图片!');
            return false;
        }
        else if(Size > filemaxsize) {
            alert('图片过大，请重新选择!');
            return false;
        }
    });

    // 基本资料设置头像
    // 上传图片
    $('#avatarInput').on('change', function(e) {
        var filemaxsize = 1024 * 8;//8M
        var target = $(e.target);
        var Size = target[0].files[0].size / 1024;

        if(!this.files[0].type.match(/image.*/)) {
            alert('请选择正确的图片!');
            return false;
        } else {
            if(Size > filemaxsize) {
                alert('图片过大，请重新选择!');
                $(".avatar-wrapper").childre().remove;
                return false;
            }
            var file = target[0].files[0];
            var src = window.URL.createObjectURL(file);
            $('.avatar-wrapper').html('<img id="image" src="' + src + '"/>');
            $('.avatar-box').show();
            var image = document.getElementById('image');
            $(image).on('load', function() {
                $(image).cropper({
                    aspectRatio: 200 / 200,
                    viewMode : 0,//显示
                    dragMode : "move"
                });
            });
        }
    });

    // 设置图片
    $(".avatar-save").on("click", function() {
        var $imgData = $(image).cropper('getCroppedCanvas', {
            width: 200,
            height: 200
        })
        dataurl = $imgData.toDataURL('image/png');
        $.post("/Userinfo/Uppic/",{dataurl:dataurl},function(data){
            if(data!=""){
                $('.avatar-box').hide();
                $('.data-list .img img').attr("src",data);
            }
            else{
                alert("保存失败")
            }
        })
        //$('.data-list .img img').attr('src', dataurl);
        //$('.avatar-box').hide();
    });

    // 控制播放页视频大小
    if($('.play').length) {
        $('#player_a, #ckplayer_a1').css({
            'width': '10rem',
            'height': '5.6rem'
        });
    }

    // 复制内容
    $('.btn-copy').on('click', function() {
        copyToClipboard();
        alert('复制成功！')
    });
});

// tab切换
function tab(tit, list) {
    $(tit).on('click', 'li', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(tit).find('.line').animate({
            'width': $(tit).find('.cur a').width(),
            'left': $(tit).find('.cur a').position().left
        }, 200);
        $(list).eq($(this).index()).fadeIn().siblings().hide();
    });
}

// 邮箱验证
function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}

/*复制代码到剪切板*/
function copyToClipboard(){
    var e = document.getElementById("contents");//对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
}

var nowimg=$('.preview').length;
function xianshi()
{
    var win = ($(window).scrollTop() + $(window).height());
    $('.preview').each(function () {
        var top = $(this).offset().top;
        if (top < win) {
            if ($(this).attr('mysrc') != '') {
                if($(this).attr('mysrc').indexOf('qiaojiang/首页')>0||$(this).attr('mysrc').indexOf('Static/images/pic')>0)
                {
                    if(top>300){
                       $(this).attr('src', $(this).attr('mysrc'))
                       $(this).attr('mysrc', '');
                    }
                }else{
                $(this).attr('src', $(this).attr('mysrc'))
                $(this).attr('mysrc', '');
                }
            }
        }
    });
 }
$(window).scroll(function () {
    if(nowimg > 0) {
        xianshi();
    }
});
if(nowimg > 0){
    xianshi();
}

function msearch(){
    var keyword = $('#words2').val();

    if(keyword == undefined || keyword.trim().length==0){
        keyword= $('#words1').val();
    }
    if(keyword == undefined || keyword.trim().length==0){
        alert("请输入关键词!");
        return false;
    }
    $.get("/Video/Getpy/?key="+keyword,function(data){
        $("#searchform").attr("action","/search/"+data+"/");
        $("#searchform").submit();
    })
}

//搜索
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
        var keyword = $('#words1').val();
        if(keyword == undefined || keyword.trim().length==0){
            keyword = $('#words2').val();
        }
        if(keyword == undefined || keyword.trim().length==0){
            alert("请输入关键词!");
            return false;
        }
        $.get("/Video/Getpy/?key="+keyword,function(data){
            $("#searchform").attr("action","/search/"+data+"/");
            $("#searchform").submit();
        })
    }
};

var nowurl=location.href;
var footid=0;
$('.footer').find('li').each(function(){
    var myid=$(this).attr('myid');

    if(nowurl.indexOf(myid)>0) {
        footid=1;
        $(this).attr('class','cur');
    }
    else {
        $(this).attr('class','');
    }
})

if(footid == 0){
    $(".footer").find("li").eq(0).attr("class","cur");
}
if($('.logo').length) {
    $('.logo').click(function() {
        location.href = "/";
    })
}