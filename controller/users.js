const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class User {
  async getAllUser(req, res) {
    try {
      let users = await userModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
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

  async postAddUser(req, res) {
    const { allProduct, user, amount, transactionId, address, phone } = req.body;
    try {
      const newUser = new userModel({
        allProduct,
        user,
        amount,
        transactionId,
        address,
        phone,
      });
      await newUser.save();
      return res.json({ success: "User created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async postEditUser(req, res) {
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

  async getDeleteUser(req, res) {
    const { oId, status } = req.body;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(oId, {
        status,
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

  async changePassword(req, res) {
    const { uId, oldPassword, newPassword } = req.body;
    try {
      const user = await userModel.findById(uId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const oldPassCheck = await bcrypt.compare(oldPassword, user.password);
      if (!oldPassCheck) {
        return res.json({ error: "Your old password is wrong!!" });
      }
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      await userModel.findByIdAndUpdate(uId, { password: hashedNewPassword });
      return res.json({ success: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const userController = new User();
module.exports = userController;
