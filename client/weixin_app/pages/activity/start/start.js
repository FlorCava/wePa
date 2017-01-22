const app = getApp()
const activityApi = require('../../../api/activity.js')

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
    tempImage: '',
    limitCount: false
  },
  bindTitleChange: function (e) {
    this.setData({
      'activity.title': e.detail.value
    })
  },
  bindChooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          'activity.location.name': res.name,
          'activity.location.address': res.address,
          'activity.location.latitude': res.latitude,
          'activity.location.longitude': res.longitude
        })
      }
    })
  },
  bindLocationNameChange: function (e) {
    this.setData({
      'activity.location.name': e.detail.value
    })
  },
  bindLocationAddressChange: function (e) {
    this.setData({
      'activity.location.address': e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      'activity.start.date': e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      'activity.start.time': e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      'activity.end.date': e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      'activity.end.time': e.detail.value
    })
  },
  bindChooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      count: 1,
      success: function (res) {
        var tempImage = res.tempFilePaths[0]
        that.setData({
          tempImage: tempImage
        })
        activityApi.activityImageUpload(that.data.tempImage, function (res) {
          let data = JSON.parse(res.data)
          that.setData({
            'activity.image': data.data.file.url
          })
        })
      }
    })
  },
  bindPreviewImage: function (e) {
    wx.previewImage({
      urls: [this.data.tempImage]
    })
  },
  bindLimitCountChange: function (e) {
    if (!e.detail.value) {
      this.setData({
        'activity.count': 0
      })
    }
    this.setData({
      'limitCount': e.detail.value
    })
  },
  bindCountChange: function (e) {
    this.setData({
      'activity.count': e.detail.value
    })
  },
  bindDescriptionChange: function (e) {
    this.setData({
      'activity.description': e.detail.value
    })
  },
  bindSaveButton: function () {
    let that = this
    activityApi.activityCreateOne(that.data.activity, function (result) {
      wx.getStorage({
        key: 'activityStart',
        success: function (res) {
          let activityStart = res.data
          activityStart.push(result.data.data.activity)
          wx.setStorage({
            key: 'activityStart',
            data: activityStart
          })
        }
      })
      wx.showToast({
        title: '活动创建成功',
        icon: 'success',
        duration: 10000,
        success: function () {
          setTimeout(function () {
            wx.redirectTo({
              url: `/pages/activity/activity?activity_id=${result.data.data.activity.activity_id}`
            })
          }, 1500)
        }
      })
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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