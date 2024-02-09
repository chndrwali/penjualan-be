const Product = require("../models/products");
const fs = require("fs");
const path = require("path");

class ProductsController {
  static deleteImages(images, basePath) {
    for (const image of images) {
      const imagePath = path.join(basePath, image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  }

  async getAllProduct(req, res) {
    try {
      const products = await Product.find({})
        .populate("category", "_id name")
        .sort({ _id: -1 });

      return res.json({ products });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductByCategory(req, res) {
    const { categoryId } = req.body;

    try {
      const products = await Product.find({ category: categoryId }).populate(
        "category",
        "_id name"
      );

      return res.json({ products });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductByPrice(req, res) {
    const { price } = req.body;

    try {
      const products = await Product.find({ price: { $lt: price } })
        .populate("category", "_id name")
        .sort({ price: -1 });

      return res.json({ products });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWishProduct(req, res) {
    const { productArray } = req.body;

    try {
      const wishProducts = await Product.find({ _id: { $in: productArray } });

      return res.json({ products: wishProducts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCartProduct(req, res) {
    const { productArray } = req.body;

    try {
      const cartProducts = await Product.find({ _id: { $in: productArray } });

      return res.json({ products: cartProducts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postAddReview(req, res) {
    const { productId, userId, rating, review } = req.body;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const existingReview = product.ratingsReviews.find(
        (rev) => rev.user.toString() === userId
      );

      if (existingReview) {
        return res.status(400).json({ error: "You have already reviewed this product" });
      }

      product.ratingsReviews.push({ user: userId, rating, review });
      await product.save();

      return res.json({ success: "Review added successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteReview(req, res) {
    const { reviewId, productId } = req.body;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.ratingsReviews = product.ratingsReviews.filter(
        (rev) => rev._id.toString() !== reviewId
      );
      await product.save();

      return res.json({ success: "Review deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postAddProduct(req, res) {
    try {
      const {
        name,
        description,
        price,
        quantity,
        category,
        offer,
        status,
        images,
      } = req.body;

      const newProduct = new Product({
        name,
        description,
        price,
        quantity,
        category,
        offer,
        status,
        images,
      });

      await newProduct.save();
      return res.status(201).json({ success: "Product created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postEditProduct(req, res) {
    try {
      const { id, ...editData } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(id, editData, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ success: "Product updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDeleteProduct(req, res) {
    const { id } = req.body;

    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json({ success: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSingleProduct(req, res) {
    const { id } = req.body;

    try {
      const product = await Product.findById(id)
        .populate("category", "name")
        .populate("ratingsReviews.user", "name email");

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json({ product });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new ProductsController();
