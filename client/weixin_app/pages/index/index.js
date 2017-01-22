const app = getApp()
const activityApi = require('../../api/activity.js')

Page({
  data: {
    activityStart: [],
    activityJoin: []
  },
  onShow: function () {
    let that = this
    activityApi.myStartTopActivity(function (result) {
      let activities = result.data.data.activities
      that.setData({
        'activityStart': activities,
      })
    })
    activityApi.myJoinTopActivity(function (result) {
      let activities = result.data.data.activities
      that.setData({
        'activityJoin': activities,
      })
    })
  }
})
