const express = require("express")
const route = express.Router();
const collegeController = require("../controllers/userController");
const internController = require("../controllers/booksController");

route.post("/functionup/colleges" , collegeController.createCollege)

route.post("/functionup/interns" , internController.createIntern)

route.get("/functionup/collegeDetails" , internController.getCollegeDetails)

module.exports = route
