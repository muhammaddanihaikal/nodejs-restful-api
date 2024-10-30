# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "mdanihaikal",
  "password": "inipassword123",
  "name": "Muhammad Dani Haikal"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "mdanihaikal",
    "name": "Muhammad Dani Haikal"
  }
}
```

Response Body Errors:

```json
{
  "errors": "Username sudah ada"
}
```

## Login User API

Endpoint: POST /api/users/login

## Update User API

## Get User API

## Logout User API
