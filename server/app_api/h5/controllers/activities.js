const mongoose = require('mongoose')
const config = require('../../config/config')
const validator = require('validator')
const moment = require('moment')
const request = require('request')

const Activity = mongoose.model('Activity')
const File = mongoose.model('File')
const Counter = mongoose.model('Counter')
const Join = mongoose.model('Join')

const ctrlSettings = require('./settings')
const utils = require('../../../utils/utils')

const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')

function validateActivityForm (payload) {
  const errors = {}
  let isFormValid = true

  if (!payload || validator.isEmpty(payload.title)) {
    isFormValid = false
    errors.title = '请填写【活动标题】。'
  }
  // if (!payload || validator.isEmpty(payload.start_time)) {
  //   isFormValid = false
  //   errors.start_time = '请填写正确的【活动开始时间】。'
  // }
  // if (!payload || validator.isEmpty(payload.end_time)) {
  //   isFormValid = false
  //   errors.end_time = '请填写正确的【活动结束时间】。'
  // }

  if (!isFormValid) {
    errors.summary = '请检查表单字段中的错误。'
  }

  return {
    success: isFormValid,
    errors
  }
}

module.exports.myStartTopActivity = function (req, res) {
  let page = 1
  let query = {
    "create_user": req.user.user_id
  }
  let options = {
    sort: {create_time: 'desc'},
    page: page,
    limit: 2
  }

  Activity.paginate(query, options, function (err, result) {
    if (err) {
      return res.tools.setJson(400, 1, err)
    }
    let activities = []
    result.docs.forEach(function (doc) {
      let activity = {}
      activity.activity_id = doc.activity_id
      activity.title = doc.title
      activity.location = doc.location
      activity.image = config.static_url + doc.image
      let start = moment(doc.start_time)
      let end = moment(doc.end_time)
      activity.start = {
        date: start.format('YYYY-MM-DD'),
        time: start.format('HH:mm')
      }
      activity.end = {
        date: end.format('YYYY-MM-DD'),
        time: end.format('HH:mm')
      }
      activity.count = doc.count
      activity.description = doc.description
      activity.join = doc.join
      activities.push(activity)
    })
    return res.tools.setJson(200, 0, 'success', {
      activities: activities
    })
  })
}

module.exports.myStartActivityList = function (req, res) {
  let page = Math.max(1, req.params.page)
  let query = {
    "create_user": req.user.user_id
  }
  let options = {
    sort: {create_time: 'desc'},
    page: page,
    limit: config.perPage
  }

  Activity.paginate(query, options, function (err, result) {
    if (err) {
      return res.tools.setJson(400, 1, err)
    }
    let activities = []
    result.docs.forEach(function (doc) {
      let activity = {}
      activity.activity_id = doc.activity_id
      activity.title = doc.title
      activity.location = doc.location
      activity.image = config.static_url + doc.image
      let start = moment(doc.start_time)
      let end = moment(doc.end_time)
      activity.start = {
        date: start.format('YYYY-MM-DD'),
        time: start.format('HH:mm')
      }
      activity.end = {
        date: end.format('YYYY-MM-DD'),
        time: end.format('HH:mm')
      }
      activity.count = doc.count
      activity.description = doc.description
      activity.join = doc.join
      activities.push(activity)
    })
    return res.tools.setJson(200, 0, 'success', {
      activities: activities,
      page: page,
      pages: result.pages
    })
  })
}

module.exports.myJoinTopActivity = function (req, res) {
  let page = 1
  let query = {
    "user_id": req.user.user_id
  }
  let options = {
    select: 'activity_id',
    sort: {join_time: 'desc'},
    page: page,
    limit: 2
  }

  Join.paginate(query, options, function (err, result) {
    if (err) {
      return res.tools.setJson(400, 1, err)
    }
    let activity_ids = []
    result.docs.forEach(function (doc) {
      activity_ids.push(doc.activity_id)
    })
    Activity.find({
      'activity_id': {$in: activity_ids}
    }).exec(function (err, result) {
      if (err) {
        return res.tools.setJson(400, 1, err)
      }
      let activities = []
      result.forEach(function (doc) {
        let activity = {}
        activity.activity_id = doc.activity_id
        activity.title = doc.title
        activity.location = doc.location
        activity.image = config.static_url + doc.image
        let start = moment(doc.start_time)
        let end = moment(doc.end_time)
        activity.start = {
          date: start.format('YYYY-MM-DD'),
          time: start.format('HH:mm')
        }
        activity.end = {
          date: end.format('YYYY-MM-DD'),
          time: end.format('HH:mm')
        }
        activity.count = doc.count
        activity.description = doc.description
        activity.join = doc.join
        activities.push(activity)
      })
      return res.tools.setJson(200, 0, 'success', {
        activities: activities
      })
    })
  })
}

