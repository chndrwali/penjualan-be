/* This all of are helper function */
const userModel = require("../models/users");

exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.validateEmail = function (mail) {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail);
};

exports.emailCheckInDatabase = async function (email) {
  try {
    const user = await userModel.findOne({ email: email });
    return !!user;
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.phoneNumberCheckInDatabase = async function (phoneNumber) {
  try {
    const user = await userModel.findOne({ phoneNumber: phoneNumber });
    return !!user;
  } catch (err) {
    console.error(err);
    return false;
  }
};
