const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

const { objectValue, nameRegex, keyValue, isValidTitle, mobileRegex, emailRegex, passwordRegex, pincodeRegex } = require("../middleware/validator"); // IMPORTING VALIDATORS


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<===========================  FIRST API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createUser = async (req, res) => {
    try {

        let { title, name, email, phone, password, address } = req.body

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

        if (!objectValue(title)) return res.status(400).send({ status: false, msg: "Please enter title!" })

        if (!isValidTitle(title)) return res.status(400).send({ status: false, msg: "Title must be Mr/Mrs/Miss" })

        if (!objectValue(name)) return res.status(400).send({ status: false, msg: "Please enter name!" })

        if (!nameRegex(name)) return res.status(400).send({ status: false, msg: "name is invalid!" })

        if (!objectValue(phone)) return res.status(400).send({ status: false, msg: "Please enter phone number!" })

        if (!mobileRegex(phone)) return res.status(400).send({ status: false, msg: "phone number is invalid!" })

        let duplicatePhone = await userModel.findOne({ phone })

        if (duplicatePhone) return res.status(400).send({ status: false, msg: "phone number is already registered!" })

        if (!objectValue(email)) return res.status(400).send({ status: false, msg: "Please enter email!" })

        if (!emailRegex(email)) return res.status(400).send({ status: false, msg: "email is invalid!" })

        let duplicateEmail = await userModel.findOne({ email })

        if (duplicateEmail) return res.status(400).send({ status: false, msg: "email is already registered!" })

        if (!objectValue(password)) return res.status(400).send({ status: false, msg: "Please enter password!" })

        if (!passwordRegex(password)) return res.status(400).send({ status: false, msg: "Password must be 8 to 15 characters long!" })

        if (address) {
            if (!keyValue(address)) return res.status(400).send({ status: false, msg: "Please enter your address!" })

            if (req.body.address.street || req.body.address.street === "") {
                if (!objectValue(req.body.address.street)) return res.status(400).send({ status: false, msg: "Please enter your street!" })
            }

            if (req.body.address.city || req.body.address.city === "") {
                if (!objectValue(req.body.address.city)) return res.status(400).send({ status: false, msg: "Please enter your city!" })
            }

            if (req.body.address.pincode || req.body.address.pincode === "") {
                if (!pincodeRegex(req.body.address.pincode)) return res.status(400).send({ status: false, msg: "pincode is invalid!" })
            }
        }

        const userCreation = await userModel.create(req.body)

        res.status(201).send({ status: true, data: userCreation })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  SECOND API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const loginUser = async function (req, res) {
    try {
        let { email, password } = req.body

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide email and password!" })

        if (!email) return res.status(400).send({ status: false, msg: "email is not correct!" })
        if (!password) return res.status(400).send({ status: false, msg: "password is not correct!" })

        let user = await userModel.findOne({ email: email, password: password })

        if (!user) { return res.status(404).send({ status: false, msg: "email or the password is invalid!" }) }


        let token = jwt.sign(
            {
                userId: user._id.toString(),
                group: "sixty-six",
                project: "BooksManagement",
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
            },
            "group66-project3"
        )
        return res.status(201).send({ status: true, data: token })
    }
    catch (err) {
        console.log("This is the error:", err.message)
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = { createUser, loginUser }