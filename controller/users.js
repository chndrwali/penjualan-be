const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class UserController {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
    try {
      const { name, email, password, userRole, phoneNumber } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        userRole,
        phoneNumber,
      });
      await newUser.save();
      return res.json({ success: "User created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All fields must be required" });
    } else {
      try {
        let currentUser = await userModel.findByIdAndUpdate(uId, {
          name: name,
          phoneNumber: phoneNumber,
          updatedAt: Date.now(),
        });
        if (currentUser) {
          return res.json({ success: "User updated successfully" });
        } else {
          return res.json({ error: "User not found" });
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Internal server error" });
      }
    }
  }

  async getDeleteUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
        return res.json({ message: "User ID must be required" });
    } else {
        try {
            let deletedUser = await userModel.findByIdAndDelete(oId);
            if (deletedUser) {
                return res.json({ success: "User deleted successfully" });
            } else {
                return res.json({ error: "Failed to delete user" });
            }
        } catch (err) {
            console.log(err);
            return res.json({ error: "Internal server error" });
        }
    }
}


  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All fields must be required" });
    } else {
      try {
        const data = await userModel.findById(uId);
        if (!data) {
          return res.json({ error: "Invalid user" });
        } else {
          const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
          if (oldPassCheck) {
            newPassword = bcrypt.hashSync(newPassword, 10);
            let passChange = await userModel.findByIdAndUpdate(uId, {
              password: newPassword,
            });
            if (passChange) {
              return res.json({ success: "Password updated successfully" });
            } else {
              return res.json({ error: "Failed to update password" });
            }
          } else {
            return res.json({
              error: "Your old password is wrong!!",
            });
          }
        }
      } catch (err) {
        console.log(err);
        return res.json({ error: "Internal server error" });
      }
    }
  }  
}

const userController = new UserController();
module.exports = userController;
