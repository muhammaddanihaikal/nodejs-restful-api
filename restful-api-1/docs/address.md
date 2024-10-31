# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "country": "negara apa",
  "postalCode": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postalCode": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country wajib diisi"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "country": "negara apa",
  "postalCode": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postalCode": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country wajib diisi"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postalCode": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "erros": "Contact tidak ditemukan"
}
```

## List Addreses API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "country": "negara apa",
      "postalCode": "kode pos"
    },
    {
      "id": 2,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "country": "negara apa",
      "postalCode": "kode pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Contact tidak ditemukan"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact tidak ditemukan"
}
```
