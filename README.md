# Social Media App
# How to use?
* docker-compose up --build -d
# This project includes:

*Posts*
POST {{url}}/posts
body: {
    "post_messsage": "bla bla",
}

GET {{url}}/posts
PUT {{url}}/posts
body: {
    "post_message": "another bla bla",
    "post_id": "objectId of post"
}
DELETE {{url}}/posts/<post_id>

*Users*
POST {{url}}/users/register
body: {
    "username": "name",
    "email": "some email",
    "password": "user password" 
}

POST {{url}}/users/login
body: {
    "email": "some email",
    "password": "user password" 
}


*not finished*
comment for frined posts and edit my comment/remove my comment only need autorization
friends relations.