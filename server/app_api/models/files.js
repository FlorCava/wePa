/**
 * 文件
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = Schema({
  path: String, // 文件存储路径
  url: String, // 文件访问路径
  size: String, // 文件大小
  type: String, // 文件类型
  name: String // 文件自定义名称（存储文件时会根据一定的规则重命名）
})

mongoose.model('File', fileSchema)
