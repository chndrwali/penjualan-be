const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Memindahkan index ke sini
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Menggunakan ekspresi reguler yang lebih sederhana
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String, // Mengubah tipe data menjadi String karena nomor telepon dapat berisi karakter selain angka
    },
    userImage: {
      type: String,
      default: "user.png",
    },
    verified: {
      type: Boolean, // Mengubah tipe data menjadi Boolean karena verified hanya memiliki dua nilai: true atau false
      default: false, // Mengubah nilai default menjadi false
    },
    secretKey: {
      type: String,
      default: null,
    },
    history: {
      type: [Object], // Mengubah tipe data menjadi Array of Objects
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
