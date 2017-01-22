/**
 * 用户参与活动
 */
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const joinSchema = Schema({
  activity_id: Number,
  user_id: Number,
  join_time: {type: Date, default: Date.now},
  check_in_time: Date
})
joinSchema.plugin(mongoosePaginate)

mongoose.model('Join', joinSchema)
