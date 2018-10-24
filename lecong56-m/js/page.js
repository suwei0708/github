$(function() {
    // 首页轮播
    if($('.swiper1').find('.swiper-slide').length > 1) {
        new Swiper('.swiper1',{
            autoplay: 5000,//可选选项，自动滑动
            pagination : '.pagination1',
            loop: true,
        });
    };

    // 复制
    $('.func').on('click', '.btn-copy', function() {
        if(!$('#contents').length) {
            $('body').append('<div style="width: 0; height: 0; position: absolute; z-index: -999;"><textarea style="width: 0; height: 0;" id="contents"></textarea></div>')
        }
        $('#contents').val($(this).data('text'));
        copyToClipboard();
        alert('复制成功！')
    });

    // 内容页tab切换
    $('.details-nav').on('click', 'a', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.tab-cont').hide().eq($(this).index()).show();
    });
});

/*复制代码到剪切板*/
function copyToClipboard(){
    var e = document.getElementById("contents");//对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
}