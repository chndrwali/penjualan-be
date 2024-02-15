const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck } = require("../middleware/auth");

router.post("/isadmin", authController.isAdmin);
router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/user", loginCheck, authController.allUser);

module.exports = router;