const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const jwt = require("jsonwebtoken");
const { objectValue, keyValue, isValidISBN, isValidArray, numberValue, booleanValue, isValidDate, isValidObjectId } = require("../middleware/validator")  // IMPORTING VALIDATORS

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  EIGHTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createReviews = async (req, res) => {

    try {

        const bookId = req.params.bookId

        const { review, rating, reviewedBy } = req.body

        const reviewCreation = await reviewModel.create(req.body)

        res.status(201).send({ status: true, data: reviewCreation })

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports = { createReviews }  // Destructuring