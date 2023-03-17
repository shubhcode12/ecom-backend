const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");


const signUp = async (req, res) => {
    const { name, address, company, email, phone, password } = req.body;
    if (!name || !address || !company || !email || !phone || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }


    const userData = {
        name,
        address,
        company,
        email,
        phone,
        password,
    };

    const user = await User.findOne({ email });
    if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "User already registered",
        });
    } else {
        User.create(userData).then((data, err) => {
            if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
            else
                res
                    .status(StatusCodes.CREATED)
                    .json({ message: "User created Successfully" });
        });
    }
};

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });

        }

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (user.authenticate(req.body.password)) {

                const { _id, name, address, company, email, phone } = user;
                res.status(StatusCodes.OK).json({
                    user: { _id, name, address, company, email, phone, },
                });
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Something went wrong!",
                });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist..!",
            });
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

module.exports = { signUp, signIn };