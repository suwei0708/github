//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            '/images/banner.jpg',
            '/images/banner.jpg',
            '/images/banner.jpg',
            // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
            // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ]
    },
    //事件处理函数
    bindViewTap: function () {
    },
    onLoad: function () {

    },
    formSubmit1: function (e) {
        console.log('form发生了submit1事件，携带数据为：', e.detail.value)
    },
    formSubmit2: function (e) {
        console.log('form发生了submit2事件，携带数据为：', e.detail.value)
    },
    formSubmit3: function (e) {
        console.log('form发生了submit3事件，携带数据为：', e.detail.value)
    },
})