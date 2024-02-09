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

### DOKUMENTASI API

<br/>

### DOKUMENTASI USER

`GET` ALL USER

```
http://localhost:3000/api/users/all-user
```

`POST` ADD USER

```
http://localhost:3000/api/users/add-user
```

payload JSON:

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

`POST` GET SINGLE USER

```
http://localhost:3000/api/users/single-user
```

payload JSON:

```
{
  "uId": "65c5e069b3808d80eea20f38"
}
```

`PUT` EDIT USER

```
http://localhost:3000/api/users/edit-user
```

payload JSON:

```
{
  "uId": "65c5e069b3808d80eea20f38",
  "name": "Candra",
  "phoneNumber": "08238212312"
}

```

`PUT` Change Password

```
http://localhost:3000/api/users/change-password
```

payload JSON:

```
{
  "uId": "65c5e033b3808d80eea20f36",
  "oldPassword": "admin123",
  "newPassword": "admin"
}

```

`PUT` Delete User

```
http://localhost:3000/api/users/delete-user
```

payload JSON:

```
{
  "uId": "65c5e069b3808d80eea20f38"
}

```

### DOKUMENTASI PRODUCTS

`GET` ALL PRODUCT

```
http://localhost:3000/api/products/all-product
```

`GET` SINGLE PRODUCT

```
http://localhost:3000/api/products/single-product/65c61c2bae1c0e887edfb901
```

`POST` ADD PRODUCT

```
http://localhost:3000/api/products/add-product
```

Payload JSON:

```
{
  "name": "Sepatu Olahraga",
  "description": "Sepatu olahraga nyaman untuk berlari dan berlatih.",
  "price": 50,
  "quantity": 100,
  "category": "6123456789abcdef01234567", // ID kategori produk yang valid
  "offer": "Diskon 10% untuk pelanggan baru",
  "status": "available",
  "images": [
    "image1.jpg",
    "image2.jpg"
  ]
}

```

`POST` GET PRODUCT BY CATEGORY

```
http://localhost:3000/api/products/product-by-category
```

Payload JSON:

```
{
  "category": "6123456789abcdef01234567"
}

```

`POST` GET PRODUCT BY PRICE

```
http://localhost:3000/api/products/product-by-price
```

Payload JSON:

```
{
  "price": 50
}

```

`POST` GET WISHLIST PRODUCT

```
http://localhost:3000/api/products/wish-product
```

Payload JSON:

```
{
  "id": "65c614e9ae1c0e887edfb8f6"
}

```

`POST` GET CART PRODUCT

```
http://localhost:3000/api/products/wish-product
```

Payload JSON:

```
{
  "id": "65c614e9ae1c0e887edfb8f6"
}
```

`PUT` PUT EDIT PRODUCT

```
http://localhost:3000/api/products/edit-product
```

Payload JSON:

```
{
   "id": "65c614e9ae1c0e887edfb8f6",
  "name": "Kusen Kayu",
  "description": "Sepatu olahraga nyaman untuk berlari dan berlatih.",
  "price": 50,
  "quantity": 21,
  "category": "6123456789abcdef01234567", // ID kategori produk yang valid
  "offer": "Diskon 10% untuk pelanggan baru",
  "status": "available",
  "images": [
    "image1.jpg",
    "image2.jpg"
  ]
}

```

`DELETE` DELETE PRODUCT

```
http://localhost:3000/api/products/delete-product
```

Payload JSON:

```
{
   "id": "65c614e9ae1c0e887edfb8f6"
}

```

`POST` ADD REVIEW PRODUCT

```
http://localhost:3000/api/products/add-review
```

Payload JSON:

```
{
  "productId": "6123456789abcdef01234567", // Ganti dengan ID produk yang valid
  "userId": "65c61c2bae1c0e887edfb901", // Ganti dengan ID pengguna yang valid
  "rating": "5", // Nilai peringkat (misalnya, 1, 2, 3, 4, atau 5)
  "review": "This is a great product!" // Ulasan tentang produk
}

```

`POST` DELETE REVIEW PRODUCT

```
http://localhost:3000/api/products/delete-review
```

Payload JSON:

```
{
  "productId": "65c61c2bae1c0e887edfb901", // Ganti dengan ID produk yang valid
  "userId": "6123456789abcdef01234567", // Ganti dengan ID pengguna yang valid
  "rating": "5", // Nilai peringkat (misalnya, 1, 2, 3, 4, atau 5)
  "review": "This is a great product!" // Ulasan tentang produk
}

```
