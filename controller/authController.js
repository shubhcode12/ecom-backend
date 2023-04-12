const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const { default: mongoose } = require("mongoose");
const Company = require("../models/company.model");


const signUp = async (req, res) => {
    const { name, address, company, email, phone, password } = req.body;
    if (!name || !address || !company || !email || !phone || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }


    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        address: req.body.address,
        company: req.body.company,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    });
    
    user.save().then((result) => {
        res
            .status(200)
            .json({ newUser: result });

    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
};

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });

        }

        User.findOne({
            email: req.body.email,
        }).then((user) => {

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            if (req.body.password != user.password) {
                return res.status(401).send({ message: "Invalid Password!" });
            }else{
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    address: user.address,
                    company: user.company,
                    email: user.email,
                    phone: user.phone,                
                });
            }

        }).catch((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

const adminSignin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });

        }

        Admin.findOne({
            email: req.body.email,
        }).then((admin) => {

            if (!admin) {
                return res.status(404).send({ message: "Admin Not found." });
            }

            if (req.body.password != admin.password) {
                return res.status(401).send({ message: "Invalid Password!" });
            }else{
                res.status(200).json({
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,                              
                });
            }

        }).catch((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
}

const companySignin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });

        }

        Company.findOne({
            email: req.body.email,
        }).then((result) => {

            if (!result) {
                return res.status(404).send({ message: "Company Not found." });
            }

            if (req.body.password != result.password) {
                return res.status(401).send({ message: "Invalid Password!" });
            }else{
                res.status(200).json({
                    _id: result._id,
                    name: result.name,
                    email: result.email,                              
                });
            }

        }).catch((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
}

module.exports = { signUp, signIn, adminSignin, companySignin };