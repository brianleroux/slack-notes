let arc = require('@architect/functions')
let tiny = require('tiny-json-http')
let data = require('@begin/data')
let render = require('@architect/shared/note')

exports.handler = arc.http.async(handler)

async function handler (req) {
  
  let raw = JSON.parse(req.body.payload)
  let user_id = raw.user.id
  let team_id = raw.user.team_id
  let view_id = raw.view.id
  let table = `notes-${ team_id }-${ user_id }`
  let key = raw.actions[0].value
  
  // nuke the note
  await data.destroy({table, key})
    
  // read the notes back
  let notes = await data.get({ table })
  
  // update the view
  await view({ view_id, notes })
  
  // clean exit
  return { statusCode: 200 }
}

async function view({ view_id, notes }) {
  let view = JSON.stringify({ 
    type: 'modal', 
    title: {
      type: 'plain_text',
      text: 'notes listed here!'
    },
    blocks: notes.map(render)
  })
  let result = await tiny.post({ 
    url: 'https://slack.com/api/views.update',
    headers: {
      'Authorization': `Bearer ${ process.env.SLACK_TOKEN }`
    },
    data: {
      view_id,
      view
    }
  })
  console.log(JSON.stringify(result, null, 2))
}
