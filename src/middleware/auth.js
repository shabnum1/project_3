const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");
const mongoose = require('mongoose');

//======================================================1st Middleware===================================================================//

const authenticate = function (req, res, next) {
    try {
        let token = req.headers["X-api-key"];
        if (!token) token = req.headers["x-api-key"];
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
        console.log(token);

        let decodedToken = jwt.decode(token);
        if (decodedToken) {
            try {
                jwt.verify(token, "group66-project3")
                next()
            }
            catch (err) {
                return res.status(400).send({ status: false, msg: err.message })
            }
        }
        else return res.status(400).send({ status: false, msg: "token is invalid" });

    }
    catch (err) {
        console.log("This is the error:", err.message)
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { authenticate }