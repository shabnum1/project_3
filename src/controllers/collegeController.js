const collegeModel = require("../models/collegeModel");
const { objectValue, nameRegex, collegeRegex,  keyValue } = require("../middleware/validator")

const createCollege = async (req, res) => {
    try {
        const { name, fullName, logoLink } = req.body

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "All fields are empty!" })

        if (!objectValue(name)) return res.status(400).send({ status: false, msg: "name is required!" })

        if (!nameRegex(name)) return res.status(400).send({ status: false, msg: "name must be in alphabet and atleast of 2 characters!" })

        const duplicateName = await collegeModel.findOne({ name })

        if (duplicateName) return res.status(400).send({ status: false, msg: "This college name is already used!" })

        if (!collegeRegex(fullName)) return res.status(400).send({ status: false, msg: "College full name must be in characters and of atleast 5 characters long!" })

        if (!objectValue(fullName)) return res.status(400).send({ status: false, msg: "fullName is required!" })

        if (!objectValue(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required!" })

        const collegeCreaation = await collegeModel.create(req.body)
        
        const college = await collegeModel.findOne({name}).select({_id:0,__v:0})


        res.status(201).send({ status: true, data: college })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports = { createCollege }