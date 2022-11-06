// Author: Anuj Dev (B00900887)

const { body, validationResult, param } = require("express-validator");

const registrationValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Full Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("First name should be between 2 and 20 characters"),
    body("lastName")
      .notEmpty()
      .withMessage("Full Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("Last name should be between 2 and 20 characters"),
    body("email").notEmpty().withMessage("Email is required").isEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      )
      .withMessage(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
      ),
    body("confirmPassword")
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm Password does not match password");
        }
        return true;
      }),
  ];
};
const loginValidationRules = () => {
  return [
    body("email").notEmpty().withMessage("Email is required").isEmail(),
    body("password").notEmpty().withMessage("Password field is required"),
  ];
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registrationValidationRules,
  loginValidationRules,
  validateRequest,
};
