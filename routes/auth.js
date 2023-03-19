const express = require("express");
const router = express.Router();
const { signUp, signIn , adminSignin } = require("../controller/authController");
const User = require("../models/user.model");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");


router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);

router.route("/signin/admin").post(validateSignIpRequest, isRequestValidated, adminSignin);

module.exports = router;