module.exports.myJoinActivityList = function (req, res) {
  let page = Math.max(1, req.params.page)
  let query = {
    "user_id": req.user.user_id
  }
  let options = {
    select: 'activity_id',
    sort: {join_time: 'desc'},
    page: page,
    limit: config.perPage
  }

  Join.paginate(query, options, function (err, result) {
    if (err) {
      return res.tools.setJson(400, 1, err)
    }
    let pages = result.pages
    let activity_ids = []
    result.docs.forEach(function (doc) {
      activity_ids.push(doc.activity_id)
    })
    Activity.find({
      'activity_id': {$in: activity_ids}
    }).exec(function (err, result) {
      if (err) {
        return res.tools.setJson(400, 1, err)
      }
      let activities = []
      result.forEach(function (doc) {
        let activity = {}
        activity.activity_id = doc.activity_id
        activity.title = doc.title
        activity.location = doc.location
        activity.image = config.static_url + doc.image
        let start = moment(doc.start_time)
        let end = moment(doc.end_time)
        activity.start = {
          date: start.format('YYYY-MM-DD'),
          time: start.format('HH:mm')
        }
        activity.end = {
          date: end.format('YYYY-MM-DD'),
          time: end.format('HH:mm')
        }
        activity.count = doc.count
        activity.description = doc.description
        activity.join = doc.join
        activities.push(activity)
      })
      return res.tools.setJson(200, 0, 'success', {
        activities: activities,
        page: page,
        pages: pages
      })
    })
  })
}

module.exports.activityReadOne = function (req, res) {
  if (req.params && req.params.activityId) {
    Activity.findOne({'activity_id': req.params.activityId})
      .exec(function (err, doc) {
        if (err) {
          return res.tools.setJson(400, 1, err)
        } else {
          let activity = {}
          activity.activity_id = doc.activity_id
          activity.title = doc.title
          activity.location = doc.location
          activity.image = config.static_url + doc.image
          let start = moment(doc.start_time)
          let end = moment(doc.end_time)
          activity.start = {
            date: start.format('YYYY-MM-DD'),
            time: start.format('HH:mm')
          }
          activity.end = {
            date: end.format('YYYY-MM-DD'),
            time: end.format('HH:mm')
          }
          activity.count = doc.count
          activity.description = doc.description
          activity.join = doc.join
          activity.status = doc.status
          if (doc.qr_code_url === undefined || doc.qr_code_url === '') {
            activity.qr_code_url = ''
          } else {
            activity.qr_code_url = config.static_url + doc.qr_code_url
          }
          // 获取当前用户参与该活动的相关信息
          Join.findOne({
            activity_id: req.params.activityId,
            user_id: req.user.user_id
          })
            .exec(function (err, join) {
              if (err) {
                return res.tools.setJson(400, 1, err)
              }
              let me_joined = false
              let me_checked = false
              if (join) {
                me_joined = true
                if (join.check_in_time) {
                  me_checked = true
                }
              }
              activity.me = {
                joined: me_joined,
                checked: me_checked
              }
              return res.tools.setJson(200, 0, 'success', {
                activity: activity
              })
            })
        }
      })
  }
}

module.exports.activityCreateOne = function (req, res) {
  const validationResult = validateActivityForm(req.body)
  if (!validationResult.success) {
    return res.tools.setJson(400, 1, validationResult.errors)
  }

  if (req.body) {
    Activity.create({
      title: req.body.title,
      location: req.body.location,
      start_time: req.body.start.date + " " + req.body.start.time,
      end_time: req.body.end.date + " " + req.body.end.time,
      image: req.body.image,
      count: req.body.count,
      description: req.body.description,
      create_user: req.user.user_id
    }, function (err, doc) {
      if (err) {
        return res.tools.setJson(400, 1, err)
      } else {
        let activity = {}
        activity.activity_id = doc.activity_id
        activity.title = doc.title
        activity.location = doc.location
        activity.image = config.static_url + doc.image
        let start = moment(doc.start_time)
        let end = moment(doc.end_time)
        activity.start = {
          date: start.format('YYYY-MM-DD'),
          time: start.format('HH:mm')
        }
        activity.end = {
          date: end.format('YYYY-MM-DD'),
          time: end.format('HH:mm')
        }
        activity.count = doc.count
        activity.description = doc.description
        return res.tools.setJson(201, 0, 'success', {
          activity: activity
        })
      }
    })
  }
}

module.exports.activityImageAdd = function (req, res) {
  if (!req.params.activityId && !req.params[0]) {
    return res.tools.setJson(404, 1, {
      'message': '没有找到需要更新的活动'
    })
  }
  Activity.findById(req.params.activityId)
    .exec(function (err, activity) {
      if (err) {
        return res.tools.setJson(400, 1, err)
      } else {
        activity.image = req.params[0]

        activity.save(function (err) {
          if (err) {
            return res.tools.setJson(400, 1, err)
          } else {
            return res.tools.setJson(200, 0, 'success')
          }
        })
      }
    })
}

module.exports.activityImageDelete = function (req, res) {
  if (!req.params.activityId && !req.params[0]) {
    return res.tools.setJson(404, 1, {
      'message': '没有找到需要更新的活动'
    })
  }
  Activity.findById(req.params.activityId)
    .exec(function (err, activity) {
      if (err) {
        return res.tools.setJson(400, 1, err)
      } else {
        activity.image = ''
        activity.save(function (err) {
          if (err) {
            return res.tools.setJson(400, 1, err)
          } else {
            File.findOneAndRemove({'url': req.params[0]})
              .exec(function (err, file) {
                if (err) {
                  return res.tools.setJson(400, 1, err)
                } else {
                  fs.unlink(file.path, function () {
                    return res.tools.setJson(204, 0, 'success')
                  })
                }
              })
          }
        })
      }
    })
}

