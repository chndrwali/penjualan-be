const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.get("/all-user", usersController.getAllUser);
router.post("/single-user", usersController.getSingleUser); // Perbaikan pada path "/single-user"

router.post("/add-user", usersController.postAddUser);
router.put("/edit-user", usersController.postEditUser); // Mengubah metode HTTP menjadi PUT
router.put("/delete-user", usersController.getDeleteUser); // Mengubah metode HTTP menjadi PUT

router.put("/change-password", usersController.changePassword); // Mengubah metode HTTP menjadi PUT

module.exports = router;
