const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.route("/checkout").post(async function (req, res) {

    const product = await Product.findById(req.body.productId);
    if (!product) {
        res.status(404).send({ message: 'Products Not found.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: product.name,
                            images: [product.images[0]],
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `https://google.com`,
            cancel_url: `https://google.com`,
        });

        res.json({ session });

    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }

});

module.exports = router;