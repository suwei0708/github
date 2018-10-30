var _temp$=window.$,_tempjqpostuery=window.jqpostuery;
window.$=jqpost;

jqpost(function(){
	jqpost(".s-releave").click(function(){
		var wrap = jqpost(this).parents(".s-t-item").find(".s-t-leave");
		if(wrap.css("display") == "block"){
			wrap.css("display","none");
		}else{
			wrap.css("display","block");
		}
	});

	//先选出输入框和统计字数节点
    var desInp = jqpost("#inp-lim"),
        desAre = jqpost("#are-lim"),
        wordInp = desInp.next().find('var'),
        wordAre = desAre.next().find('var');
    //调用
    statInputNum(desInp, wordInp);
    statInputNum(desAre, wordAre);
    // 统计剩下字数
    function statInputNum(ctext, numItem) {
        var max = numItem.text();
        ctext.attr('maxlength', max);
        ctext.on('input propertychange', function() {
            numItem.text(max - jqpost(this).val().length);
            if (numItem.text() < 0) {
                numItem.text(0);
            }
        });
    }

	function counttags(){
		var tagsstr='';
		jqpost('.f-tab').each(function(){
			tagsstr += jqpost(this).text() + " ";
		});
		jqpost('#tags').val(tagsstr);
        tabWidth();

		console.log(tagsstr);

	}
    tabWidth();
    function tabWidth() {
        var tabWidth = 0;
        for (var i = 0; i < jqpost('.txtb .f-tab').length; i++) {
            tabWidth += (Math.ceil(jqpost('.txtb .f-tab').eq(i).outerWidth()) + 10);
        };
        var num = 800;
        if(jqpost('.form-works').length) {
            num = 850;
        }
        jqpost('#hxbe').width(num - tabWidth);
    }

    function addClick(){
        jqpost(".icon-x").click(function(){
             jqpost(this).parent(".f-tab").remove();
			 counttags();
        });

    };
    addClick();
    jqpost(".f-cs").click(function(){
        var name = jqpost(this).text(),
            data = 0,
            html = "<div class='f-tab'>"+ name +"<i class='icon-x'></i></div>";
        jqpost(".f-tab").each(function(){
            if(jqpost(this).text() == name){
                data = 1;
            }
        })
        if(data == 0){
            jqpost(".txtb").prepend(html);
            addClick();
        }else{
            alertMsg("不能输入相同的作品标签")
        };
		counttags();
    });

    jqpost('.select-box').mouseover(function(){
        jqpost(this).find('.select-txt').show();
    }).mouseout(function(){
        jqpost(this).find('.select-txt').hide();
    });

    // 复选框
    jqpost(".select-ai").click(function(){
        var txt = jqpost(this).text(),
            parent=jqpost('#parent'+jqpost(this).attr('f-id')).html(),
            ths = jqpost(this);
        if(jqpost('#parent'+jqpost(this).attr('f-id')).length !== 0){
			jqpost('#subid').val(ths.attr('data-id'));
            ths.parents(".select-box").find(".select-val-txt").text(parent+' > '+txt);
        }else{
			jqpost('#subid').val(0);
            ths.parents(".select-box").find(".select-val-txt").text(txt);
        }
        // 转载显示的内容
        if(ths.parents(".select-box").find('.select-val-txt').html() == '转载') {
            jqpost('.f-zhuanzai').show();
            jqpost('.f-laiyuan').parent().find('.fb-tips').hide();
        }
        else {
            jqpost('.f-zhuanzai').hide();
        }

        jqpost('.select-txt').hide();
    });

    jqpost(".select-ai2").click(function(){
        var txt = jqpost(this).text(),
        parent=jqpost('#parent'+jqpost(this).attr('f-id')).html(),
        ths = jqpost(this);

        jqpost('#zply').val(ths.attr('data-id'));
        ths.parents(".select-box").find(".select-val").text(txt);

        jqpost('.select-txt').hide();
    });

    jqpost(".select-btn").hover(function(){
        jqpost(".select-btn").removeClass("select-btn-on");
        jqpost(this).addClass("select-btn-on");
        jqpost(".select-c").removeClass("select-c-on");
        jqpost(".select-c").eq(jqpost(this).index()).addClass("select-c-on");
    });

    // 三级分类
    jqpost('.select-txt-multistage').on('click', 'a', function() {
        var _this = jqpost(this);
        var three = _this.text();
        var two = _this.parents('.select-sub').parent('li').children('a').text();

        if(_this.parents('.select-sub').length) {
            jqpost('.select-txt-multistage').find('.cur').removeClass('cur');
            _this.parent().addClass('cur');
            _this.parents('.select-sub').parent().addClass('cur');
            if(_this.parents('.children').length) {
                var one = _this.parents('.first').children('li > a').text();
                _this.parents('.select-box').find('.select-val-txt').text(one + '-' + two + '-' + three);

            }
            else {
                _this.parents('.select-box').find('.select-val-txt').text(two + '-' + three);
            }
            _this.parents('.select-txt-multistage').hide();
        }
        else if (!_this.parent('li').find('.select-sub').length && !_this.parent('li').find('.children').length) {
            jqpost('.select-txt-multistage').find('.cur').removeClass('cur');
            _this.parent().addClass('cur');
            _this.parents('.select-box').find('.select-val-txt').text(three);
            _this.parents('.select-txt-multistage').hide();
        }
        return false;
    });

    // 分类颜色控制
    jqpost.each(jqpost('.select-val-txt'), function(index, val) {
        selectValColor(jqpost(this));
        jqpost(this).on('DOMNodeInserted', function() {
            selectValColor(jqpost(this));
        });
    });
    function selectValColor(obj) {
        if(obj.html() != '请选择分类' && obj.html() != '请选择') {
            obj.attr({
                style: 'color: #666'
            });
        }
        else {
            obj.attr({
                style: 'color: #bbb'
            });
        }
    }


    // 上传视频关闭
    jqpost('.upload-video').on('click', '.upload-video-close', function() {
        jqpost(this).parents('li').remove();
    });

    // 上传附件关闭
    jqpost('.upload-enclosure').on('click', '.upload-enclosure-close', function() {
        jqpost(this).parents('.upload-enclosure').removeClass('upload-enclosure-suc').find('.tips').css({display: 'inline-block'});
        jqpost(this).parents('.upload-enclosure-list').remove();
    });

    // 细节点评美化
    if(jqpost('.critique').length) {
        checkboxSelect('.critique');
    };

    // 导入视频
    jqpost('.upload-video').on('click', '.btn-gray-line', function() {
        jqpost(this).find('.pro-input').show();
        return false;
    });
    jqpost('.upload-video').on('click', '.btn-gray-line .btn-sure', function() {
        jqpost(this).parents('.pro-input').hide();
        return false;
    });

    jqpost(document).bind("keydown",function(e){
        e = e ? e : event;
        if(e.keyCode == 8 && jqpost('#hxbe').val().length == 0){
            var num = jqpost(".f-tab").length;
            if(num > 0){
                jqpost(".f-tab:last").remove();
                tabWidth();
            }
        }
    });

    jqpost(document).keydown(function(e){
        if(!e) var e = window.event;
        if(e.keyCode==32){
            var name = jqpost.trim(jqpost("#hxbe").val()),
                alength = name.length,
                data = 0,
                html = "<div class='f-tab'>"+ name +"<i class='icon-x'></i></div>";
            if(jqpost(".f-tab").length >= 7) {
                alertMsg("最多7个标签");
                return false;
            }
            jqpost(".f-tab").each(function(){
                if(jqpost(this).text() == name){
                    data = 1;
                }
            });
            if(name !== ""){
                if(data == 0){
                    if(alength > 1 && alength < 6){
                        jqpost(".txtb").prepend(html);
                        addClick();
                    }else{
                        alertMsg("请输入2-5字")
                    };
                }else{
                    alertMsg("不能输入相同的作品标签")
                };
            };
            jqpost("#hxbe").val('');
			counttags();
        };
    });

    // 选择图片位置
    imgBtn2();
});

