const collegeModel = require("../models/collegeModel");
const axios = require('axios')
const { urlRegex, objectValue, nameRegex, collegeRegex, keyValue } = require("../middleware/validator")

const createCollege = async (req, res) => {
    try {
        const { name, fullName, logoLink, isDeleted } = req.body

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "All fields are empty!" })

        if (!objectValue(name)) return res.status(400).send({ status: false, msg: "name is required!" })

        if (!nameRegex(name)) return res.status(400).send({ status: false, msg: "name must be in alphabet and atleast of 2 characters!" })

        const duplicateName = await collegeModel.findOne({ name })

        if (duplicateName) return res.status(400).send({ status: false, msg: "This college name is already used!" })

        if (!collegeRegex(fullName)) return res.status(400).send({ status: false, msg: "College full name must be in characters and of atleast 5 characters long!" })

        if (!objectValue(fullName)) return res.status(400).send({ status: false, msg: "fullName is required!" })

        if (!objectValue(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required!" })

        if (!urlRegex(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is invalid!" })

        let validLogolink = false
        await axios.get(logoLink)
            .then((url) => {
                if (url.status === 200 || 201) {
                    if (url.headers["content-type"].startsWith("image/"))
                        validLogolink = true;
                }
            })
            .catch((error) => validLogolink = false)

        if (validLogolink === false) return res.status(404).send({ status: false, msg: "either logo link is incorrect or does not exist!" })

        if (isDeleted === "") {
            if (!objectValue(isDeleted)) return res.status(400).send({ status: false, msg: "isDeleted is invalid!" })
        }

        if (isDeleted && typeof isDeleted !== "boolean") return res.status(400).send({ status: false, msg: "isDeleted should be either true or false!" })

        const collegeCreaation = await collegeModel.create(req.body)

        const college = await collegeModel.findOne({ name }).select({ _id: 0, __v: 0 })


        res.status(201).send({ status: true, data: college })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports = { createCollege }