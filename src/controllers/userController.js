const userModel = require("../models/userModel");

const { urlRegex, objectValue, nameRegex, collegeRegex, keyValue } = require("../middleware/validator"); // IMPORTING VALIDATORS


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<===========================  FIRST API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createUser = async (req, res) => {
    try {
        
     let {title, name, email, phone, password, address } = req.body

     let street = req.body.address.street

     let city = req.body.address.city

     let pincode = req.body.address.pincode

     if (!keyValue(req.body)) return res.status(400).send({status: false, msg: "Please provide details!"})

     if (title || title === "") {
        if (!objectValue(title)) return res.status(400).send({status: false, msg: "Please enter title!"})
     }

       
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports = { createCollege }