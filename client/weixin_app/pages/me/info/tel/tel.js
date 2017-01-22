const app = getApp()
const userApi = require('../../../../api/user.js')

Page({
  data: {
    userInfo: {},
    tel: ''
  },
  onLoad: function () {
    this.setData({
        userInfo: app.globalData.userInfo
    })
  },
  bindTelChange: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  bindSaveButton: function(){
      let that = this
      userApi.userUpdateTel(that.data.tel, function(result){
          console.log(result)
          app.globalData.userInfo = result.data.data.user;
          wx.setStorageSync('userInfo', result.data.data.user);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 10000,
            success: function(){
                setTimeout(function(){
                    wx.navigateBack({
                        delta: 1
                    })
                },1500)
            }
        })
      })
  }
})
