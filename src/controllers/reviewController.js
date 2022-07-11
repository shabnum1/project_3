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
  //  if (!reviewedBy)
  //       return res.status(400).send({ status: false, message: "please enter reviewer's name" });
       
  //      if(reviewedBy){
  //       if (typeof reviewedBy != "string")
  //       return res.status(400).send({ status: false, message: 'please enter valid reviewers name' })
  //      else if ((reviewedBy == "") || (reviewedBy == null)) {
  //           reviewedBy = 'Guest'
  //       }
  //   }


    const reviewData = { bookId, review, rating, reviewedBy }

    const reviewCreation = await reviewModel.create(reviewData)

    if (reviewCreation) {
      findBooksbyId.reviews = findBooksbyId.reviews + 1;

      let updateReviews = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { reviews: findBooksbyId.reviews } })

    }

    res.status(201).send({ status: true, data: updateReviews, reviewCreation })

  }

  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }

}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  NINTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const updateReviews = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    const { review, rating, reviewedBy } = req.body;

    if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })

    if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "reviewId is invalid!" })

    if (!objectValue(review)) return res.status(400).send({ status: false, msg: "Please enter review!" })

    if (!numberValue(rating)) return res.status(400).send({ status: false, msg: "Please enter rating in correct format!" })

    if (!ratingRegex(rating)) return res.status(400).send({ status: false, msg: "rating is invalid!" })

    if (!objectValue(reviewedBy)) return res.status(400).send({ status: false, msg: "Please enter reviewer's name!" })

    const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

    if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }
    const findReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })


    if (!findReview) { return res.status(404).send({ status: false, msg: "review not found or does not exist!" }) }
    //   let token = req.headers["x-api-key"]

    //   let decodedToken = jwt.verify(token, "group66-project3")

    //   if (findBooksbyId.userId != decodedToken.userId) { return res.status(403).send({ status: false, msg: "not authorized!" }) }

    const updatedreview = await reviewModel.findOneAndUpdate(
      { _id: reviewId },
      { $set: { review, rating, reviewedBy }, },
      { new: true }
    );
    return res.status(200).send({ status: true, data: updatedreview });

  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  NINTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\
const deleteReviewbyId = async (req, res) => {
try{
  const bookId = req.params.bookId
  const reviewId = req.params.reviewId;

  if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is invalid!" })

  if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "reviewId is invalid!" })
  const findBooksbyId = await booksModel.findOne({ _id: bookId, isDeleted: false })

  if (!findBooksbyId) { return res.status(404).send({ status: false, msg: "Books not found or does not exist!" }) }

  
    findBooksbyId.reviews = findBooksbyId.reviews - 1;

    let updateReviews = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { reviews: findBooksbyId.reviews } })


  const deletedreview = await reviewModel.findOneAndUpdate(
    { _id: reviewId, isDeleted: false },
    { $set: { isDeleted: true, deletedAt: new Date() } },
    { new: true })
  
  return res.status(200).send({ status: true, data: deletedreview });

} catch (err) {
  return res.status(500).send({ status: false, msg: err.message });}}

module.exports = { createReviews, updateReviews, deleteReviewbyId}  // Destructuring