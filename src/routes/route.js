const express = require("express")
const route = express.Router();
const userController = require("../controllers/userController");
const booksController = require("../controllers/booksController");
const middleware = require("../middleware/auth")
// const internController = require("../controllers/booksController");

route.post("/register" , userController.createUser)

route.post("/login" , userController.loginUser)

route.post("/books" , booksController.createbooks)

route.get("/books" , booksController.getBooks)

route.get("/books/:bookId" , booksController.getBooksbyId)

route.put("/books/:bookId" , booksController.updateBooks)

route.delete("/books/:bookId" , booksController.deleteBooksbyId)

// route.get("/functionup/collegeDetails" , internController.getCollegeDetails)

module.exports = route
