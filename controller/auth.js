const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    try {
      const { loggedInUserId } = req.body;
      const loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async allUser(req, res) {
    try {
      const allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /* User Registration/Signup controller */
  async postSignup(req, res) {
    try {
      let { name, email, password, cPassword } = req.body;
      let error = {};
      if (!name || !email || !password || !cPassword) {
        error = {
          ...error,
          name: "Field must not be empty",
          email: "Field must not be empty",
          password: "Field must not be empty",
          cPassword: "Field must not be empty",
        };
        return res.status(400).json({ error });
      }
      if (name.length < 3 || name.length > 25) {
        error = { ...error, name: "Name must be 3-25 characters" };
        return res.status(400).json({ error });
      }
      if (!validateEmail(email)) {
        error = { ...error, email: "Invalid email address" };
        return res.status(400).json({ error });
      }
      if (password.length < 8 || password.length > 255) {
        error = { ...error, password: "Password must be 8-255 characters" };
        return res.status(400).json({ error });
      }
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        error = { ...error, email: "Email already exists" };
        return res.status(400).json({ error });
      }
      password = bcrypt.hashSync(password, 10);
      const newUser = new userModel({
        name: toTitleCase(name),
        email,
        password,
        userRole: 1, // Assuming admin role is represented by 1
      });
      await newUser.save();
      return res.status(201).json({
        success: "Account created successfully. Please login.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /* User Login/Signin controller */
  async postSignin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign({ _id: user._id, userRole: user.userRole }, JWT_SECRET);
      return res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

const authController = new Auth();
module.exports = authController;
