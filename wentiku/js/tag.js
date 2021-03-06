function Tag(inputId) {
    var obj = new Object();
    if (inputId == null || inputId == "") {
        alert("初始化失败，请检查参数！");
        return;
    }
    obj.inputId = inputId;
    //初始化
    obj = (function(obj) {
        obj.tagValue = "";
        obj.isDisable = false;
        return obj;
    })(obj);

    //初始化界面
    obj.initView = function() {
        var inputObj = $('#' + this.inputId);
        var inputId = this.inputId;
        inputObj.wrap('<div style="height: 0;"></div>');
        var placeholder = inputObj.attr('placeholder') ? inputObj.attr('placeholder') : '输入标签'
        var appendStr = '';
        appendStr += '<div class="tagsContaine" id="' + inputId + '_tagcontaine">';
        appendStr += '<div class="tagList"></div><input type="text" class="tagInput" placeholder="' + placeholder + '"/>';
        appendStr += '</div>';
        inputObj.parent().after(appendStr);
        var tagInput = $('#' + inputId + "_tagcontaine .tagInput");
        $('.tagsContaine').on('click', function() {
            $('.tagInput').focus();
        });
        $('.tagList').on('click', function(e) {
            e.stopPropagation();
        });
        $('.tag-click').on('click', '.tag', function() {
            var inputValue = $(this).html();
            var arr = $('#tagValue').val().split(',');
            if (arr.length == 3) {
                $(this).val('');
                alert('最多只能3个标签');
                return false;
            };
            if (inputValue.length > 10) {
                alert('标签不能超过10个字');
                return false;
            } else if (inputValue.length < 2) {
                alert('标签不能少于2个字');
                return false;
            };
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == inputValue) {
                    $(this).val('');
                    alert('不能输入相同标签');
                    return false;
                }
            }
            tagTake.setInputValue(inputId, inputValue);
            $(this).val('');
            return false;
        });
        if($.trim(inputObj.val())) {
            var inputValue = $.trim(inputObj.val());
            var arr = inputValue.split(',');
            for (var i = 0; i < arr.length; i++) {
                tagTake.setInputValue(inputId, arr[i]);
            }
        }
        if (!this.isDisable) {
            $('#' + inputId + "_tagcontaine").attr("ds", "1");
            tagInput.keydown(function(event) {
                if (event.keyCode == 32) {
                    var inputValue = $(this).val();
                    var arr = $('#tagValue').val().split(',');
                    if(arr.length == 3) {
                        $(this).val('');
                        alert('最多只能3个标签');
                        return false;
                    };
                    if(inputValue.length > 10) {
                        alert('标签不能超过10个字');
                        return false;
                    }
                    else if(inputValue.length < 2) {
                        alert('标签不能少于2个字');
                        return false;
                    };
                    for (var i = 0; i < arr.length; i++) {
                        if(arr[i] == inputValue) {
                        $(this).val('');
                            alert('不能输入相同标签');
                            return false;
                        }
                    }
                    tagTake.setInputValue(inputId, inputValue);
                    $(this).val('');
                    return false;
                }
            });
        } else {
            $('#' + inputId + "_tagcontaine").attr("ds", "0");
            tagInput.remove();
        }
        if (this.tagValue != null && this.tagValue != "") {
            tagTake.setInputValue(inputId, this.tagValue);
            if (this.isDisable) {
                $('#' + inputId + "_tagcontaine .tagList .tagItem .icon-guanbi").remove();
            }
        }
    }
    obj.disableFun = function() {
        if (this.isDisable) {
            return;
        }
        var inputId = this.inputId;
        var tagInput = $('#' + inputId + "_tagcontaine .tagInput");
        tagInput.remove();
        this.isDisable = true;
        $('#' + inputId + "_tagcontaine").attr("ds", "0");
        $('#' + inputId + "_tagcontaine .tagList .tagItem .icon-guanbi").remove();
        tagTake.initTagEvent(inputId);

    }
    obj.unDisableFun = function() {
        if (!this.isDisable) {
            return;
        }
        var inputId = this.inputId;
        var tagContaine = $('#' + inputId + "_tagcontaine");
        tagContaine.append('<input type="text" class="tagInput"/>');
        this.isDisable = false;
        $('#' + inputId + "_tagcontaine").attr("ds", "1");
        var tagInput = $('#' + inputId + "_tagcontaine .tagInput");
        tagInput.keydown(function(event) {
            if (event.keyCode == 13) {
                var inputValue = $(this).val();
                tagTake.setInputValue(inputId, inputValue);
                $(this).val("");
            }
        });
        $('#' + inputId + "_tagcontaine .tagList .tagItem").append('<div class="icon icon-guanbi"></div>');
        tagTake.initTagEvent(inputId);

    }

    return obj;
}

var tagTake = {
    "setInputValue": function(inputId, inputValue) {
        if (inputValue == null || inputValue == "") {
            return;
        }
        var tagListContaine = $('#' + inputId + "_tagcontaine .tagList");
        inputValue = inputValue.replace(/，/g, ",");
        var inputValueArray = inputValue.split(",");
        for (var i = 0; i < inputValueArray.length; i++) {
            var valueItem = $.trim(inputValueArray[i]);
            if (valueItem != "") {
                var appendListItem = tagTake.getTagItemModel(valueItem);
                tagListContaine.append(appendListItem);
            }
        }
        tagTake.resetTagValue(inputId);
        tagTake.initTagEvent(inputId);
    },
    "initTagEvent": function(inputId) {
        $('#' + inputId + "_tagcontaine .tagList .tagItem .icon-guanbi").off();
        $('#' + inputId + "_tagcontaine .tagList .tagItem").off();
        var ds = $('#' + inputId + "_tagcontaine").attr("ds");
        if (ds == "0") {
            return;
        }
        $('#' + inputId + "_tagcontaine .tagList .tagItem .icon-guanbi").click(function() {
            $(this).parent().remove();
            tagTake.resetTagValue(inputId);
        });
    },
    "resetTagValue": function(inputId) {
        var tags = $('#' + inputId + "_tagcontaine .tagList .tagItem");
        var tagsStr = "";
        for (var i = 0; i < tags.length; i++) {
            tagsStr += tags.eq(i).find("span").html() + ",";
        }
        tagsStr = tagsStr.substr(0, tagsStr.length - 1);
        $('#' + inputId).val(tagsStr);
    },
    "getTagItemModel": function(valueStr) {
        return '<div class="tagItem"><span>' + valueStr + '</span><div class="icon icon-guanbi"></div></div>';
    }
}