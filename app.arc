@app
begin-app

@static

@http
post /note

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
