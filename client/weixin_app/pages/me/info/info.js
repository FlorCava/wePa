const app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onShow: function () {
    this.setData({
        userInfo: app.globalData.userInfo
    })
  }
})
