const express = require("express");
const router = express.Router();
const customizeController = require("../controller/customize");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customize");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", customizeController.getImages);
router.delete("/delete-slide-image/:id", customizeController.deleteSlideImage);
router.post(
  "/upload-slide-image",
  upload.single("slideImage"),
  customizeController.uploadSlideImage
);
router.get("/dashboard-data", customizeController.getAllData);

module.exports = router;
