const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const mongoose = require('mongoose')
const User = mongoose.model('User')
const config = require('../config/config')

module.exports = function (passport) {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = config.secret
  opts.passReqToCallback = true
  passport.use('jwt', new JwtStrategy(opts, function (req, jwtPayload, done) {
    // todo:此处需要处理（例如使用jwt-simple）成jwt_payload.id来访问
    User.findOne({_id: jwtPayload._doc._id}, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
