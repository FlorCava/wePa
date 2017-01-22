import config from './utils/config'
App({
  onLaunch: function () {
    // // 使用当前微信用户登陆
    // this.login()

    // 初始化本地缓存数据
    this.initStorage()

    const systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
  },
  login: function (cb) {
    let that = this
    // 清除缓存中登陆信息
    wx.setStorageSync('token', '')
    wx.setStorageSync('userInfo', {})
    // 调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code

          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: `${config.API_URL}/users/wei_xin/auth`,
                method: 'POST',
                header: {
                  'Content-Type': 'application/json'
                },
                data: {
                  'code': code,
                  'iv': res.iv,
                  'encryptedData': res.encryptedData
                },
                success: function (result) {
                  that.globalData.token = result.data.data.token
                  wx.setStorageSync('token', result.data.data.token)
                  that.globalData.userInfo = result.data.data.user
                  wx.setStorageSync('userInfo', result.data.data.user)
                  typeof cb == "function" && cb()
                }
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  initStorage: function () {
    wx.getStorageInfo({
      success: function (res) {
        // 判断我创建的活动是否存在，没有则创建
        if (!('activityStart' in res.keys)) {
          wx.setStorage({
            key: 'activityStart',
            data: []
          })
        }
        // 判断我参与的活动是否存在，没有则创建
        if (!('activityJoin' in res.keys)) {
          wx.setStorage({
            key: 'activityJoin',
            data: []
          })
        }
      }
    })
  },
  globalData: {
    token: null,
    userInfo: null,
    systemInfo: null
  }
})