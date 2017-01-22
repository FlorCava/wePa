const redis = require('redis')
const config = require('../config/config')

const redisClient = redis.createClient(config.redis)

redisClient
  .on('error', err => console.log('Redis connection error: ' + err))
  .on('connect', () => console.log('Redis connected to ' + config.redis))
  .on('end', () => console.log('Redis ended'))

module.exports = {
  redis: redis,
  redisClient: redisClient
}