const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const moment = require("moment")
const { objectValue, keyValue, numberValue, ratingRegex, isValidObjectId, strRegex } = require("../middleware/validator");  // IMPORTING VALIDATORS


//-------------------------------------------------------  EIGHTH API  ---------------------------------------------------------------------\\

// V = Validator 

const createReviews = async (req, res) => {

  try {

    const bookId = req.params.bookId

    const reviewedAt = moment().format()

    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })

    const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

    if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

    let { review, rating, reviewedBy } = req.body

    if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

    if (!objectValue(review)) return res.status(400).send({ status: false, msg: "Please enter valid review!" })
    if (!strRegex(review)) return res.status(400).send({ status: false, msg: "Please enter review in correct format!" })

    if (!numberValue(rating)) return res.status(400).send({ status: false, msg: "Please enter rating in correct format!" })

    if (!ratingRegex(rating)) return res.status(400).send({ status: false, msg: "rating is invalid!" })

    if(!reviewedBy) {reviewedBy = "Guest" }

    if (reviewedBy) {
      if (!objectValue(reviewedBy)) return res.status(400).send({ status: false, msg: "Please enter reviewer's name correctly!" })
      if (!strRegex(reviewedBy)) return res.status(400).send({ status: false, msg: "Please enter reviewer's name correctly!" })
    } 

    const reviewData = { bookId, review, rating, reviewedBy, reviewedAt }

    const reviewCreation = await reviewModel.create(reviewData)

    if (reviewCreation) {
      findBooksbyId.reviews = findBooksbyId.reviews + 1;

      await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { reviews: findBooksbyId.reviews } })
 
      
    }

    res.status(201).send({ status: true, data: findBooksbyId, reviewData :reviewCreation })

  }

  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }

}

//-------------------------------------------------------  NINTH API  ---------------------------------------------------------------------\\

const updateReviews = async function (req, res) {
  try {
    const {bookId, reviewId} = req.params;
    const { review, rating, reviewedBy } = req.body;

    if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })

    if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "reviewId is invalid!" })

    if (review || review === "") {
      if (!objectValue(review)) return res.status(400).send({ status: false, msg: "Please enter review!" })
      if (!strRegex(review)) return res.status(400).send({ status: false, msg: "Please enter review in correct format!" })
    }

    if (rating || rating === "") {
      if (!numberValue(rating)) return res.status(400).send({ status: false, msg: "Please enter rating in correct format!" })
      if (!ratingRegex(rating)) return res.status(400).send({ status: false, msg: "rating is invalid!" })
    } 

    if (reviewedBy || reviewedBy === "") {
      if (!objectValue(reviewedBy)) return res.status(400).send({ status: false, msg: "Please enter reviewer's name!" })
      if (!strRegex(reviewedBy)) return res.status(400).send({ status: false, msg: "Please enter reviewer's name correctly!" })
      
    }

    const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })
    if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

    const findReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
    if (!findReview) { return res.status(404).send({ status: false, msg: "Review not found or does not exist!" }) }

    const updatedreview = await reviewModel.findOneAndUpdate(
      { _id: reviewId },
      { $set: { review, rating, reviewedBy }, },
      { new: true }
    );
    return res.status(200).send({ status: true, data: findBooksbyId, updatedreview });

  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
//-------------------------------------------------------  TENTH API  ---------------------------------------------------------------------\\

const deleteReviewbyId = async (req, res) => {
  try {
    const bookId = req.params.bookId
    const reviewId = req.params.reviewId;

    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })
    if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "reviewId is invalid!" })

    const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })
    if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

    const findReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
    if (!findReview) { return res.status(404).send({ status: false, msg: "review not found or does not exist!" }) }

    findBooksbyId.reviews = findBooksbyId.reviews - 1;

    let updateReviews = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { reviews: findBooksbyId.reviews } })


    const deletedreview = await reviewModel.findOneAndUpdate(
      { _id: reviewId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true })

    return res.status(200).send({ status: true, message: "Review deleted successfully!", data: findBooksbyId });

  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}

module.exports = { createReviews, updateReviews, deleteReviewbyId }  // Destructuring