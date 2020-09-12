let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

async function handler (req) {
  let raw = JSON.parse(req.body.payload)
  console.log(raw)
  return { ok: true }
}
