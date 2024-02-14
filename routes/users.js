const express = require("express");
const router = express.Router();
const userController = require("../controller/users");

router.get("/all-user", userController.getAllUser);
router.post("/single-user", userController.getSingleUser);

router.post("/add-user", userController.postAddUser); // Mengubah metode HTTP menjadi POST
router.put("/edit-user", userController.postEditUser); // Mengubah metode HTTP menjadi PUT
router.put("/delete-user", userController.getDeleteUser); // Mengubah metode HTTP menjadi PUT

router.put("/change-password", userController.changePassword); // Mengubah metode HTTP menjadi PUT

module.exports = router;
