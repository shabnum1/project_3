const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const jwt = require("jsonwebtoken");
const { objectValue, keyValue, numberValue, isValidDate, ratingRegex, isValidObjectId } = require("../middleware/validator");  // IMPORTING VALIDATORS
const { findOneAndUpdate } = require("../models/booksModel");

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  EIGHTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createReviews = async (req, res) => {

    try {

        const bookId = req.params.bookId

        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })

        const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

        if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

        let { review, rating, reviewedBy } = req.body

        if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

        if (!objectValue(review)) return res.status(400).send({ status: false, msg: "Please enter review!" })

        if (!numberValue(rating)) return res.status(400).send({ status: false, msg: "Please enter rating in correct format!" })

        if (!ratingRegex(rating)) return res.status(400).send({ status: false, msg: "rating is invalid!" })

        if (!objectValue(reviewedBy)) return res.status(400).send({ status: false, msg: "Please enter reviewer's name!" })

        const reviewData = {bookId, review, rating, reviewedBy}

        const reviewCreation = await reviewModel.create(reviewData)

        if (reviewCreation) {
            let updateReviewnumber = await booksModel.findOneAndUpdate({review: findBooksbyId.review},{$set:{review: review ++ }})
        }

        res.status(201).send({ status: true, data: reviewCreation })

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  NINTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const updateReviews = async function (req, res) {
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


module.exports = { createReviews }  // Destructuring