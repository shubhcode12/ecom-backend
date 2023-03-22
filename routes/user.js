const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Review = require("../models/review.model");

// Users listing api
router.route("/users").get(async function (req , res){
    const result = await User.find();
    res.json(result)
});

// Riviews list api
router.route("/reviews").get(async function(req , res){
    const result = await Review.find();
    res.json(result); 
})

module.exports = router;
