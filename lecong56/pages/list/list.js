// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    // 打大电话
    call: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    copy: function(e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.text
        });
    },
    daohang: function(e) {
        console.log(e.currentTarget.dataset)
        wx.openLocation({
            latitude: +e.currentTarget.dataset.latitude,
            longitude: +e.currentTarget.dataset.longitude,
            name: e.currentTarget.dataset.name,
            scale: 15
        })
    }
})