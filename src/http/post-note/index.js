let qs = require('querystring')

exports.handler = async function note(req) {
  let decoded = Buffer.from(req.body, 'base64').toString()
  let json = qs.parse(decoded)
  return "cool, got it " + '```' + JSON.stringify(json) + '```'
}
