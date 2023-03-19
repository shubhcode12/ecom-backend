const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.route("/users").get(async function (req , res){
    const result = await User.find();
    res.json(result)
});

module.exports = router;
