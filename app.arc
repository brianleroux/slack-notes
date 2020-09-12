@app
begin-app

@static

@http
post /note
post /note/delete

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
