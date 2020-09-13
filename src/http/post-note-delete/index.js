let arc = require('@architect/functions')
let data = require('@begin/data')
let render = require('@architect/shared/note')

exports.handler = arc.http.async(handler)

async function handler (req) {
  
  let raw = JSON.parse(req.body.payload)
  let user_id = raw.user.id
  let team_id = raw.user.team_id
  let table = `notes-${ team_id }-${ user_id }`
  let key = raw.actions[0].value
  
  // nuke the note
  await data.destroy({table, key})
  
  // read the notes back
  let notes = await data.get({ table })
  let blocks = notes.map(render)
  
  return {
    json: { blocks }
  }
}
