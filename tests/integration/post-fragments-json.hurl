# tests/integration/post-fragments-json.hurl

# 1. Authenticated POST to /v1/fragments with JSON content
POST http://localhost:8080/v1/fragments
# Sending a JSON fragment
Content-Type: application/json
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request goes in ```...``` when it's a JSON object
{
  "message": "This is a JSON fragment!"
}

# Expecting HTTP 201 response
HTTP/1.1 201
[Asserts]
# The Location header should look like what we expect (including the fragment id)
header "Location" matches "^http:\/\/localhost:8080\/v1\/fragments\/[A-Za-z0-9_-]+$"
jsonpath "$.status" == "ok"
jsonpath "$.type" == "application/json"
jsonpath "$.size" == 43  # Adjust size according to the length of the JSON data
[Captures]
url: header "Location"

# 2. Authenticated GET of the posted JSON fragment by its URL
GET {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
Content-Type: application/json; charset=utf-8
Content-Length: 38  # Adjust length according to the JSON data size
[Asserts]
# Body of the response should match the original JSON payload
jsonpath "$.message" == "This is a JSON fragment!"
