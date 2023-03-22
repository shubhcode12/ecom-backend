const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Review = require("../models/review.model");
const { default: mongoose } = require("mongoose");

// Users listing api
router.route("/users").get(async function (req , res){
    const result = await User.find();
    res.json(result)
});

// Riviews list api
router.route("/reviews").get(async function(req , res){
    const result = await Review.find();
    res.json(result); 
});

// Add Review by name, role & review Api
router.route("/reviews/add").post(async function (req, res) {
    const review = new Review({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        role: req.body.role,
        review: req.body.review,
    });
    review.save().then((result) => {
        res
            .status(200)
            .json({ newReview: result });

    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});


module.exports = router;
