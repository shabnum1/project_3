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

        const duplicateMobile = await internModel.findOne({ email })

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

const getCollegeDetails = async (req,res) => {
    try {
        const collegeName = req.query.collegeName

        if (Object.keys(req.query).length === 0) return res.status(400).send({ status: false, msg: "All fields are empty!" })

        if (!collegeName)  return res.status(400).send({ status: false, msg: "Key college name is not correct!" })

       {if (collegeName || collegeName===""){
         if (!collegeController.objectValue(collegeName)) return res.status(400).send({ status: false, msg: "Please enter the college name in anabbreviated form!" })
}}

        let intern = [] 

        let anabbreviatedCollege = await collegeModel.findOne({ name: collegeName }).select({_id:1})

        let allintern = await internModel.find({collegeId:anabbreviatedCollege})

        intern.push(allintern)

        return res.status(200).send({ status: true, data: anabbreviatedCollege + `intern: ${intern}` })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }


}

module.exports = { createIntern, getCollegeDetails }