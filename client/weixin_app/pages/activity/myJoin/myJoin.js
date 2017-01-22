const app = getApp()
const activityApi = require('../../../api/activity.js')

Page({
  data: {
    activityJoin: [],
    currentPage: 0,
    totalPages: 0,
    loading: false
  },
  myJoinActivityList: function (page) {
    let that = this
    that.setData({
      'loading': true
    })
    activityApi.myJoinActivityList(page, function (result) {
      let activityJoin = that.data.activityJoin
      let activities = result.data.data.activities
      activityJoin = activityJoin.concat(activities)
      let page = result.data.data.page
      let pages = result.data.data.pages
      that.setData({
        'loading': false,
        'activityJoin': activityJoin,
        'currentPage': page,
        'totalPages': pages
      })
    })
  },
  bindLoadMore: function () {
    let page = this.data.currentPage + 1
    this.myJoinActivityList(page)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let page = this.data.currentPage + 1
    this.myJoinActivityList(page)
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