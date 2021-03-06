# API DOCUMENTATION FOR BIZZ_BUZZ API/server

## Author: Harrison Symes

## Summary

#### API for use with the Bizz-Buzz app project.

##### API calls:

###### endpoint: https://localhost:3000/api/v1

| Task | Method | Requires authentication? |
| ------ | -------- | -------- |
| [Log in as a user](#login-as-user) | POST | yes |



If a non-authenticated user attempts any requests that require authentication, the result will be an object structured as follows:

    {
      "error":
      {
        "type": "auth",
        "code": 401,
        "message": "authentication failed"
      }
    }

## Requests

### Login as a user


| Method | Endpoint | Usage | Returns |
| ------ | -------- | ----- | ------- |
| POST | `/users/login` | Login as a user | user |


The post object must take the form:

    {
      "username": "symeshjb@gmail.com",
      "password": "admin"
    }

    //The email must have the key name "username" for passport auth functionality. The email column in the users table will still be used for comparison

#### Response

##### Status Codes:
  * On success, the HTTP status code in the response header is 200 ('OK').
  * If the login information is invalid (username doesn't exist / password is incorrect), a 401 'Unauthorized' HTTP status code will be returned.
  * If the data / object structure of the post is incorrect, a 400 'Bad Request' HTTP status code will be returned.
  * In case of server error, the header status code is a 5xx error code and the response body contains an error object.


The post request will compare the username to the users table for a match, and will bcrypt compare the password attempt to the hashed password in the users table. Returns user information (minus password)  and list of Bizz's that the authenticated user is a part of on success. A user session is created upon success.

    {
      user: {
        "email": "symeshjb@gmail.com",
        "first_name": "Harrison",
        "last_name": "Symes",
        ["username": "symesharr",]
        "password": "admin"
      },
      bizzList: [
        {
          bizz_created_at: "2016-12-23 09:08:27",
          bizz_id: 1,
          bizz_members: 1,
          bizz_name: "Bizz-Buzz",
          bizz_owner: 1
        },
        {}, ...
      ]
    }

([back to summary](#summary))  


### Signup as a user

| Method | Endpoint | Usage | Returns |
| ------ | -------- | ----- | ------- |
| POST | `/users/signup` | signup as a new user | user |

The post object must take the form:

    {
      "email": "symeshjb@gmail.com",
      "first_name": "Harrison",
      "last_name": "Symes",
      ["username": "symesharr",]
      "password": "admin"
    }

#### Response

##### Status Codes:
  * On success, the HTTP status code in the response header is 200 ('OK').
  * If the singup information is invalid (email already taken), a 401 'Unauthorized' HTTP status code will be returned.
  * If the data / object structure of the post is incorrect, a 400 'Bad Request' HTTP status code will be returned.
  * In case of server error, the header status code is a 5xx error code and the response body contains an error object.

The post request will compare the email to the users table to ensure the email, and on success will bcrypt hash the password and store it in the users stable along with the other provided info.  Returns user_id of user just created upon success

    {
      "user_id": 1
    }

([back to summary](#summary))


### Get bizz list by user

| Method | Endpoint | Usage | Returns |
| ------ | -------- | ----- | ------- |
| GET | `/bizz/list` | get a list of Bizz's that a user is a part of | bizzList |

The query object must take the form:

    {
      bizz_name: "Bizz-Buzz"
    }

#### Response

##### Status Codes:
  * On success, the HTTP status code in the response header is 200 ('OK').
  * If the data / object structure of the query is incorrect, a 400 'Bad Request' HTTP status code will be returned.
  * In case of server error, the header status code is a 5xx error code and the response body contains an error object.

The get request will retrieve a the list of Bizz's that the authenticated

    {
      [
        {
          bizz_created_at: "2016-12-23 09:08:27",
          bizz_id: 1,
          bizz_members: 1,
          bizz_name: "Bizz-Buzz",
          bizz_owner: 1
        }
      ]
    }

([back to summary](#summary))
