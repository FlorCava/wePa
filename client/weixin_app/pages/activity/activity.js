const app = getApp()
const activityApi = require('../../api/activity.js')
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
      description: ''
    },
    tabs: ["介绍", "进行中", "分享"],
    tabActiveIndex: 0,
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
  bindJoinButton: function () {
    let that = this
    activityApi.activityJoin(that.data.activity.activity_id, function (result) {
      that.setData({
        'activity.join.count': result.data.data.count,
        'activity.me.joined': true
      })
      wx.showToast({
        title: '成功参加',
        icon: 'success',
        duration: 10000,
        success: function () {
          setTimeout(function () {
            wx.redirectTo({
              url: `/pages/index/index`
            })
          }, 1500)
        }
      })
    })
  },
  bindScanCheckInButton: function () {
    let that = this
    wx.scanCode({
      success: (res) => {
        let currentPath = `pages/activity/activity?activity_id=${that.data.activity.activity_id}`
        if (res.path && res.path === currentPath) {
          activityApi.activityCheckIn(that.data.activity.activity_id, function (result) {
            that.setData({
              'activity.join.count': result.data.data.count,
              'activity.join.check_in_count': result.data.data.check_in_count,
              'activity.me.checked': true
            })
          })
        }
      }
    })
  },
  bindTabs: function (e) {
    this.setData({
      tabSliderOffset: e.currentTarget.offsetLeft,
      tabActiveIndex: e.currentTarget.id
    });
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