const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const fse = require('fs-extra')
const utils = require('../../../utils/utils')
const multer = require('multer')
const moment = require('moment')

const ctrlUsers = require('../controllers/users')
const ctrlFiles = require('../controllers/files')
const ctrlActivity = require('../controllers/activities')

/**
 * 用户 routing
 */
// 微信小程序用户登陆／注册
router.post('/users/wei_xin/auth',
  ctrlUsers.authWithWeiXinApp
)
// 修改我的用户名
router.put('/users/me/name',
  passport.authenticate('jwt', {session: false}),
  ctrlUsers.userUpdateName
)
// 修改我的手机号
router.put('/users/me/tel',
  passport.authenticate('jwt', {session: false}),
  ctrlUsers.userUpdateTel
)
// 修改我的电子邮箱
router.put('/users/me/email',
  passport.authenticate('jwt', {session: false}),
  ctrlUsers.userUpdateEmail
)

/**
 * 活动 routing
 */
// 获取指定的活动
router.get('/activities/:activityId',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.activityReadOne
)
// 获取我创建的活动（最新的2个）
router.get('/activities/my/start',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.myStartTopActivity
)
// 获取我创建的活动列表
router.get('/activities/my/start/page/:page',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.myStartActivityList
)
// 获取我参加的活动（最新的2个）
router.get('/activities/my/join',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.myJoinTopActivity
)
// 获取我参加的活动列表
router.get('/activities/my/join/page/:page',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.myJoinActivityList
)
// 创建新的活动
router.post('/activities',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.activityCreateOne
)
// 参加指定的活动
router.post('/activities/:activityId/join',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.activityJoin
)
// 指定的活动签到
router.post('/activities/:activityId/check_in',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.activityCheckIn
)
// 生成指定活动的二维码（用于签到）
router.post('/activities/:activityId/qr_code',
  passport.authenticate('jwt', {session: false}),
  ctrlActivity.activityQrCodeCreate
)

/**
 * 活动文件服务 routing
 */
const storageActivity = multer.diskStorage({
  destination: function (req, file, cb) {
    let year = moment().get('year')
    let month = moment().get('month') + 1
    let day = moment().get('date')
    let filePath = path.resolve(__dirname, `../../../public/image/activities/${year}/${month}/${day}`)

    fse.ensureDir(filePath, function () {
      cb(null, filePath)
    })
  },
  filename: function (req, file, cb) {
    let name = utils.randomWord(false, 12)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      name = name + '.jpg'
    } else if (file.mimetype === 'image/png') {
      name = name + '.png'
    }
    cb(null, name)
  }
})
const uploadActivity = multer({storage: storageActivity})
// todo:需要加入权限验证才能进行上传／删除文件
router.post('/file/activity',
  uploadActivity.single('image'),
  ctrlFiles.fileCreate
)
router.delete('/file/*?',
  ctrlFiles.fileDeleteOne
)

module.exports = router
