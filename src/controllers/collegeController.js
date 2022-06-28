const mongoose = require("mongoose");
const collegeModel = require("../models/collegeModel");
const interModel = require("../models/internModel");

const isValidObjectId = function (objectId) { return mongoose.Types.ObjectId.isValid(objectId) }

const objectValue = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.length === 0) return false
    return true
}

const createCollege = async function (req, res) {
    try {
        const { name, fullName, logoLink } = req.body

        if (Object.keys(req.body).length === 0) return res.status(400).send({ status: false, msg: "All fields are empty!" })

        if (!objectValue(name)) return res.status(400).send({ status: false, msg: "name is required!" })

        let nameRegex = /^[A-Za-z\s]{1,}[\]{0,1}[A-Za-z\s]{0,}$/;

        if (!nameRegex.test(name)) return res.status(400).send({ status: false, msg: "name must be in characters!" })

        const duplicateName = await collegeModel.findOne({ name })

        if (duplicateName) return res.status(400).send({ status: false, msg: "This college name is already used!" })

        let collegeRegex = /^[A-Za-z\s]{1,}[\.,'-]{0,1}[A-Za-z\s]{0,}$/;

        if (!collegeRegex.test(fullName)) return res.status(400).send({ status: false, msg: "College full name must be in characters!" })

        if (!objectValue(fullName)) return res.status(400).send({ status: false, msg: "fullName is required!" })

        if (!objectValue(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required!" })

        const college = await collegeModel.create(req.body)

        res.status(201).send({ status: true, data: college })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports = { createCollege }


