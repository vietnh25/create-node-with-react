// key.js - figure out what set of credetials to return
if (process.env.NODE_ENV === 'production') {
  // return prod set of keys
  module.exports = require('./prod');
} else {
  // return the dev keys
  module.exports = require('./dev');
}