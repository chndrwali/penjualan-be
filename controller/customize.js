const fs = require("fs");
const customizeModel = require("../models/customize");

class Customize {
  async getImages(req, res) {
    try {
      let images = await customizeModel.find({});
      return res.json({ images });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async uploadSlideImage(req, res) {
    try {
      if (!req.file || !req.file.filename) {
        return res.status(400).json({ error: "Image file is required" });
      }
      const { filename } = req.file;
      const newCustomize = new customizeModel({ slideImage: filename });
      await newCustomize.save();
      return res.json({ success: "Image uploaded successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteSlideImage(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Image id is required" });
      }
      const image = await customizeModel.findById(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      const filePath = `../server/public/uploads/customize/${image.slideImage}`;
      await customizeModel.findByIdAndDelete(id);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to delete image" });
        }
        return res.json({ success: "Image deleted successfully" });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllData(req, res) {
    try {
      const [categoriesCount, productsCount, ordersCount, usersCount] =
        await Promise.all([
          categoryModel.countDocuments(),
          productModel.countDocuments(),
          orderModel.countDocuments(),
          userModel.countDocuments(),
        ]);
      return res.json({
        categories: categoriesCount,
        products: productsCount,
        orders: ordersCount,
        users: usersCount,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
