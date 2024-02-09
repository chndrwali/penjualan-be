const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class UserController {
  async getAllUser(req, res) {
    try {
      let users = await userModel
        .find({})
        .sort({ _id: -1 });
      return res.json({ users });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSingleUser(req, res) {
    const { uId } = req.body;
    try {
      const user = await userModel
        .findById(uId)
        .select("name email phoneNumber userImage updatedAt createdAt");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addUser(req, res) {
    const { name, email, password, userRole, phoneNumber } = req.body;
    try {
      const newUser = new userModel({
        name,
        email,
        password,
        userRole,
        phoneNumber,
      });
      await newUser.save();
      return res.json({ success: "User created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async editUser(req, res) {
    const { uId, name, phoneNumber } = req.body;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(uId, {
        name,
        phoneNumber,
        updatedAt: Date.now(),
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ success: "User updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    const { uId } = req.body;
    try {
      const deletedUser = await userModel.findByIdAndDelete(uId);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ success: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async changePassword(req, res) {
    const { uId, oldPassword, newPassword } = req.body;
    try {
      const user = await userModel.findById(uId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const oldPassCheck = await bcrypt.compare(oldPassword, user.password);
      if (!oldPassCheck) {
        return res.status(400).json({ error: "Your old password is wrong!!" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Perubahan di sini
      await userModel.findByIdAndUpdate(uId, { password: hashedNewPassword });
      return res.json({ success: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const userController = new UserController();
module.exports = userController;
