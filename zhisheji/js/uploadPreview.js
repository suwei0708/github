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
        if (typeof(value) == "function") { return false; }
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
        fileSize: 5,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function() {}
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
        fileSize: _self.IsNull(setting.fileSize) ? _self.DefautlSetting.fileSize : setting.fileSize,
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
			var filemaxsize = 1024 * _self.Setting.fileSize;
			var Size;
			console.log(e, 'e')
			if (e && $(e.target)[0].files) {
				Size = $(e.target)[0].files[0].size / 1024
			}
			else {
				Size = getFileSize(this) / 1024;
			}

			function getFileSize(obj) {
			    try {
			        var file = obj;
			        file.select();
			        file.blur();
			        var path = document.selection.createRange().text;
					var fso = new ActiveXObject("Scripting.FileSystemObject");
			        fileSize = fso.GetFile(path).size;
			        return fileSize;
			    } catch (e) {
			        alert(e + "\n" + "如果错误为：Error:Automation 服务器不能创建对象；" + "\n" + "请按以下方法配置浏览器：" + "\n" + "请打开【Internet选项-安全-Internet-自定义级别-ActiveX控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全）-点击启用-确定】");
			        return window.location.reload();
			    }
			}

            if (Size > filemaxsize) {
                jQuery.msgBox.Alert(null, '图片大于' + _self.Setting.fileSize + 'M，请重新选择!');
                return false;
			}
            if (this.files) {
				if(!this.files[0].type.match(/image.*/)) {
				    jQuery.msgBox.Alert(null, '请选择正确的图片!');
				    $(this).val('');
					return false;
				}
			}
			else {
				var val = $(this).val();
				if (!RegExp("\.(" + _self.Setting.ImgType.join("|") + ")$", "i").test(val.toLowerCase())) {
				    jQuery.msgBox.Alert(null, '请选择正确的图片!');
				    $(this).val('');
				    return false;
				}
			}

            if (this.value) {

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