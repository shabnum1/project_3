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

    const { name, fullName, logoLink } = req.body

    if (!objectValue(name)) return res.status(400).send({ status: false, msg: "Name is required!" })
    if (!objectValue(fullName)) return res.status(400).send({ status: false, msg: "fullName is required!" })
    if (!objectValue(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required!" })


}







