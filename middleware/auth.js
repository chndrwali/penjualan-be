const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userDetails = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

exports.isAuth = (req, res, next) => {
  try {
    const { loggedInUserId } = req.body;
    if (!loggedInUserId || loggedInUserId !== req.userDetails._id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const reqUser = await userModel.findById(req.body.loggedInUserId);
    if (!reqUser || reqUser.userRole !== 1) { // Assuming admin role is represented by 1
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
