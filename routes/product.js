const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Cart = require("../models/cart.model");
const { default: mongoose } = require("mongoose");
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_kKW77dAK7rl81W', key_secret: 'RWZVfsGxojTTEkJhnRc8jbwi' })


// product list api
router.route("/product").get(async function (req, res) {
    try {
        const result = await Product.find();
        if (!result) {
            res.res.status(404).send({ message: `Products Not found.` });
        }
        res.json(result);

    } catch (err) {
        res.json({ error: err });
    }

});

// product search by name api
router.route("/product/", "/:query").get(async function (req, res) {
    try {
        let query = req.query.query;
        const result = await Product.find({ name: query });
        if (!result) {
            res.res.status(404).send({ message: `Products Not found.` });
        }
        res.json(result);

    } catch (err) {
        res.json({ error: err });
    }

});

// product buy api
router.route("/product/buy").post(async function (req, res) {
    const product = await Product.findById(req.body.productId);
    if (!product) {
        res.status(404).send({ message: 'Products Not found.' });
    }
    let price = product.price;
    let r = (Math.random() + 1).toString(36).substring(7);
    const receiptName = "order_rcptid_" + r;
    var options = {
        amount: product.price,  // amount in the smallest currency unit
        currency: "INR",
        receipt: receiptName
    };

    instance.orders.create(options, function (err, order) {
        res.json({
            success: true,
            order: order,
            amount: price
        });
    });

});

// payment verify api
router.post("/payment/verify", (req, res) => {

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'RWZVfsGxojTTEkJhnRc8jbwi')
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { "signatureIsValid": "true" }
    res.send(response);
});

// product category list api
router.route("/product/category").post(async function (req, res) {
    if (!req.body.category) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide Category",
        });
    }
    const result = await Product.find({ 'category': req.body.category });

    if (!result) {
        res.res.status(404).send({ message: `Products from ${req.body.category} Not found.` });
    }
    res.json(result)
});

// new product add api 
router.route("/product/add").post(async function (req, res) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        images: req.body.images,
        discount: req.body.discount,
        category: req.body.category,

    });

    product.save().then((result) => {
        res
            .status(200)
            .json({ newProduct: result });

    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

// product cart list by userId api
router.route("/product/cart").post(async function (req, res) {

    try {
        if (!req.body.userId) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please provide UserId",
            });
        }

        const result = await Cart.find({ 'userId': req.body.userId });
        if (!result) {
            res.res.status(404).send({ message: "Cart Items Not found." });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

// product add to cart by productId & userId api
router.route("/product/addCart").post(async function (req, res) {

    if (!req.body.productId || !req.body.userId) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide product Id & UserId",
        });
    }

    Product.findOne({
        _id: req.body.productId,
    }).then((product) => {

        if (!product) {
            return res.status(404).send({ message: "Product Not found." });
        }

        const cartProduct = new Cart({
            _id: new mongoose.Types.ObjectId,
            productId: product._id,
            userId: req.body.userId,
            quantity: req.body.quantity
        });

        cartProduct.save().then((result) => {
            res
                .status(200)
                .json({ newCart: result });

        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });

    });

});

// category list api
router.route("/category").get(async function (req, res) {
    try {
        const result = await Category.find();
        if (!result) {
            return res.status(404).send({ message: "Categories Not found." });
        }
        res.json(result)
    } catch (err) {
        res.json({ error: err });
    }
});


// add new category by name and image api 
router.route("/category/add").post(async function (req, res) {
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        img: req.body.img,
    });
    category.save().then((result) => {
        res
            .status(200)
            .json({ newCategory: result });

    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.route("/category/", "/:id").delete(async function (req, res) {
    let id = req.query.id;
    if (!id) {
        return res.status(404).send({ message: "Please provide Category Id." });
    }

    try {

        await Category.deleteOne({
            _id: id
        }).then((result) => {
            res.json({
                catDeleted: result
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });

    } catch (err) {
        res.json({
            error: err
        })
    }

});
module.exports = router;
