# 1. Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
# Sending a plain text fragment with Json
Content-Type: application/json
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request
{ "service": "DynamoDB" }

# 2Expecting HTTP 201 response
HTTP/1.1 201
[Captures]
url: header "Location"
id: jsonpath "$.id"

#3
GET {{url}}/info
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
jsonpath "$.fragment.id" == {{id}}
jsonpath "$.fragment.type" == "application/json"
jsonpath "$.fragment.size" == 25


# 4. Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
# Sending a plain text fragment with Json
Content-Type: text/markdown
# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request
`DynamoDB is **great**`
#5
# Expecting HTTP 201 response
HTTP/1.1 201
[Captures]
fragment2_url: header "Location"
fragment2_id: jsonpath "$.id"
#6
GET {{fragment2_url}}/info
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
jsonpath "$.fragment.id" == {{fragment2_id}}
jsonpath "$.fragment.type" == "text/markdown"
jsonpath "$.fragment.size" == 21

#7
GET http://localhost:8080/v1/fragments
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
jsonpath "$.fragments[?(@.id=='{{id}}')]" exists
jsonpath "$.fragments[?(@.id=='{{fragment2_id}}')]" exists

#8
DELETE {{url}}
[BasicAuth]
user1@email.com:password1

#9
HTTP/1.1 200

#10
GET {{url}}
[BasicAuth]
user1@email.com:password1

#11
HTTP/1.1 404

#7
GET http://localhost:8080/v1/fragments
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
jsonpath "$.fragments[?(@.id=='{{id}}')]" isEmpty






