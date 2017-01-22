import config from '../utils/config'
const common = require('./common')

module.exports.activityReadOne = function (activityId, resolve) {
  wx.request({
    url: `${config.API_URL}/activities/${activityId}`,
    method: 'GET',
    header: common.setHeaders(),
    success: resolve
  })
}

module.exports.myStartTopActivity = function (resolve) {
  wx.request({
    url: `${config.API_URL}/activities/my/start`,
    method: 'GET',
    header: common.setHeaders(),
    success: resolve
    // if(response.statusCode === 401) {
    //                 wx.removeStorageSync('token')
    //                 wx.redirectTo({
    //                     url: '/pages/login/index'
    //                 })
    //             }
  })
}

module.exports.myStartActivityList = function (page, resolve) {
  wx.request({
    url: `${config.API_URL}/activities/my/start/page/${page}`,
    method: 'GET',
    header: common.setHeaders(),
    success: resolve
  })
}

module.exports.myJoinTopActivity = function (resolve) {
  wx.request({
    url: `${config.API_URL}/activities/my/join`,
    method: 'GET',
    header: common.setHeaders(),
    success: resolve
  })
}

module.exports.myJoinActivityList = function (page, resolve) {
  wx.request({
    url: `${config.API_URL}/activities/my/join/page/${page}`,
    method: 'GET',
    header: common.setHeaders(),
    success: resolve
  })
}

module.exports.activityCreateOne = function (activity, resolve) {
  wx.request({
    url: `${config.API_URL}/activities`,
    method: 'POST',
    header: common.setHeaders(),
    data: activity,
    success: resolve
  })
}

module.exports.activityImageUpload = function (image, resolve) {
  wx.uploadFile({
    url: `${config.API_URL}/file/activity`,
    filePath: image,
    name: 'image',
    header: common.setFileHeaders(),
    success: resolve
  })
}

module.exports.activityJoin = function (activityId, resolve) {
  wx.request({
    url: `${config.API_URL}/activities/${activityId}/join`,
    method: 'POST',
    header: common.setHeaders(),
    success: resolve
  })
}

module.exports.activityCheckIn = function (activityId, resolve) {
  wx.request({
    url: `${config.API_URL}/activities/${activityId}/check_in`,
    method: 'POST',
    header: common.setHeaders(),
    success: resolve
  })
}

module.exports.activityQrCodeCreate = function (activityId, resolve) {
  let path = `/pages/activity/activity?activity_id=${activityId}`
  let width = 430
  wx.request({
    url: `${config.API_URL}/activities/${activityId}/qr_code`,
    method: 'POST',
    header: common.setHeaders(),
    data: {
      path: path,
      width: width,
      activityId: activityId
    },
    success: resolve
  })
}