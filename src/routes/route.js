const express = require("express")
const route = express.Router();
const userController = require("../controllers/userController");
const booksController = require("../controllers/booksController");
const middleware = require("../middleware/auth")
// const internController = require("../controllers/booksController");

route.post("/register" , userController.createUser)

route.post("/login" , userController.loginUser)

route.post("/books" ,middleware.authenticate,middleware.authorisation, booksController.createbooks)

route.get("/books" ,middleware.authenticate, booksController.getBooks)

// route.get("/functionup/collegeDetails" , internController.getCollegeDetails)

module.exports = route
