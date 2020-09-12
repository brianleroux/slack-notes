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
    return {
      body: JSON.stringify({
	      "blocks": [
		    {
			    "type": "section",
			    "text": {
				    "type": "mrkdwn",
				    "text": "This is a section block with a button."
			    },
			    "accessory": {
				    "type": "button",
				    "text": {
					    "type": "plain_text",
					    "text": "Click Me",
					    "emoji": true
				    },
				    "value": "click_me_123"
			    }
		    }]
      })
    }
    
    
    
    
  }
}
