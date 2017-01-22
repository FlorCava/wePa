const mongoose = require('mongoose')
const config = require('../config/config')

const dbURI = config.database

mongoose.Promise = global.Promise
mongoose.connect(dbURI)

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI)
})
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected')
})

const gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg)
    callback()
  })
}

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2')
  })
})

// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0)
  })
})

// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0)
  })
})

// Bring in your schemas & models
require('./counters')
require('./files')
require('./users')
require('./activities')
require('./joins')
