/**
 * 自增变量计数器
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CounterSchema = Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
})

mongoose.model('Counter', CounterSchema)
