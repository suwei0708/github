$(function() {

    // 菜单横线动画
    if($('.about-nav').length) {
        $('.about-nav ul').moveline({
            color:'#ff8d01',
            height: 2,
            animateType: ''
        });
    }
});

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
    $('.mask').show();
    setTimeout(function() {
        $('.user-tip').hide();
        $('.mask').hide();
    }, 1500);
}