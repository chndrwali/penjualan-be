const productModel = require("../models/products");
const fs = require("fs");
const path = require("path");

class Product {
  // Delete Image from uploads -> products folder
  static deleteImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "/public/uploads/products/";
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = "";
      if (mode == "file") {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (Products) {
        return res.json({ Products });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddProduct(req, res) {
    let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } =
      req.body;
    let images = req.files;

    // Periksa apakah gambar telah diunggah
    if (!images || images.length !== 2) {
      return res.json({ error: "Must upload 2 images" });
    }

    // Validation
    if (
      !pName ||
      !pDescription ||
      !pPrice ||
      !pQuantity ||
      !pCategory ||
      !pOffer ||
      !pStatus
    ) {
      Product.deleteImages(images, "file");
      return res.json({ error: "All fields must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
      Product.deleteImages(images, "file");
      return res.json({
        error: "Name 255 & Description must not be 3000 character long",
      });
    }
    // Validate Images
    else if (images.length !== 2) {
      Product.deleteImages(images, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newProduct = new productModel({
          pImages: allImages,
          pName,
          pDescription,
          pPrice,
          pQuantity,
          pCategory,
          pOffer,
          pStatus,
        });
        let save = await newProduct.save();
        if (save) {
          return res.json({ success: "Product created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  async postEditProduct(req, res) {
    let {
        pId,
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
    } = req.body;
    let editImages = req.files;

    // Validate other fields
    if (
        !pId ||
        !pName ||
        !pDescription ||
        !pPrice ||
        !pQuantity ||
        !pCategory ||
        !pOffer ||
        !pStatus
    ) {
        return res.json({ error: "All fields must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
        return res.json({
            error: "Name must not exceed 255 characters and Description must not exceed 3000 characters",
        });
    }
    // Validate Update Images
    else if (editImages && editImages.length == 1) {
        Product.deleteImages(editImages, "file");
        return res.json({ error: "Must provide 2 images" });
    } else {
        let editData = {
            pName,
            pDescription,
            pPrice,
            pQuantity,
            pCategory,
            pOffer,
            pStatus,
        };
        if (editImages && editImages.length == 2) {
            let allEditImages = [];
            for (const img of editImages) {
                allEditImages.push(img.filename);
            }
            editData = { ...editData, pImages: allEditImages };
            Product.deleteImages(pImages.split(","), "string");
        }
        try {
            await productModel.findByIdAndUpdate(pId, editData);
            return res.json({ success: "Product edited successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}



  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteProductObj = await productModel.findById(pId);
        let deleteProduct = await productModel.findByIdAndDelete(pId);
        if (deleteProduct) {
          // Delete Image from uploads -> products folder
          Product.deleteImages(deleteProductObj.pImages, "string");
          return res.json({ success: "Product deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singleProduct = await productModel
          .findById(pId)
          .populate("pCategory", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleProduct) {
          return res.json({ Product: singleProduct });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pCategory: catId })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Search product wrong" });
      }
    }
  }

  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pPrice: { $lt: price } })
          .populate("pCategory", "cName")
          .sort({ pPrice: -1 });
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let wishProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (wishProducts) {
          return res.json({ Products: wishProducts });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (cartProducts) {
          return res.json({ Products: cartProducts });
        }
      } catch (err) {
        return res.json({ error: "Cart product wrong" });
      }
    }
  }

  async postAddReview(req, res) {
    try {
        let { pId, uId, rating, review } = req.body;
        
        // Validasi field yang diperlukan untuk ulasan
        if (!pId || !rating || !review || !uId) {
            return res.status(400).json({ error: "Semua bidang harus diisi: pId, uId, rating, review" });
        }

        let checkReviewRatingExists = await productModel.findOne({ _id: pId });

        if (!checkReviewRatingExists) {
            return res.json({ error: "Produk tidak ditemukan" });
        }

        const alreadyReviewed = checkReviewRatingExists.pRatingsReviews.some(item => item.user === uId);

        if (alreadyReviewed) {
            return res.json({ error: "Anda sudah memberikan ulasan untuk produk ini" });
        }

        checkReviewRatingExists.pRatingsReviews.push({
            review: review,
            user: uId,
            rating: rating,
        });

        await checkReviewRatingExists.save();

        return res.json({ success: "Terima kasih atas ulasannya" });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Kesalahan server internal" });
    }
}

async deleteReview(req, res) {
  const { rId, pId } = req.body;
  if (!rId || !pId) {
    return res.status(400).json({ error: "Both review ID and product ID are required" });
  }
  
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      pId,
      { $pull: { pRatingsReviews: { _id: rId } } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ success: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
}

const productController = new Product();
module.exports = productController;