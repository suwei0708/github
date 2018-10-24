jq(function() {
    showTip('.show-tip', '.tip-ct');
    jq.each(jq('.border-box'), function(index) {
        jq(this).css({
            'margin-left': -jq(this).outerWidth() / 2
        });
    });
    jq('.popularity-info .ranking').hover(function(event) {
        var borderBox = jq(this).parents('dl').find('.border-box');
        borderBox.css({
            'display': 'block'
        });
    }, function(event) {
        var borderBox = jq(this).parents('dl').find('.border-box');
        borderBox.css({
            'display': 'none'
        });
    });
    jq('.border-box').hover(function(event) {
        jq(this).css({
            'display': 'block'
        });
    }, function(event) {
        jq(this).css({
            'display': 'none'
        });
    });
});

function showTip(obj, objSub) {
    jq(obj).mouseenter(function(event) {
        jq(this).find(objSub).show();
    })
    .mouseleave(function(event) {
        jq(this).find(objSub).hide();
    });

    jq(objSub).mouseenter(function(event) {
        jq(this).show();
    });
}