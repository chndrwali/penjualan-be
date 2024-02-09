## Dokumentasi

### Instal Dependensi

masukan perintah di terminal/cmd

```
npm install
```

### Jalankan dengan perintah

```
npm run start-dev
```

Akses di http://localhost:3000/

### API

<br/>

### USER

`GET` ALL USER

```
http://localhost:3000/api/users/all-user
```

<br/>
`POST` ADD USER

```
http://localhost:3000/api/users/add-user
```

test Body JSON

```
{
  "name": "user",
  "email": "user@gmail.com",
  "password": "user123",
  "userRole": 1,
  "phoneNumber": "089652648221",
  "userImage": "user.png",
  "verified": true,
  "secretKey": "sasd",
  "history": [
    {"action": "login", "timestamp": "2024-02-10T10:00:00Z"},
    {"action": "logout", "timestamp": "2024-02-10T18:00:00Z"}
  ]
}

```

<br/>
`POST` GET SINGLE USER

```
http://localhost:3000/api/users/single-user
```

Test Body JSON

```
{
  "uId": "65c5e069b3808d80eea20f38"
}
```

<br/>
`PUT` EDIT USER

```
http://localhost:3000/api/users/edit-user
```

Test Body JSON

```
{
  "uId": "65c5e069b3808d80eea20f38",
  "name": "Candra",
  "phoneNumber": "08238212312"
}

```

<br />
