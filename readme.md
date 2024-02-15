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
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "userRole": 1,
  "phoneNumber": "1234567890"
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
http://localhost:3000/api/products/single-product
```

Payload JSON

```
{
    "pId": "65c61ff68a8123eaf4005064"
}
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
    "catId": "65ccc4e276bf6435cfecd767"
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
    "productArray": ["65ccc103d6460a623aa94ff9", "65c61ff68a8123eaf4005064", "65c61ff58a8123eaf4005062"]
}


```

`POST` GET CART PRODUCT

```
http://localhost:3000/api/products/wish-product
```

Payload JSON:

```
{
    "productArray": ["65ccc103d6460a623aa94ff9", "65c61ff68a8123eaf4005064", "65c61ff58a8123eaf4005062"]
}

```

`PUT` PUT EDIT PRODUCT

```
http://localhost:3000/api/products/edit-product
```

Payload JSON:

```
{
    "pId": "65ccc103d6460a623aa94ff9",
    "pName": "Nama produk baru",
    "pDescription": "Deskripsi produk yang baru",
    "pPrice": "1000",
    "pQuantity": "22",
    "pCategory": "65ccc4e276bf6435cfecd767",
    "pOffer": "20%",
    "pStatus": "Status baru"
}


```

`DELETE` DELETE PRODUCT

```
http://localhost:3000/api/products/delete-product
```

Payload JSON:

```
{
   "pId": "65c61c2bae1c0e887edfb901"
}


```

`POST` ADD REVIEW PRODUCT

```
http://localhost:3000/api/products/add-review
```

Payload JSON:

```
{
  "pId": "65ccc103d6460a623aa94ff9",
  "uId": "65c88f0b5666352cde3f719a",
  "rating": "5",
  "review": "This is a great product!"
}


```

`DELETE` DELETE REVIEW PRODUCT

```
http://localhost:3000/api/products/delete-review
```

Payload JSON:

```
{
  "pId": "65ccc103d6460a623aa94ff9",
  "rId": "65cdada4458c472d890c4a8f"
}


```

### DOKUMENTASI AUTH

`POST` GET ALL USER

```
http://localhost:3000/api/auth/user
```

`POST` IS ADMIN

```
http://localhost:3000/api/auth/isadmin
```

Payload JSON:

```
{
    "loggedInUserId": "65c5e033b3808d80eea20f36"
}
```

`POST` SIGN IN

```
http://localhost:3000/api/auth/signin
```

Payload JSON:

```
{
    "email": "test@gmail.com",
    "password": "candradasd123"
}

```

`POST` SIGN UP

```
http://localhost:3000/api/auth/signup
```

Payload JSON:

```
{
    "name": "chnseasli",
    "email": "chndrasda@gmail.com",
    "password": "candra123",
    "cPassword": "candra123"
}

```

### DOKUMENTASI ORDER

`GET` ALL ORDERS

```
http://localhost:3000/api/orders/get-all-orders
```

`POST` GET ORDER BY USER

```
http://localhost:3000/api/orders/order-by-user
```

Payload JSON:

```
{
  "uId": "65c636f4971ab20cdb496ec9" // Ganti dengan ID pengguna yang ingin Anda gunakan sebagai filter
}

```

`POST` CREATE ORDERS

```
http://localhost:3000/api/orders/create-order
```

Payload JSON:

```
{
  "allProduct": [
    {
      "id": "621bfa417d7c915f8e78b1ff",
      "quantity": 2
    },
    {
      "id": "621bfa417d7c915f8e78b200",
      "quantity": 1
    }
  ],
  "user": "65c636f4971ab20cdb496ec9",
  "amount": 150,
  "transactionId": "1234567890",
  "address": "Jl. Contoh No. 123",
  "phone": "081234567890",
  "status": "Not processed"
}

```

`POST` UPDATE ORDERS

```
http://localhost:3000/api/orders/update-order
```

Payload JSON:

```
{
  "oId": "621bfa417d7c915f8e78b1ff", // Ganti dengan ID pesanan yang ingin Anda perbarui
  "status": "Shipped" // Ganti dengan status baru untuk pesanan
}

```

`POST` DELETE ORDERS

```
https://localhost:3000/api/orders/delete-order
```

Payload JSON:

```
{
  "oId": "65c85da87c0e35ccc34b4c61" // Ganti dengan ID pesanan yang ingin Anda perbarui
}

```

### DOKUMENTASI BRAINTREE

`POST` GET TOKEN

```
http://localhost:3000/api/braintree/get-token
```

`POST` GET PAYMENT

```
http://localhost:3000/api/braintree/payment
```

Payload JSON:

```
{
  "amountTotal": "100.00", // Jumlah total pembayaran dalam format string
  "paymentMethod": "fake-valid-nonce" // Metode pembayaran nonce (contoh: fake-valid-nonce)
}

```
