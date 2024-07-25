# tests/integration/post-fragments.hurl

# 1. Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
# Sending a plain text fragment with charset
Content-Type: text/plain
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request goes in ```...``` when it's a string
`Hello S3!`

# Expecting HTTP 201 response
HTTP/1.1 201
[Captures]
url: header "Location"
id: jsonpath "$.id"

# 2. Authenticated GET of the posted fragment by its URL
GET {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
Content-Type: text/plain; charset=utf-8
[Asserts]
body == "Hello S3!"

# 3. Authenticated Delete of the posted fragment
DELETE http://localhost:8080/v1/fragments/{{id}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200

#4 Getting the delete fargment 
GET {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 404
