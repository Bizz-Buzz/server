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
      "username": "symesharr",
      "password": "admin"
    }

#### Response

##### Status Codes:
  * On success, the HTTP status code in the response header is 200 ('OK').
  * If the login information is invalid (username doesn't exist / password is incorrect), a 401 'Unauthorized' HTTP status code will be returned.
  * If the data / object structure of the post is incorrect, a 400 'Bad Request' HTTP status code will be returned.
  * In case of server error, the header status code is a 5xx error code and the response body contains an error object.


The post request will compare the username to the users table for a match, and will bcrypt compare the password attempt to the hashed password in the users table. Returns user information (minus password) on success. A user session is created upon success.

    {
      "user": {
        "username": "symesharr",
        "email": "symeshjb@gmail.com"
        "user_id": 1,
        "user_created_at": "2016-12-16 05:41:15"
      }
    }

([back to summary](#summary))  
