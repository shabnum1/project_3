const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

const { objectValue, nameRegex, emailRegex, keyValue, mobileRegex } = require("../middleware/validator")

const createIntern = async (req, res) => {

    try {

        const {isDeleted, name, email, mobile, collegeName } = req.body

        if (isDeleted === ""){
            if (!objectValue(isDeleted)) return res.status(400).send({ status: false, msg: "isDeleted is invalid!" })}
   
           if (isDeleted && typeof isDeleted !== "boolean") return res.status(400).send({status: false, msg: "isDeleted should be either true or false!"})

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "All fields are empty!" })

        if (!objectValue(name)) return res.status(400).send({ status: false, msg: "name is required!" })

        if (!nameRegex(name)) return res.status(400).send({ status: false, msg: "name must be in alphabet and atleast of 2 characters!" })

        if (!objectValue(email)) return res.status(400).send({ status: false, msg: "email is required!" })

        if (!emailRegex(email)) return res.status(400).send({ status: false, msg: "email is invalid!" })

        const duplicateEmail = await internModel.findOne({ email })

        if (duplicateEmail) return res.status(400).send({ status: false, msg: "This email is already used!" })

        if (!objectValue(mobile)) return res.status(400).send({ status: false, msg: "mobile number is required!" })

        if (!mobileRegex(mobile)) return res.status(400).send({ status: false, msg: "mobile number is invalid!" })

        const duplicateMobile = await internModel.findOne({ mobile })

        if (duplicateMobile) return res.status(400).send({ status: false, msg: "This mobile number is already used!" })

        if (!objectValue(collegeName)) return res.status(400).send({ status: false, msg: "collegeName is required!" })

        const validCollegeId = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!validCollegeId) return res.status(404).send({ status: false, msg: `There is no such college present with the name ${collegeName} in the Database!` })

        let collegeId = validCollegeId._id

        const collegeData = { name, email, mobile, collegeId }

        const internCreation = await internModel.create(collegeData)

        return res.status(201).send({
            status: true,
            data: {
                isDeleted: collegeData.isDeleted,
                name: collegeData.name,
                email: collegeData.email,
                mobile: collegeData.mobile,
                collegeId: collegeData.collegeId
            }
        })
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

const getCollegeDetails = async (req, res) => {
    try {
        const data = req.query.collegeName;
        if (!data)
            return res.status(400).send({ status: false, msg: 'please enter key as collegeName and define some value!' });

        const college = await collegeModel.findOne({ name: data });

        if (!college) return res.status(404).send({ status: false, msg: 'no such college present!' })

        const intern = await internModel.find({ collegeId: college._id, isDeleted: false }).select({ collegeId: 0, __v: 0, isDeleted: 0 })

        if (!keyValue(intern)) return res.status(404).send({ status: false, msg: `${data} does not have any interns!` });

        res.status(200).send({ status: true, data: { name: college.name, fullName: college.fullName, logoLink: college.logoLink, interns: intern } })

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = { createIntern, getCollegeDetails }