const jwt = require('jsonwebtoken');
const config = require('../config/authConfig')
exports.verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            error: "Access Denied / Unauthorized request"
        })
    }
    try {
        token = token.split(' ')[1];
        if (token === 'null' || !token) {
            return res.status(401).send({
                error: 'Unauthorized request'
            });
        }
        // let verifiedUser = jwt.verify(token, 'secretKey');
        let verifiedUser = jwt.verify(token, config.secret);
        if (!verifiedUser) return res.status(401).send({
            error: 'Unauthorized request'
        })
        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (err) {
        res.status(400).json({
            error: true,
            message: "Invalid Token"
        })
    }
}

exports.IsUser = async (req, res, next) => {
    if (req.user.user_type_id === 0) {
        next();
    } else {
        return res.status(401).send("Unauthorized!");

    }
}

exports.IsAdmin = async (req, res, next) => {
    if (req.user.user_type_id === 1) {
        next();
    } else {
        return res.status(401).send("Unauthorized!");

    }
}

exports.IsGardener = async (req, res, next) => {
    if (req.user.user_type_id === 2) {
        next();
    } else {
        return res.status(401).send("Unauthorized!");

    }
}

