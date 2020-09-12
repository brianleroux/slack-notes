let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(handler)

async function handler(req) {
  
  let { text, team_id, user_id } = req.body
  
  if (text && req.body.text.length > 0) {
    let table = `notes-${ team_id }-${ user_id }`
    await data.set({ table, text })
    return { body: "cool, got it" }
  }
  else {
    return 'hey you need note text!'
  }
}

/*let qs = require('querystring')

exports.handler = async function note(req) {
  let decoded = Buffer.from(req.body, 'base64').toString()
  let json = qs.parse(decoded)
  return "cool, got it " + '```' + JSON.stringify(json) + '```'
}
*/
