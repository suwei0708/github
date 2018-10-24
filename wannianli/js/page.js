var myDate = new Date();
var myMonth = myDate.getMonth() >= 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
var myDay = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate();
var today = myDate.getFullYear() + myMonth  + myDay;
var domain = 'http://api.wxgc.laoren.com/v1/calendars';
if (location.href.indexOf('.test') > -1) {
    domain = 'http://api.wxgc.laoren.test/v1/calendars';
}
else if (location.href.indexOf('.dev') > -1) {
    domain = 'http://api.wxgc.laoren.dev/v1/calendars';
}
else if (location.href.indexOf('.loc') > -1) {
    domain = 'http://api.wxgc.laoren.loc/v1/calendars';
}
else if (location.href.indexOf('192.168.107.156') > -1) {
    domain = 'js/data.json?';
}

axios.get(domain + '/' + today)
    .then(function(resp) {
        var res = resp;
        var days = res.data.data.lunar.split(" ");
        var date = days[0] + days[1] + ' ' + days[3];
        var day1 = days[1];
        var day2 = days[2];
        res.data.date = date;
        res.data.day2 = day2;

        var yi = res.data.data.should.replace(/\s/g,"").replace(/<([^"]*?)>/gi, " ").split(" ")[1];
        var ji = res.data.data.bogey.replace(/\s/g,"").replace(/<([^"]*?)>/gi, " ").split(" ")[1];

        var taboo = res.data.data.taboo.replace(/<scri.*?if../ig, "").replace(/"==.*?pt>/ig, "");
        res.data.data.taboo = taboo;

        app = new Vue({
            el: '#app',
            data: {
                res: res.data,
                requestClick: true,
                fate: '',
                isShow: true,
                backToTop: false,
                shareInfo: {
                    imgUrl: 'http://m.wxgc.laoren.com/wannianli/images/share.jpg',
                    link: window.location.href,
                    title: '今天是农历' + day1 + day2 + '，今日吉凶点此查看',
                    desc: '忌：' + ji + '，宜：' + yi + '，更多个人运势赶紧看看！',
                    success: function(res) {
                        console.log(res, '成功！')
                    },
                    cancel: function(res) {
                        // 用户取消分享后执行的回调函数
                        console.log(res, '取消')
                    }
                }
            },
            mounted: function () {
                this.getShareApi();

                this.$nextTick(function () {
                    window.addEventListener('scroll', function() {
                        var top = document.documentElement.scrollTop || document.body.scrollTop;
                        var domTop = document.querySelector('.main-mid').offsetTop + document.querySelector('.main-mid').offsetHeight;
                        if(top > domTop) {
                            app.backToTop = true
                        }
                        else {
                            app.backToTop = false
                        }
                    })
                });
            },
            methods: {
                nextday: function () {
                    if(app.requestClick) {
                        app.requestClick = false;
                        var url = domain + '/' + app.res.next;
                        app.ajaxUrl(url);
                    }
                },
                prevday: function() {
                    if(app.requestClick) {
                        app.requestClick = false;
                        var url = domain + '/' + app.res.pre;
                        app.ajaxUrl(url);
                    }
                },
                ajaxUrl: function(url) {
                    axios.get(url)
                        .then(function(resp) {
                            var res = resp;
                            var days = res.data.data.lunar.split(" ");
                            var date = days[0] + days[1] + ' ' + days[3];
                            var day2 = days[2];
                            res.data.date = date;
                            res.data.day2 = day2;

                            var taboo = res.data.data.taboo.replace(/<scri.*?if../ig, "").replace(/"==.*?pt>/ig, "");
                            res.data.data.taboo = taboo;

                            app.res = res.data
                            app.requestClick = true;
                        })
                        .catch(function(error) {
                            console.log(error);
                            app.requestClick = true;
                        });
                },
                testFate: function() {
                    if(!app.isShow) {
                        return false;
                    }
                    app.isShow = false;
                    var storage = window.localStorage;
                    if(!window.localStorage){
                        var url = domain;
                        axios.get(url)
                            .then(function(resp) {
                                if(!!resp.data.remind) {
                                    app.fate = resp.data;
                                    app.fate.stars = app.switchStar(+app.fate.star);
                                    var wxDate = {
                                        imgUrl: 'http://m.wxgc.laoren.com/wannianli/images/share2.jpg',
                                        title: '快乐老人黄历测出我的今日运势：' + app.switchNum(+app.fate.star) + '颗星星' + app.fate.fortune + '，你也测测吧！'
                                    }
                                    app.extend(app.shareInfo, wxDate);
                                    app.shareCase();
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                                app.requestClick = true;
                            });
                    }
                    else{
                        if(!storage.today || storage.today != today) {
                            storage.today = today;
                            var url = domain;
                            if (location.href.indexOf('192.168.107.156') > -1) {
                                url = 'js/data-cs.json?';
                            }
                            axios.get(url)
                                .then(function(resp) {
                                    if(!!resp.data.remind) {
                                        app.fate = resp.data;
                                        app.fate.stars = app.switchStar(+app.fate.star);
                                        storage.fate = JSON.stringify(app.fate);

                                        var wxDate = {
                                            imgUrl: 'http://m.wxgc.laoren.com/wannianli/images/share2.jpg',
                                            title: '快乐老人黄历测出我的今日运势：' + app.switchNum(+app.fate.star) + '颗星星' + app.fate.fortune + '，你也测测吧！'
                                        }
                                        app.extend(app.shareInfo, wxDate);
                                        app.shareCase();
                                    }
                                    app.requestClick = true;
                                })
                                .catch(function(error) {
                                    console.log(error);
                                    app.requestClick = true;
                                });
                        }
                        else {
                            app.fate = JSON.parse(storage.getItem("fate"));
                            var wxDate = {
                                imgUrl: 'http://m.wxgc.laoren.com/wannianli/images/share2.jpg',
                                title: '快乐老人黄历测出我的今日运势：' + app.switchNum(+app.fate.star) + '颗星星' + app.fate.fortune + '，你也测测吧！'
                            }
                            app.extend(this.shareInfo, wxDate);
                            app.shareCase();
                        }
                    }
                },
                backTop: function() {
                    var top = document.documentElement.scrollTop || document.body.scrollTop;
                    var timer = setInterval(function() {
                        top = top - 100;
                        if(top <= 0) {
                            clearInterval(timer);
                        }
                        document.body.scrollTop = top
                        document.documentElement.scrollTop = top
                    }, 10);
                },
                // 分享朋友、朋友圈、QQ、QQ空间
                shareCase() {
                    // 分享到朋友圈
                    wx.onMenuShareTimeline(this.shareInfo)

                    // 分享给朋友
                    wx.onMenuShareAppMessage(this.shareInfo)

                    // 分享到QQ
                    wx.onMenuShareQQ(this.shareInfo)

                    // 分享到QQ空间
                    wx.onMenuShareQZone(this.shareInfo)
                },
                // 微信分享
                weixinShare(response) {
                    var _this = this;
                    // 初始化微信配置
                    wx.config({
                        // debug: debug,
                        appId: response.appid,
                        timestamp: response.timestamp,
                        nonceStr: response.noncestr,
                        signature: response.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ]
                    })
                    // 处理验证失败的信息
                    wx.error(function(res) {
                        console.log(res, '验证失败返回的信息！')
                    });

                    // 处理验证成功的信息
                    wx.ready(function() {
                        _this.shareCase()
                    })
                },
                getShareApi() {
                    var script = document.createElement("script");
                    script.src = "http://m.plus.laoren.com/index.php?app=wechat&mobile=1&callback=handleResponse";
                    document.body.insertBefore(script, document.body.firstChild);
                },
                extend(target, source) {
                    for (var p in source) {
                        if (source.hasOwnProperty(p)) {
                            target[p] = source[p];
                        }
                    }
                    return target;
                },
                switchNum(num) {
                    switch (num){
                        case 1 : return '一'
                        break;
                        case 2 : return '二'
                        break;
                        case 3 : return '三'
                        break;
                        case 4 : return '四'
                        break;
                        case 5 : return '五'
                        break;
                        default:
                        break;
                    }
                },
                switchStar(num) {
                    switch (num){
                        case 1 : return '★☆☆☆☆'
                        break;
                        case 2 : return '★★☆☆☆'
                        break;
                        case 3 : return '★★★☆☆'
                        break;
                        case 4 : return '★★★★☆'
                        break;
                        case 5 : return '★★★★★'
                        break;
                        default:
                        break;
                    }
                }
            }
        });
    })
    .catch(function(error) {
        console.log(error);
    });