const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const jwt = require("jsonwebtoken");
const { objectValue, keyValue, isValidISBN, isValidArray, numberValue, booleanValue, isValidDate, isValidObjectId } = require("../middleware/validator")  // IMPORTING VALIDATORS

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  THIRD API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createbooks = async (req, res) => {

  try {
    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt, isDeleted, reviews } = req.body

    if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

    if (!objectValue(title)) return res.status(400).send({ status: false, msg: "Please enter title!" })

    let duplicateTitle = await booksModel.findOne({ title })

    if (duplicateTitle) return res.status(400).send({ status: false, msg: "title is already in use!" })

    if (!objectValue(excerpt)) return res.status(400).send({ status: false, msg: "Please enter excerpt!" })

    if (!objectValue(userId)) return res.status(400).send({ status: false, msg: "Please enter userId!" })
    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is invalid!" })

    if (!objectValue(ISBN)) return res.status(400).send({ status: false, msg: "Please enter ISBN number!" })
    if (!isValidISBN(ISBN)) { return res.status(400).send({ status: false, message: 'Please provide a valid ISBN of 13 digits!' }) }

    let duplicateISBN = await booksModel.findOne({ ISBN })

    if (duplicateISBN) return res.status(400).send({ status: false, msg: "ISBN is already registered!" })

    if (!objectValue(category)) return res.status(400).send({ status: false, msg: "Please enter category!" })

    if (!isValidArray(subcategory)) return res.status(400).send({ status: false, msg: "Please enter subcategory!" })

    if (isDeleted === true) return res.status(400).send({ status: false, msg: "isDeleted must be false!" })

    { if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, msg: "Please enter releasedAt in the right format(YYYY-MM-DD)!" }) }

    if (reviews || reviews === "") {
      if (!numberValue(reviews)) return res.status(400).send({ status: false, msg: "Please enter review!" })
    }

    const bookCreation = await booksModel.create(req.body)

    res.status(201).send({ status: true, data: bookCreation })

  }

  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }

}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<=========================== FOURTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const getBooks = async (req, res) => {
  try {
    const userQuery = req.query;
    const filter = { isDeleted: false };
    const { userId, category, subcategory } = userQuery;

    if (!keyValue(userQuery)) return res.status(400).send({ status: false, msg: "Please provide atleast one param!" });

    if (userId) {
      if (!objectValue(userId)) { return res.status(400).send({ status: false, msg: "userId is invalid!" }) }
      if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, msg: "userId is invalid!" }) }
      else { filter["userId"] = userId };
    }
    if (objectValue(category)) { filter["category"] = category.trim() };
    if (objectValue(subcategory)) {
      const subcategoryArray = subcategory.trim().split(",").map((s) => s.trim())
      filter["subcategory"] = { $all: subcategoryArray }
    };

    const bookList = await booksModel.find(filter).select({ title: 1, excerpt: 1, userId: 1, category: 1, review: 1, releasedAt: 1 });

    if (bookList.length === 0) return res.status(400).send({ status: false, msg: "no book found!" })

    const sortedBooks = bookList.sort((a, b) => a.title.localeCompare(b.title))

    res.status(200).send({ status: true, data: sortedBooks })

  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<============================ FIFTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const getBooksbyId = async (req, res) => {

  const bookId = req.params.bookId

  if (!isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "bookId is invalid!" }) }

  const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

  if (!findBooksbyId) {
    return res.status(404).send({ status: false, msg: "Books not found or does not exist!" })
  }

  const reviews = await reviewModel.find({ bookId: bookId })

  res.status(200).send({ status: true, message: 'Books list', data: findBooksbyId, reviewsData: reviews })

}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<============================ SIXTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\


const updateBooks = async function (req, res) {
  try {
    const bookId = req.params.bookId;

    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })

    const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

    if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

    let token = req.headers["x-api-key"]

    let decodedToken = jwt.verify(token, "group66-project3")

    if (findBooksbyId.userId != decodedToken.userId) { return res.status(403).send({ status: false, msg: "not authorized!" }) }

    const { title, excerpt, releasedAt, ISBN } = req.body;

    if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide something to update!" });

    if (!(title || excerpt || releasedAt || ISBN)) return res.status(400).send({ status: false, msg: "Please input valid params to update!" });

    if (!objectValue(title)) return res.status(400).send({ status: false, msg: "Please enter title!" })

    let duplicateTitle = await booksModel.findOne({ title })
    if (duplicateTitle) return res.status(400).send({ status: false, msg: "title is already in use!" })

    if (!objectValue(excerpt)) return res.status(400).send({ status: false, msg: "Please enter excerpt!" })

    if (!objectValue(releasedAt)) return res.status(400).send({ status: false, msg: "Please enter releasedAt!" })

    if (!isValidISBN(ISBN)) { return res.status(400).send({ status: false, message: 'Please provide a valid ISBN of 13 digits!' }) }

    let duplicateISBN = await booksModel.findOne({ ISBN })
    if (duplicateISBN) return res.status(400).send({ status: false, msg: "ISBN is already registered!" })

    const updatedBooks = await booksModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { title, excerpt, releasedAt, ISBN }, },
      { new: true }
    );
    return res.status(200).send({ status: true, data: updatedBooks });

  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<========================== SEVENTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const deleteBooksbyId = async (req, res) => {

  const bookId = req.params.bookId

  if (!isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "bookId is invalid!" }) }

  const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

  if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

  let token = req.headers["x-api-key"]

  let decodedToken = jwt.verify(token, "group66-project3")

  if (findBooksbyId.userId != decodedToken.userId) { return res.status(403).send({ status: false, msg: "not authorized!" }) }

  const deletedBooks = await booksModel.findOneAndUpdate(
    { _id: bookId, isDeleted: false },
    { $set: { isDeleted: true, deletedAt: new Date() } },
    { new: true })

  res.status(200).send({ status: true, message: "Book deleted successfullly.", data: deletedBooks })

}


module.exports = { createbooks, getBooks, getBooksbyId, updateBooks, deleteBooksbyId }  // Destructuring

