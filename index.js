const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
require('dotenv').config();
const cors = require("cors");

var corsOptions = {

    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);


app.get('/', (req, res) => {
    res.send('API Working fine')
});


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);

        app.listen(process.env.PORT, () => {
            console.log(`server started on port ${process.env.PORT}`)
        });
    } catch (err) {
        console.log(err)
    }

}

start();

