const { validator: urlValidator } = require("./validator")
const urlSchema = require("../model/UrlSchema")

function shortener(url, callback) {
  if (urlValidator(url)) {
    urlSchema.findOne({ url: url }, (err, data) => {
      if (err) return console.error(err)

      if (data) {
        return callback(null, data._id)
      }
      else {
        urlSchema.create({ url: url }, (err, data) => {
          if (err) return console.error(err)

          return callback(null, data._id)
        })
      }
    })
  }
}

function redirecter(urlid, callback) {
  urlSchema.findById(urlid, (err, urlredirect) => {
    if (err) return callback(err)
    if (!urlredirect) return callback('wrong url!')

    return callback(null, urlredirect.url)

  })
}

module.exports = { shortener, redirecter }
