const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const tools = require('./app_api/middlewares/tools')

require('./app_api/models/db')

// 项目当前不需要Admin管理端
// const routesAdminApi = require('./app_api/routes/index')
const routesH5Api = require('./app_api/h5/routes/index')

const app = express()
app.use(cors())

// 服务端只提供API
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// app.set('view engine', 'pug');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(passport.initialize())
require('./app_api/config/passport')(passport)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, 'public')))

// response辅助类工具中间件
app.use(/\/api/, tools)

// app.use('/', routes)
// app.use('/api/admin', routesAdminApi)
app.use('/api/h5', routesH5Api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    console.log(err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
app.use(function (err, req, res) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
