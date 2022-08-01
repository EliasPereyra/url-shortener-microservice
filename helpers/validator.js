const { isWebUri } = require('valid-url')

function validator(url) {
  if (isWebUri(url)) {
    return url
  } else {
    return console.error("Error, it's not a valid HTTP URI")
  }
}

module.exports = { validator }
