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
        var inputObj = jQuery("#" + this.inputId);
        var inputId = this.inputId;
        inputObj.css("display", "none");
        var appendStr = '';
        appendStr += '<div class="tagsContaine" id="' + inputId + '_tagcontaine">';
        appendStr += '<input type="text" class="tagInput" placeholder="输入职能标签"/><div class="tagList"></div>';
        appendStr += '</div>';
        inputObj.after(appendStr);
        var tagInput = jQuery("#" + inputId + "_tagcontaine .tagInput");
        if (!this.isDisable) {
            jQuery("#" + inputId + "_tagcontaine").attr("ds", "1");
            tagInput.keydown(function(event) {
                if (event.keyCode == 32) {
                    var inputValue = jQuery(this).val();
                    var arr = jQuery('#tagValue').val().split(',');
                    if(arr.length == 3) {
                        jQuery(this).val('');
                        alert('最多只能三个标签');
                        return false;
                    };
                    if(inputValue.length > 5) {
                        alert('标签不能超过5个字');
                        return false;
                    }
                    else if(inputValue.length < 2) {
                        alert('标签不能少于2个字');
                        return false;
                    };
                    for (var i = 0; i < arr.length; i++) {
                        if(arr[i] == inputValue) {
                        jQuery(this).val('');
                            alert('不能输入相同标签');
                            return false;
                        }
                    }
                    console.log(arr)
                    tagTake.setInputValue(inputId, inputValue);
                    jQuery(this).val('');
                    return false;
                }
            });
        } else {
            jQuery("#" + inputId + "_tagcontaine").attr("ds", "0");
            tagInput.remove();
        }
        if (this.tagValue != null && this.tagValue != "") {
            tagTake.setInputValue(inputId, this.tagValue);
            if (this.isDisable) {
                jQuery("#" + inputId + "_tagcontaine .tagList .tagItem .icon-close").remove();
            }
        }
    }
    obj.disableFun = function() {
        if (this.isDisable) {
            return;
        }
        var inputId = this.inputId;
        var tagInput = jQuery("#" + inputId + "_tagcontaine .tagInput");
        tagInput.remove();
        this.isDisable = true;
        jQuery("#" + inputId + "_tagcontaine").attr("ds", "0");
        jQuery("#" + inputId + "_tagcontaine .tagList .tagItem .icon-close").remove();
        tagTake.initTagEvent(inputId);

    }
    obj.unDisableFun = function() {
        if (!this.isDisable) {
            return;
        }
        var inputId = this.inputId;
        var tagContaine = jQuery("#" + inputId + "_tagcontaine");
        tagContaine.append('<input type="text" class="tagInput"/>');
        this.isDisable = false;
        jQuery("#" + inputId + "_tagcontaine").attr("ds", "1");
        var tagInput = jQuery("#" + inputId + "_tagcontaine .tagInput");
        tagInput.keydown(function(event) {
            if (event.keyCode == 13) {
                var inputValue = jQuery(this).val();
                tagTake.setInputValue(inputId, inputValue);
                jQuery(this).val("");
            }
        });
        jQuery("#" + inputId + "_tagcontaine .tagList .tagItem").append('<div class="icon-close"></div>');
        tagTake.initTagEvent(inputId);

    }

    return obj;
}

var tagTake = {
    "setInputValue": function(inputId, inputValue) {
        if (inputValue == null || inputValue == "") {
            return;
        }
        var tagListContaine = jQuery("#" + inputId + "_tagcontaine .tagList");
        inputValue = inputValue.replace(/，/g, ",");
        var inputValueArray = inputValue.split(",");
        for (var i = 0; i < inputValueArray.length; i++) {
            var valueItem = jQuery.trim(inputValueArray[i]);
            if (valueItem != "") {
                var appendListItem = tagTake.getTagItemModel(valueItem);
                tagListContaine.append(appendListItem);
            }
        }
        tagTake.resetTagValue(inputId);
        tagTake.initTagEvent(inputId);
    },
    "initTagEvent": function(inputId) {
        jQuery("#" + inputId + "_tagcontaine .tagList .tagItem .icon-close").off();
        jQuery("#" + inputId + "_tagcontaine .tagList .tagItem").off();
        var ds = jQuery("#" + inputId + "_tagcontaine").attr("ds");
        if (ds == "0") {
            return;
        }
        jQuery("#" + inputId + "_tagcontaine .tagList .tagItem .icon-close").click(function() {
            jQuery(this).parent().remove();
            tagTake.resetTagValue(inputId);
        });
    },
    "resetTagValue": function(inputId) {
        var tags = jQuery("#" + inputId + "_tagcontaine .tagList .tagItem");
        var tagsStr = "";
        for (var i = 0; i < tags.length; i++) {
            tagsStr += tags.eq(i).find("span").html() + ",";
        }
        tagsStr = tagsStr.substr(0, tagsStr.length - 1);
        jQuery("#" + inputId).val(tagsStr);
    },
    "getTagItemModel": function(valueStr) {
        return '<div class="tagItem"><span>' + valueStr + '</span><div class="icon-close"></div></div>';
    }
}