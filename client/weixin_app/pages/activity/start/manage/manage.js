const app = getApp()
const activityApi = require('../../../../api/activity.js')
let tabSliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    activity: {
      title: '',
      location: {
        name: '',
        address: '',
        latitude: '',
        longitude: ''
      },
      start: {
        date: '',
        time: ''
      },
      end: {
        date: '',
        time: ''
      },
      image: '',
      count: 0,
      description: '',
      status: '',
      qr_code_url: ''
    },
    tabs: ["介绍", "管理"],
    tabActiveIndex: "0",
    tabSliderOffset: 0,
    tabSliderLeft: 0
  },
  bindOpenLocation: function () {
    let that = this
    wx.openLocation({
      latitude: that.data.activity.location.latitude,
      longitude: that.data.activity.location.longitude,
      scale: 28
    })
  },
  onShareAppMessage: function () {
    let that = this
    return {
      title: 'We Pa! 活动分享',
      desc: `快来参加活动${that.data.activity.title}`,
      path: `/pages/activity/activity?activity_id=${that.data.activity.activity_id}`
    }
  },
  bindShareButton: function () {
    wx.showModal({
      // title: '提示',
      content: '点击右上角分享活动',
      showCancel: false
    })
  },
  bindTabs: function (e) {
    this.setData({
      tabSliderOffset: e.currentTarget.offsetLeft,
      tabActiveIndex: e.currentTarget.id
    });
  },
  bindStatusChange: function (e) {
    this.setData({
      'activity.status': e.detail.value
    })
  },
  bindStatusSliderChange: function (e) {
    let value = e.detail.value
    if (value === 0) {
      value = 1
    }
    this.setData({
      'activity.status': value.toString()
    })
  },
  bindCreateQrCodeButton: function () {
    let that = this
    activityApi.activityQrCodeCreate(that.data.activity.activity_id, function (result) {
      that.setData({
      'activity.qr_code_url': result.data.data.qr_code_url
    })
    })
  },
  bindPreviewImage: function (e) {
    wx.previewImage({
      urls: [this.data.activity.qr_code_url]
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    that.setData({
      tabSliderLeft: (app.globalData.systemInfo.windowWidth / that.data.tabs.length - tabSliderWidth) / 2
    });
    activityApi.activityReadOne(options.activity_id, function (result) {
      let activity = result.data.data.activity
      that.setData({
        'activity': activity,
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})