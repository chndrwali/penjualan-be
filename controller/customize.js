const fs = require("fs");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const customizeModel = require("../models/customize");

class Customize {
  async getImages(req, res) {
    try {
      let Images = await customizeModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSlideImage(req, res) {
    let image = req.file.filename;
    if (!image) {
      return res.json({ error: "All field required" });
    }
    try {
      let newCustomzie = new customizeModel({
        slideImage: image,
      });
      let save = await newCustomzie.save();
      if (save) {
        return res.json({ success: "Image upload successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.params; // Mengambil ID dari parameter URL
    try {
        let deletedSlideImage = await customizeModel.findById(id);
        if (!deletedSlideImage) {
            return res.status(404).json({ error: "Image not found" });
        }

        const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`;
        let deleteImage = await customizeModel.findByIdAndDelete(id);
        if (deleteImage) {
            // Hapus gambar dari direktori
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
                return res.json({ success: "Image deleted successfully" });
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.countDocuments();
      let Products = await productModel.countDocuments();
      let Orders = await orderModel.countDocuments();
      let Users = await userModel.countDocuments();
      
      return res.json({ Categories, Products, Orders, Users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  }  
}

const customizeController = new Customize();
module.exports = customizeController;