module.exports.activityJoin = function (req, res) {
  if (req.params && req.params.activityId) {
    Join.create({
      activity_id: req.params.activityId,
      user_id: req.user.user_id
    }, function (err) {
      if (err) {
        return res.tools.setJson(400, 1, err)
      }
      Activity.findOne({'activity_id': req.params.activityId})
        .exec(function (err, activity) {
          if (err) {
            return res.tools.setJson(400, 1, err)
          }
          activity.join.count = activity.join.count + 1
          activity.save(function (err, activity) {
            if (err) {
              return res.tools.setJson(400, 1, err)
            }
            return res.tools.setJson(201, 0, 'success', {
              count: activity.join.count
            })
          })
        })
    })
  }
}

module.exports.activityCheckIn = function (req, res) {
  if (req.params && req.params.activityId) {
    // 查找当前用户是否有参加该活动，如还未参加，则先自动参加该活动，然后进行签到动作
    Join.findOne({
      activity_id: req.params.activityId,
      user_id: req.user.user_id
    })
      .exec(function (err, join) {
        if (err) {
          return res.tools.setJson(400, 1, err)
        }
        if (join) {
          join.check_in_time = moment()
          join.save(function (err) {
            if (err) {
              return res.tools.setJson(400, 1, err)
            }
            Activity.findOne({'activity_id': req.params.activityId})
              .exec(function (err, activity) {
                if (err) {
                  return res.tools.setJson(400, 1, err)
                }
                activity.join.check_in_count = activity.join.check_in_count + 1
                activity.save(function (err, activity) {
                  if (err) {
                    return res.tools.setJson(400, 1, err)
                  }
                  return res.tools.setJson(200, 0, 'success', {
                    count: activity.join.count,
                    check_in_count: activity.join.check_in_count
                  })
                })
              })
          })
        } else {
          Join.create({
            activity_id: req.params.activityId,
            user_id: req.user.user_id,
            check_in_time: moment()
          }, function (err) {
            if (err) {
              return res.tools.setJson(400, 1, err)
            }
            Activity.findOne({'activity_id': req.params.activityId})
              .exec(function (err, activity) {
                if (err) {
                  return res.tools.setJson(400, 1, err)
                }
                activity.join.count = activity.join.count + 1
                activity.join.check_in_count = activity.join.check_in_count + 1
                activity.save(function (err, activity) {
                  if (err) {
                    return res.tools.setJson(400, 1, err)
                  }
                  return res.tools.setJson(200, 0, 'success', {
                    count: activity.join.count,
                    check_in_count: activity.join.check_in_count
                  })
                })
              })
          })
        }
      })
  }
}

module.exports.activityQrCodeCreate = function (req, res) {
  if (req.body && req.body.path && req.body.width && req.body.activityId) {
    ctrlSettings.wxAccessTokenCheck(function (result) {
      let access_token = result.access_token
      let wx_path = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${access_token}`
      let requestOptions = {
        url: wx_path,
        method: 'POST',
        json: {
          path: req.body.path,
          width: req.body.width
        },
        encoding: null
      }

      let year = moment().get('year')
      let month = moment().get('month') + 1
      let day = moment().get('date')

      let filePath = path.resolve(__dirname, `../../../public/image/qr/${year}/${month}/${day}`)

      fse.ensureDirSync(filePath)
      let name = utils.randomWord(false, 12) + '.jpeg'

      request(
        requestOptions,
        function (err, response, body) {
          if (err) {
            return res.tools.setJson(400, 1, err)
          }
          if (body.errcode === undefined) {
            let qr_file_path = path.join(filePath, name)

            fs.writeFile(qr_file_path, body, 'binary', function (err) {
              if (err) {
                return res.tools.setJson(400, 1, err)
              }
              // 所有文件都保存在public目录下面
              let url = qr_file_path.substring(qr_file_path.indexOf('/public/') + 7)
              File.create({
                name: name,
                size: response.headers['Content-Length'],
                type: response.headers['Content-Type'],
                path: qr_file_path,
                url: url
              }, function (err, file) {
                if (err) {
                  return res.tools.setJson(400, 1, err)
                } else {
                  Activity.findOne({'activity_id': req.body.activityId})
                    .exec(function (err, activity) {
                      if (err) {
                        return res.tools.setJson(400, 1, err)
                      } else {
                        activity.qr_code_url = file.url

                        activity.save(function (err) {
                          if (err) {
                            return res.tools.setJson(400, 1, err)
                          } else {
                            return res.tools.setJson(200, 0, 'success', {
                              qr_code_url: config.static_url + activity.qr_code_url
                            })
                          }
                        })
                      }
                    })
                }
              })
            })
          } else {
            return res.tools.setJson(400, 1, body.errmsg)
          }
        }
      )
    })
  }
}

