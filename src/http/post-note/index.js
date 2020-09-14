let arc = require('@architect/functions')
let data = require('@begin/data')
let render = require('@architect/shared/note')
let tiny = require('tiny-json-http')

exports.handler = arc.http.async(handler)

async function handler(req) {
  // console.log(req)
  
  // extract useful payload stuff
  let { text, team_id, user_id, trigger_id } = req.body
  
  // create a table for every unique user
  let table = `notes-${ team_id }-${ user_id }`
  
  // if there is a note write it
  if (text && req.body.text.length > 0) {
    await data.set({ table, text })
  }
  else {
    // get any notes
    let notes = await data.get({ table })
    // and show the modal
    await view({ trigger_id, notes })
  }
  
  return { statusCode: 200 }
}

async function view({ trigger_id, notes }) {
  let blocks = notes.map(render)
  let view = JSON.stringify({ 
    type: 'modal', 
    title: {
      type: 'plain_text',
      text: 'notes listed here'
    },
    blocks
  })
  let result = await tiny.post({ 
    url: 'https://slack.com/api/views.open',
    headers: {
      'Authorization': `Bearer ${ process.env.SLACK_TOKEN }`
    },
    data: {
      trigger_id,
      view
    }
  })
  console.log(result)
}
