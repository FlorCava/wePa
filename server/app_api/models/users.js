/**
 * 用户
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const weiXinSchema = Schema({
  appId: String,
  openId: String,
  unionId: {type: String, default: ''},
  nickName: String,
  gender: String,
  city: String,
  province: String,
  country: String,
  avatarUrl: String
})

const userSchema = new Schema({
  user_id: Number,
  name: {type: String, default: ''},
  tel: {type: String, default: ''},
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  avatarUrl: String,
  status: {type: String, default: '0'}, // 0 - 未激活（不能使用tel／email + password进行登录；1 - 正常；2 - 禁用
  weiXin: weiXinSchema
})

const Counter = mongoose.model('Counter')

userSchema.pre('save', function (next) {
  let doc = this
  if (this.isNew) {
    Counter.findByIdAndUpdate({_id: 'user_id'}, {$inc: {seq: 1}}, {
      new: true,
      upsert: true
    }, function (error, counter) {
      if (error) {
        return next(error)
      }
      doc.user_id = counter.seq
      next()
    })
  } else {
    return next()
  }
})

userSchema.pre('save', function (next) {
  let user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

mongoose.model('User', userSchema)
