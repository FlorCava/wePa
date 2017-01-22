import config from '../utils/config'
const common = require('./common')
const app = getApp()

module.exports.authWithWeiXinApp = function (code, iv, encryptedData, resolve) {
  wx.request({
    url: `${config.API_URL}/users/wei_xin/auth`,
    method: 'POST',
    header: common.setHeaders(),
    data: {
      'code': code,
      'iv': iv,
      'encryptedData': encryptedData
    },
    success: resolve
  })
}

module.exports.userUpdateName = function (name, resolve) {
  wx.request({
    url: `${config.API_URL}/users/me/name`,
    method: 'PUT',
    header: common.setHeaders(),
    data: {
      'name': name
    },
    success: resolve
  })
}

module.exports.userUpdateTel = function (tel, resolve) {
  wx.request({
    url: `${config.API_URL}/users/me/tel`,
    method: 'PUT',
    header: common.setHeaders(),
    data: {
      'tel': tel
    },
    success: resolve
  })
}

module.exports.userUpdateEmail = function (email, resolve) {
  wx.request({
    url: `${config.API_URL}/users/me/email`,
    method: 'PUT',
    header: common.setHeaders(),
    data: {
      'email': email
    },
    success: resolve
  })
}