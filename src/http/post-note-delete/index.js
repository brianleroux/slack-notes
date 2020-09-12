let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

async function (req) {
  console.log(req)
  return { ok: true }
}
