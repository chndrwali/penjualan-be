const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.get("/all-user", usersController.getAllUser);
router.post("/single-user", usersController.getSingleUser);

router.post("/add-user", usersController.addUser);
router.put("/edit-user", usersController.editUser); // Mengubah metode HTTP menjadi PUT
router.put("/delete-user", usersController.deleteUser); // Mengubah metode HTTP menjadi PUT

router.put("/change-password", usersController.changePassword); // Mengubah metode HTTP menjadi PUT

module.exports = router;
