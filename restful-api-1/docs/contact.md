# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "dani",
  "lastName": "haikal",
  "email": "danihaikal@gmail.com",
  "phone": "08984182517"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "dani",
    "lastName": "haikal",
    "email": "danihaikal@gmail.com",
    "phone": "08984182517"
  }
}
```

Response Body Errors :

```json
{
  "erros": "Email tidak valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:contactId

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "dani",
  "lastName": "haikal",
  "email": "danihaikal@gmail.com",
  "phone": "08984182517"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "dani",
    "lastName": "haikal",
    "email": "danihaikal@gmail.com",
    "phone": "08984182517"
  }
}
```

Response Body Errors :

```json
{
  "erros": "Email tidak valid"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:contactId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "dani",
    "lastName": "haikal",
    "email": "danihaikal@gmail.com",
    "phone": "08984182517"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Contact tidak ditemukan"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : Search firstName atau lastName menggunakan like query, (optional).
- email : Search email menggunakan like query, (optional).
- phone : Search phone menggunakan like query, (optional).
- page : nomer halaman, default 1.
- size: size per halaman , default 10.

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "dani",
      "lastName": "haikal",
      "email": "danihaikal@gmail.com",
      "phone": "08984182517"
    },
    {
      "id": 2,
      "firstName": "dani",
      "lastName": "haikal",
      "email": "danihaikal@gmail.com",
      "phone": "08984182517"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Errors :

```json
{}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:contactId

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
  "erros": "Contact tidak ditemukan"
}
```
