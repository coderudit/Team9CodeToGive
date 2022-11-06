// Author: Anuj Dev (B00900887)

const express = require("express");
const {
  registrationValidationRules,
  loginValidationRules,
  validateRequest,
} = require("../utils/userValidation");

const router = express.Router();
const {
  userRoot,
  registerUser,
  loginUser,
  isUserVerified,
  userProfile,
} = require("../controllers/userController");

// Base Route
router.get("/", userRoot);

// Register App User Route

router.post(
  "/userRegistration",
  registrationValidationRules(),
  validateRequest,
  registerUser
);

// Login Super Admin Route

router.post("/userLogin", loginValidationRules(), validateRequest, loginUser);

// Profile Route
router.get("/userProfile", isUserVerified, userProfile);

module.exports = router;