function imgBtn2(){
    jqpost('#img-wrap').off("click", '.pro-pre').on('click', '.pro-pre', function(){
        var num = jqpost(this).parents(".pro-item").index(),
            wrap = jqpost(this).parents(".pro-item"),
            html = jqpost(this).parents(".pro-item").html(),
            val = jqpost(this).parents(".pro-item").find("textarea").attr("value");
        if(num == 0){
            alertMsg("已经到顶");
        }else{
            html = "<div class='pro-item fixed'>"+ html +"</div>";
            jqpost(".pro-item").eq(num-1).before(html);
            jqpost(".pro-item").eq(num-1).find("textarea").attr("value",val);
            wrap.remove();
            imgBtn();
            trageImage();
        }
    });
    jqpost("#img-wrap").off("click", '.pro-next').on('click', '.pro-next', function(){
        var num = jqpost(this).parents(".pro-item").index(),
            val = jqpost(this).parents(".pro-item").find("textarea").attr("value"),
            last = jqpost(".pro-item").length-1,
            wrap = jqpost(this).parents(".pro-item"),
            html = jqpost(this).parents(".pro-item").html();
        if(num == last){
            alertMsg("已经到底");
        }else{
            html = "<div class='pro-item fixed'>"+ html +"</div>";
            jqpost(".pro-item").eq(num+1).after(html);
            jqpost(".pro-item").eq(num+2).find("textarea").attr("value",val);
            wrap.remove();
            imgBtn();
            trageImage();
        }
    });
    jqpost("#img-wrap").off("click", '.pro-del').on('click', '.pro-del', function(){
        var wrap = jqpost(this).parents(".pro-item");
        wrap.remove();
        trageImage();
    });
}


window.$=_temp$;
window.jqpostuery=_tempjqpostuery;