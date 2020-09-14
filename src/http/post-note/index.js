let arc = require('@architect/functions')
let data = require('@begin/data')
let render = require('@architect/shared/note')

exports.handler = arc.http.async(handler)

async function handler(req) {
  
  console.log(req)
  
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
    let notes = await data.get({ table })
    let blocks = notes.map(render)
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `You have *${ notes.length } notes*.`
      }
    })
    return {
      body: JSON.stringify({ blocks })
    }
  }
}
