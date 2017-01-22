import config from '../../utils/config'
const app = getApp()
Page({
  data: {
    login: false,
    userInfo: {}
  },
  redirectToIndex: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  login: function () {
    let that = this
    app.login(function () {
      const userInfo = wx.getStorageSync('userInfo')
      const token = wx.getStorageSync('token')
      that.setData({
        userInfo: userInfo
      })
      if (token !== '') {
        that.setData({
          login: true
        })
        setTimeout(that.redirectToIndex, 1500)
      } else {
        that.setData({
          login: false
        })
      }
    })
  },
  bindLoginButton: function () {
    this.login()
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.login()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})