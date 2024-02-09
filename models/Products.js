const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },dasdad
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    images: {
      type: Array,
      required: true,
    },
    offer: {
      type: String,
      default: null,
    },
    ratingsReviews: [
      {
        review: String,
        user: { type: Schema.Types.ObjectId, ref: "users" },
        rating: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["available", "sold out", "coming soon"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
module.exports = Product;
