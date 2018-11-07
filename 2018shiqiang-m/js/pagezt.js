$(function() {
    /*
     * 首页
    */
    // 大赛时间
    var nowDate = new Date();
    var year = nowDate.getFullYear(); //得到年份
    var month = nowDate.getMonth() + 1;//得到月份
    month = month < 10 ? '0' + month : month;
    var date = nowDate.getDate();//得到日期
    date = date < 10 ? '0' + date : date;
    var today = year + '' + month + '' + date;
    $.each($('.zt-times .list li'), function(i) {
        if(today == $(this).data('time') || (today >= $(this).data('start') && today <= $(this).data('end'))) {
            $(this).addClass('cur');
        }
    });

    // 参选
    $('.ztbtn-canxuan').on('click', function() {
        var cxStatus = rnd(0, 1); //随机生成0，1
        if(cxStatus == 0) {
            // 参选成功
            $.ztMsg.Alert('gou', '参与成功！开始为自己拉票吧~', '进入我的参赛主页', '个人拉票页.html#navlink');
        }
        else {
            // 参选失败
            $.ztMsg.Confirm('tan', '需要 3 个或以上原创作品才能参加哟~', '去上传', 'http://www.zhisheji.com/zuopin/product/add/2/0');
        }
    });
});

/*复制代码到剪切板*/
function copyToClipboard(){
    var e = document.getElementById('contents');//对象是contents
    e.select(); //选择对象
    document.execCommand('Copy'); //执行浏览器复制命令
}

// alert和confirm美化，调用方法
// icon根据提示符号显示，有gou(勾),tan(叹号),zan(赞),liwu(礼物); msg为提示信息，btntxt为按钮文字，不填无按钮
// $.ztMsg.Alert('icon', 'msg', 'btntxt', 'btnlink');
// $.ztMsg.Confirm('icon', 'msg', 'btntxt', 'btnlink', func);
(function() {
    jQuery.ztMsg = {
        Alert: function(icon, msg, btntxt, btnlink) {
            GenerateHtml('alert', icon, msg, btntxt, btnlink);
            btnOk();
            btnNo();
        },
        Confirm: function(icon, msg, btntxt, btnlink, callback) {
            GenerateHtml('confirm', icon, msg, btntxt, btnlink);
            btnOk(callback);
            btnNo();
        }
    }
    //生成Html
    var GenerateHtml = function(type, icon, msg, btntxt, btnlink) {
        var _html = '<div id="ztpopup" class="ztpopup ztpopup-' + icon + '"><div id="ztpopup-box" class="ztpopup-box"><a href="javascript:;" class="ztpopup-close" id="zt-close"><span class="icon-guanbi1"></span></a>';
        _html += '<div class="ztpopup-ct"><span class="tipicon tipicon-' + icon + '"></span><p>' + msg + '</p></div>';
        if(!btnlink) {
            btnlink = 'javascript:;'
        }
        if(!btntxt) {
            btntxt = '确定'
        }
        else {
            if (type == 'alert') {
                _html += '<div class="ztpopup-btn"><a class="ztbtn" id="zt-ok" href="' + btnlink + '">' + btntxt +'</a></div>';
            }
            else if (type == 'confirm') {
                _html += '<div class="ztpopup-btn"><a class="ztbtn-sure" id="zt-ok" href="' + btnlink + '">' + btntxt +'</a>';
                _html += '<a class="ztbtn-cancel" id="zt-no" href="javascript:;">再看看</a></div>';
            }
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
    }

    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#zt-ok').on('click', function() {
            jQuery('#ztpopup').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#zt-no, #zt-close').on('click', function() {
            jQuery('#ztpopup').remove();
        });
    }
})();

function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
};