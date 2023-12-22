const userModel = require('../models/userModel');
const hashPassword = require('../helpers/hashPassword');
const comparePasswords = require('../helpers/comparePasswords');
const jwt = require('jsonwebtoken')
var config = require('../config/authConfig')

exports.signup = async (req, res) => {
    try {
        ///// check email id
        let user = await userModel.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({
                error: true,
                message: "Email ID is already in use",
            });
        }

        ///// check mobile id
        let mobile = await userModel.findOne({
            mobile: req.body.mobile,
        });

        if (mobile) {
            return res.status(400).json({
                error: true,
                message: "Mobile Number is already in use",
            });
        }

        const hashedPassword = await hashPassword(req.body.password);

        user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile,
            user_type_id: req.body.user_type_id
        });

        const result = await user.save();
        if (result) {
            let payload = { id: result._id, user_type_id: req.body.user_type_id || 0 };
            // const token = jwt.sign(payload, 'secretKey');
            const token = jwt.sign(payload, config.secret, {
                expiresIn: config.expireTime // expires in 24 hours
            });
            res.status(200).json({
                token: token,
                success: true,
                id: result._id
            })
        } else {
            console.log("err")
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Cannot Sign up",
        });
    }
}

exports.login = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Account not found"
            })
        }
        const isValid = await comparePasswords(req.body.password, user.password);
        if (!isValid) {
            return res.status(400).json({
                error: true,
                message: "Invalid password"
            })
        }
        let payload = { id: user._id, user_type_id: user.user_type_id };
        // const token = jwt.sign(payload, 'secretKey');
        const token = jwt.sign(payload, config.secret, {
            expiresIn: config.expireTime // expires in 24 hours
        });

        res.status(200).header("auth-token", token).json(
            {
                "token": token,
                success: true,
                message: "User logged in successfully"
            },

        );
        // res.status(200).header("auth-token", token).send(
        //     {
        //         "token": token,
        //     },

        // );

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Cannot Sign in",
        });
    }
}
