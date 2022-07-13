const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

const { objectValue, nameRegex, keyValue, isValidTitle, mobileRegex, emailRegex, passwordRegex, pincodeRegex } = require("../middleware/validator"); // IMPORTING VALIDATORS


//-------------------------------------------------------  FIRST API  ---------------------------------------------------------------------\\


// V = Validator 

const createUser = async (req, res) => {
    try {

        let { title, name, email, phone, password, address } = req.body  // Destructuring

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })  // 3rd V used here

        if (!objectValue(title)) return res.status(400).send({ status: false, msg: "Please enter title!" }) // 2nd V used here

        if (!isValidTitle(title)) return res.status(400).send({ status: false, msg: "Title must be Mr/Mrs/Miss" })  // 5th V used here

        if (!objectValue(name)) return res.status(400).send({ status: false, msg: "Please enter name!" })  // 2nd V used here

        if (!nameRegex(name)) return res.status(400).send({ status: false, msg: "name is invalid!" })  // 4th V used here

        if (!objectValue(phone)) return res.status(400).send({ status: false, msg: "Please enter phone number!" })  // 2nd V used here

        if (!mobileRegex(phone)) return res.status(400).send({ status: false, msg: "phone number is invalid!" })  // 7th V used here

        let duplicatePhone = await userModel.findOne({ phone })        // DB Call

        if (duplicatePhone) return res.status(400).send({ status: false, msg: "phone number is already registered!" }) //Duplicate Validation 

        if (!objectValue(email)) return res.status(400).send({ status: false, msg: "Please enter email!" })   // 2nd V used here

        if (!emailRegex(email)) return res.status(400).send({ status: false, msg: "email is invalid!" })    // 6th V used here

        let duplicateEmail = await userModel.findOne({ email })

        if (duplicateEmail) return res.status(400).send({ status: false, msg: "email is already registered!" })  // Duplicate Validation

        if (!objectValue(password)) return res.status(400).send({ status: false, msg: "Please enter password!" })  // 2nd V used here

        if (!passwordRegex(password)) return res.status(400).send({ status: false, msg: "Password must be 8 to 15 characters long and must be in alphabets and numbers!" })                      // 8th V used here

        if (address) {              // Nested If used here
            if (!keyValue(address)) return res.status(400).send({ status: false, msg: "Please enter your address!" })   // 3rd V used here

            if (req.body.address.street || req.body.address.street === "") {
                if (!objectValue(req.body.address.street)) return res.status(400).send({ status: false, msg: "Please enter your street!" }) // 2nd V used here
            }

            if (req.body.address.city || req.body.address.city === "") {
                if (!objectValue(req.body.address.city)) return res.status(400).send({ status: false, msg: "Please enter your city!" }) 
                // 2nd V used above
            }

            if (req.body.address.pincode || req.body.address.pincode === "") {
                if (!pincodeRegex(req.body.address.pincode)) return res.status(400).send({ status: false, msg: "pincode is invalid!" }) 
                // 2nd V used above
            }
        }

        const userCreation = await userModel.create(req.body)

        res.status(201).send({ status: true,  message: 'Success', data: userCreation })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

//-------------------------------------------------------  SECOND API  ---------------------------------------------------------------------\\

const loginUser = async function (req, res) {
    try {
        let { email, password } = req.body  // Destructuring

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide email and password!" })  // 3rd V used here

        if (!email) return res.status(400).send({ status: false, msg: "email is not correct!" })    // Email Validation
        if (!password) return res.status(400).send({ status: false, msg: "password is not correct!" })   // Passsword Validation

        let user = await userModel.findOne({ email: email, password: password })    // DB Call

        if (!user) { return res.status(404).send({ status: false, msg: "email or the password is invalid!" }) }


        let token = jwt.sign(                         // JWT Creation
            {
                userId: user._id.toString(),
                group: "sixty-six",                                      // Payload
                project: "BooksManagement",
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 48 * 60 * 60
            },
            "group66-project3"              // Secret Key 
        )
        
        return res.status(201).send({ status: true, data: token })
    }
    catch (err) {
        console.log("This is the error:", err.message)
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = { createUser, loginUser }  // Destructuring & Exporting