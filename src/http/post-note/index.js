let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = arc.http.async(handler)

async function handler(req) {
  
  // extract useful payload stuff
  let { text, team_id, user_id } = req.body
  
  // create a table for every unique user
  let table = `notes-${ team_id }-${ user_id }`
  
  // if there is a note write it
  if (text && req.body.text.length > 0) {
    await data.set({ table, text })
    return { body: "cool, got it" }
  }
  else {
    // otherwise show notes
    let body = await data.get({ table })
    return { body: '```' + JSON.stringify(body) + '```' }
  }
}

/*let qs = require('querystring')

exports.handler = async function note(req) {
  let decoded = Buffer.from(req.body, 'base64').toString()
  let json = qs.parse(decoded)
  return "cool, got it " + '```' + JSON.stringify(json) + '```'
}
*/
