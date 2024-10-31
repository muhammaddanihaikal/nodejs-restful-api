# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "mdanihaikal",
  "password": "rahasia",
  "name": "Muhammad Dani Haikal"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "mdanihaikal",
    "name": "Muhammad Dani Haikal"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Username sudah ada"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "mdanihaikal",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Username atau password salah"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "nama baru", // optional
  "password": "password baru" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "mdanihaikal",
    "name": "nama baru",
    "password": "password baru"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Name tidak boleh kurang dari 5 karakter"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "mdanihaikal",
    "name": "nama baru"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Errors :

```json
{
  "errors": "Unauthorized"
}
```
