particlesJS.load('particles', 'js/particles.json', function() {
  // console.log('particles.js loaded - callback');
});

$(function() {
    var name = $('.login').find('.txt:eq(0)');
    var password = $('.login').find('.txt:eq(1)');
    var code = $('.login').find('.txt:eq(2)');
    var btn = $('.login').find('.btn');

    /* 登录input聚焦判断 */
    $('.login').on('focus', '.txt', function() {
        var _this = $(this);
        _this.nextAll('.tip').html('');
    })
    .on('blur', '.txt', function() {
        var _this = $(this);
        if(!$.trim(_this.val())) {
            if(!_this.nextAll('.tip').size()) {
                _this.after('<span class="tip"></span>');
            }
            _this.nextAll('.tip').html(_this.attr('placeholder') +'不能为空').show();
            return false;
        }
    });

    /* 登录提交判断 */
    btn.on('click', function() {
        if(!$.trim(name.val())) {
            if(!name.nextAll('.tip').size()) {
                name.after('<span class="tip"></span>');
            }
            name.nextAll('.tip').html('姓名不能为空').show();
            return false;
        }
        if(!$.trim(password.val())) {
            if(!password.nextAll('.tip').size()) {
                password.after('<span class="tip"></span>');
            }
            password.nextAll('.tip').html('密码不能为空').show();
            return false;
        }
        if(!$.trim(code.val())) {
            if(!code.nextAll('.tip').size()) {
                code.after('<span class="tip"></span>');
            }
            code.nextAll('.tip').html('验证码不能为空').show();
            return false;
        }
    });
});