const app = getApp()
const userApi = require('../../../../api/user.js')

Page({
  data: {
    userInfo: {},
    email: ''
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  bindEmailChange: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindSaveButton: function () {
    let that = this
    userApi.userUpdateEmail(that.data.email, function (result) {
      app.globalData.userInfo = result.data.data.user
      wx.setStorageSync('userInfo', result.data.data.user)
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 10000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    })
  }
})
