const express = require("express")
const route = express.Router();
const userController = require("../controllers/userController");
const booksController = require("../controllers/booksController");
const reviewController = require("../controllers/reviewController");
const middleware = require("../middleware/auth")
// const internController = require("../controllers/booksController");

route.post("/register" , userController.createUser)

route.post("/login" , userController.loginUser)

route.post("/books" ,middleware.authentication,middleware.authorization, booksController.createBooks)

route.get("/books" ,middleware.authentication, booksController.getBooks)

route.get("/books/:bookId" , booksController.getBooksbyId)

route.put("/books/:bookId" ,middleware.authentication, booksController.updateBooks)

route.delete("/books/:bookId" ,middleware.authentication, booksController.deleteBooksbyId)

route.post("/books/:bookId/review" , reviewController.createReviews)

// route.get("/functionup/collegeDetails" , internController.getCollegeDetails)

module.exports = route
