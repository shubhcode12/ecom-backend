const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
require('dotenv').config();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", authRouter)

let client;
let responce;
let catResponce;
let adminResponce;
let usersResponce;

async function connect() {
    try {
        client = new MongoClient(process.env.DB_URI);
        console.log('connected to MongoDb');      

    } catch (err) {
        console.error(err);
    }
}


connect();

const database = client.db('ecom_products');
const restaurants = database.collection('products');
const categories = database.collection('categories');
const admins = database.collection('admin');
const cart = database.collection('cart');
let users = database.collection('users');

app.post("/test", cors(), async (req, res) => {
    res.send(`hello : ${req.body.name}`);
});

app.post("/cart", cors(), (req, res) => {
    const productIdParam = req.query.productId;
    res.send(`added to cart : ${productIdParam}`);

});

app.post("/adminLogin", cors(), async (req, res) => {
    adminResponce = await admins.find({}).toArray();

    if (req.body.email == adminResponce[0]['email'] && req.body.password == adminResponce[0]['password']) {
        res.json({
            status: "ok",
            message: "Login succsessfully done"
        })
    } else {
        res.json({
            status: "failed",
            message: "Login failed"
        })
    }

});

app.post("/userLogin", cors(), (req, res) => {

    if (req.body.email == usersResponce[0]['email'] && req.body.password == usersResponce[0]['password']) {
        res.json({
            status: "ok",
            message: "User Logged in succsessfully "
        })
    } else {
        res.json({
            status: "failed",
            message: "User Login failed"
        })
    }

});

app.post("/userSignup", async (req, res) => {

    try {
        const newUserData = {
            "name": req.body.name,
            "address": req.body.address,
            "company": req.body.company,
            "email": req.body.email,
            "phone": req.body.phone,
            "password": req.body.password
        };
        const result = await users.insertOne(newUserData);
        console.log(`A user was inserted with the _id: ${result.insertedId}`,);
        res.json({
            status: "ok",
            message: "User Signup succsessfully "
        })
    } catch (e) {
        console.log(e);
        res.json({
            status: "failed",
            message: "User Signup failed"
        });
    }

});


app.get('/', (req, res) => {
    res.send('API Working fine')
});

app.get('/products',async (req, res) => {
    responce = await restaurants.find({}).toArray();
    res.send(responce);
});

app.get('/categories', async (req, res) => {
    catResponce = await categories.find({}).toArray();
    res.send(catResponce);
});

app.get('/users', async (req, res) => {
    usersResponce = await users.find({}).toArray();
    res.send(usersResponce);
});


app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
});
