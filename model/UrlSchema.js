const mongoose = require('mongoose')
const Schema = mongoose.Schema

const baseSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }
})

const UrlSchema = mongoose.model('UrlSchema', baseSchema)

module.exports = UrlSchema
