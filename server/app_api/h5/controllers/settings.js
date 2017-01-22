const request = require('request')
const config = require('../../config/config')
const redis = require('../../models/redis')

module.exports.wxAccessTokenCheck = function (callback) {
  const token_key = 'wx_access_token'
  redis.redisClient.get(token_key, function (err, reply) {
    if (err) {
      callback({
        success: false,
        error: err
      })
    }
    if (reply === null) {
      let appId = config.wxAppId
      let appSecret = config.wxAppSecret
      let path = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
      let requestOptions = {
        url: path,
        method: 'GET',
        json: {}
      }
      request(
        requestOptions,
        function (err, response, body) {
          if (err) {
            callback({
              success: false,
              error: err
            })
          }
          if (body.errcode === undefined) {
            redis.redisClient.set(token_key, body.access_token)
            redis.redisClient.expire(token_key, 60 * 60 * 1.5) // 此处默认access_token为1.5小时，微信官方返回的有效期为7200秒（2小时）
            callback({
              success: true,
              access_token: body.access_token
            })
          } else {
            callback({
              success: false,
              error: body.errmsg
            })
          }
        }
      )
    } else {
      callback({
        success: true,
        access_token: reply
      })
    }
  })
}