let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(handler)

async function handler(req) {
  return { body: "cool, cool, got it " + '```' + JSON.stringify(req.body) + '```' }
}

/*let qs = require('querystring')

exports.handler = async function note(req) {
  let decoded = Buffer.from(req.body, 'base64').toString()
  let json = qs.parse(decoded)
  return "cool, got it " + '```' + JSON.stringify(json) + '```'
}
*/
