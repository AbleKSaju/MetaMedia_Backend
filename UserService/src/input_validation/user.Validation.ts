import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .isEmail()
    .withMessage("Email must be in email format"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
];

export const validateOtp = [
  body("otp")
    .notEmpty()
    .isLength({ min: 4, max: 4 })
    .withMessage("Otp is required"),
];


export const validateLogin=[
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .isEmail()
    .withMessage("Email must be in email format"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
]


export const validateGoogleLogin=[
 
  body('profile')
  .isString()
  .notEmpty()
  .withMessage("Profile picture is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .isEmail()
    .withMessage("Email must be in email format"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("isGoogle")
    .isBoolean()
    .withMessage("isGoogle must be a boolean"),
  body("isFacebook")
    .isBoolean()
    .withMessage("isFacebook must be a boolean")
]