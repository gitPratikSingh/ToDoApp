# ToDoApp

Methods supported by this restful TODO api

Title : Create a user
URL : /users
Method : POST
Data Params : { email : [string], password : [alphanumeric] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : User login
URL : /user/login
Method : POST
Data Params : { email : [string], password : [alphanumeric] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : User logout
URL : /user/me/token
Method : DELETE
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : Create a Todo note
URL : /todos
Method : POST
Data Params : { text : [string]}
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : Get a Todo note
URL : /todos/:id
Method : GET
URL Params : Required: id=[integer]
Data Params : { text : [string]}
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : Get a lsit of Todo notes
URL : /todos
Method : GET
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : Delete a Todo note
URL : /todos/:id
Method : DELETE
URL Params : Required: id=[integer]
Data Params : { text : [string]}
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)

Title : Update a Todo note
URL : /todos/:id
Method : PATCH
URL Params : Required: id=[integer]
Data Params : { text : [string], completed: [boolean]}
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
