const express = require("express")
const route = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middleware/auth")
// const internController = require("../controllers/booksController");

route.post("/register" , userController.createUser)

route.post("/login" , userController.loginUser)

// route.get("/functionup/collegeDetails" , internController.getCollegeDetails)

module.exports = route
