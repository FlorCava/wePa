/**
 * 活动
 */
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const locationSchema = Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number
})

const activitySchema = Schema({
  activity_id: Number,
  title: {type: String, default: ''},
  location: locationSchema,
  start_time: Date,
  end_time: Date,
  image: String, // 活动海报
  count: Number, // 活动人数
  description: String, // 活动介绍
  status: {type: String, default: '1'}, // 0 - 未发布； 1 - 已发布； 2 - 已开始； 3 - 已结束；
  qr_code_url: String,
  create_user: Number,
  create_time: {type: Date, default: Date.now},
  join: {
    count: {type: Number, default: 0},
    check_in_count: {type: Number, default: 0}
  }
})
activitySchema.plugin(mongoosePaginate)

const Counter = mongoose.model('Counter')

activitySchema.pre('save', function (next) {
  let doc = this
  if (this.isNew) {
    Counter.findByIdAndUpdate({_id: 'activity_id'}, {$inc: {seq: 1}}, {
      new: true,
      upsert: true
    }, function (error, counter) {
      if (error) {
        return next(error)
      }
      doc.activity_id = counter.seq
      next()
    })
  } else {
    return next()
  }
})

mongoose.model('Activity', activitySchema)
