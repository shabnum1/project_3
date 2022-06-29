const mongoose = require("mongoose");
const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const collegeController = require("../controllers/collegeController")


const createIntern = async (req, res) => {

    try {

        const { name, email, mobile, collegeId } = req.body

        if (Object.keys(req.body).length === 0) return res.status(400).send({ status: false, msg: "All fields are empty!" })

        if (!collegeController.objectValue(name)) return res.status(400).send({ status: false, msg: "name is required!" })

        let nameRegex = /^[A-Za-z\s]{1,}[\]{0,1}[A-Za-z\s]{2,}$/;

        if (!nameRegex.test(name)) return res.status(400).send({ status: false, msg: "name must be in alphabet and atleast of 2 characters!" })

        if (!collegeController.objectValue(email)) return res.status(400).send({ status: false, msg: "email is required!" })

        let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

        if (!emailRegex.test(email)) return res.status(400).send({ status: false, msg: "email is invalid!" })

        const duplicateEmail = await internModel.findOne({ email })

        if (duplicateEmail) return res.status(400).send({ status: false, msg: "This email is already used!" })

        if (!collegeController.objectValue(mobile)) return res.status(400).send({ status: false, msg: "mobile number is required!" })

        let mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

        if (!mobileRegex.test(mobile)) return res.status(400).send({ status: false, msg: "mobile number is invalid!" })

        const duplicateMobile = await internModel.findOne({ mobile })

        if (duplicateMobile) return res.status(400).send({ status: false, msg: "This mobile number is already used!" })

        if (!collegeController.objectValue(collegeId)) return res.status(400).send({ status: false, msg: "collegeId is required!" })

        if (!collegeController.isValidObjectId(collegeId)) return res.status(400).send({ status: false, msg: "This collegeId is invalid!" })

        const validCollegeId = await collegeModel.findOne({ collegeId, isDeleted: false })

        if (!validCollegeId) return res.status(400).send({ status: false, msg: "This collegeId is not present in the Database!" })

        const intern = await internModel.create(req.body)

        res.status(201).send({ status: true, data: intern })
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

const getCollegeDetails = async (req, res) => {
    try {

        const data = req.query.collegeName;

        if (!data) return res.status(400).send({ status: false, msg: 'please enter key as collegeName and define some value' });

        const college = await collegeModel.findOne({ name: data });

        if (!college) return res.status(404).send({ status: false, msg: 'no such college present!' })

        const intern = await internModel.find({ collegeId: college._id, isDeleted: false });

        if (Object.keys(intern).length === 0) return res.status(404).send({ status: false, msg: `${data} does not have any intern` });

        res.status(200).send({ status: true, data: { name: college.name, fullName: college.fullName, logoLink: college.logoLink, interns: intern } })

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = { createIntern, getCollegeDetails }