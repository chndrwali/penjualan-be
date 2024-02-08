const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAdmin } = require("../middleware/auth");

router.post("/isadmin", isAdmin, authController.isAdmin);
router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/all-user", loginCheck, isAdmin, authController.allUser);

module.exports = router;
