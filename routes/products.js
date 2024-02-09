const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/all-product", productController.getAllProduct);
router.post("/product-by-category", productController.getProductByCategory);
router.post("/product-by-price", productController.getProductByPrice);
router.post("/wish-product", productController.getWishProduct);
router.post("/cart-product", productController.getCartProduct);

router.post("/add-product", upload.array("images", 2), productController.postAddProduct);
router.put("/edit-product", productController.postEditProduct);
router.delete("/delete-product", productController.getDeleteProduct);
router.post("/single-product", productController.getSingleProduct);

router.post("/add-review", productController.postAddReview);
router.post("/delete-review", productController.deleteReview);

module.exports = router;
