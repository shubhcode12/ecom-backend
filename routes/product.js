const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const { default: mongoose } = require("mongoose");


router.route("/products").get(async function (req , res){
    const result = await Product.find();
    res.json(result)
});

router.route("/products/add").post(async function (req , res){
    const product = new Product ({
        _id : new mongoose.Types.ObjectId, 
        name : req.body.name,
        price : req.body.price,
        images : req.body.images,
        discount : req.body.discount,
        category : req.body.category,
       
    });
    
    product.save().then((result) => {
        res
        .status(200)
        .json({ newProduct: result });
    
    }).catch(err =>{
        res.status(500).json({
            error : err
        })
    });
});


router.route("/category").get(async function (req , res){
    const result = await Category.find();
    res.json(result)
});

router.route("/category/add").post(async function (req , res){
    const category = new Category({
        _id : new mongoose.Types.ObjectId, 
        name : req.body.name,
        img : req.body.img,
    });
    category.save().then((result) => {
        res
        .status(200)
        .json({ newCategory: result });
    
    }).catch(err =>{
        res.status(500).json({
            error : err
        })
    });
});

module.exports = router;
