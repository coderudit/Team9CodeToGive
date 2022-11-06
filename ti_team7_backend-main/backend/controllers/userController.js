// Author: Anuj Dev (B00900887)

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users/users");
const passport = require("passport");
const { response } = require("express");

//User Root
const userRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    res
      .status(200)
      .json({ message: "Welcome to User Management Module", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

//User registration of app-user

const registerUser = async (req, res) => {
  await userRegistration(req.body, res);
};

//User Login of app-user

const loginUser = async (req, res) => {
  await userLogin(req.body, res);
};

// User Registration with different Roles
const userRegistration = async (user, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    let EmailExists = await isEmailExists(user.email);
    if (EmailExists) {
      return res.status(400).json({
        message: "Email is already taken",
        success: false,
      });
    }
    const password = await bcrypt.hash(user.password, Number(10));
    const userObj = {
      ...user,
      password,
    };
    users.create(userObj);
    return res.status(200).json({
      ...response,
      message: "User Added successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

// User Registration with different Roles
const userLogin = async (user, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    const userExist = await users.findOne({
      email: user.email,
    });
    if (!userExist) {
      return res.status(400).json({
        message: "Email Does not Exist with this Email",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userExist.password
    );

    if (isPasswordCorrect) {
      jwtPayload = {
        id: userExist.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
      };
      let token = jwt.sign(jwtPayload, "HappyPlace", { expiresIn: "1h" });
      let response = {
        id: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        phoneNumber: userExist.phoneNumber,
        token: `Bearer ${token}`,
        expiresIn: 1,
      };
      return res.status(200).json({
        ...response,
        message: "Logged In successfully!",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Password is Invalid",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

// Check if Email Exists
const isEmailExists = async (email) => {
  let user = await users.findOne({
    email: email,
  });
  if (user) return true;
  else return false;
};

/**
 * @DESC middleware for authentication
 */

const isUserVerified = passport.authenticate("jwt", { session: false });

// User Profile Controller

const userProfile = async (req, res) => {
  try {
    const user = req.user;
    res.setHeader("Content_type", "application/json");
    let userData = {
      user_id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
    res.status(200).json({
      message: "User Fetched Successfully",
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getUserById = async (user_id) => {
  return await users.findByPk(user_id);
};

module.exports = {
  userRoot,
  registerUser,
  loginUser,
  isUserVerified,
  userProfile,
};
