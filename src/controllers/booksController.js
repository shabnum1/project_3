const booksModel = require("../models/booksModel");
const moment = require("moment")

const { objectValue, keyValue, isValidISBN, isValidArray, numberValue, booleanValue, isValidDate, isValidObjectId } = require("../middleware/validator")  // IMPORTING VALIDATORS

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  THIRD API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createbooks = async (req, res) => {

  try {
    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt, isDeleted, review } = req.body

    if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

    if (!objectValue(title)) return res.status(400).send({ status: false, msg: "Please enter title!" })

    let duplicateTitle = await booksModel.findOne({ title })

    if (duplicateTitle) return res.status(400).send({ status: false, msg: "title is already in use!" })

    if (!objectValue(excerpt)) return res.status(400).send({ status: false, msg: "Please enter excerpt!" })

    if (!objectValue(userId)) return res.status(400).send({ status: false, msg: "Please enter userId!" })
    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is invalid!" })

    if (isValidISBN(ISBN)) { return res.status(400).send({ status: false, message: 'Please provide a valid ISBN of 13 digits!' }) }

    let duplicateISBN = await booksModel.findOne({ ISBN })

    if (duplicateISBN) return res.status(400).send({ status: false, msg: "ISBN is already registered!" })

    if (!objectValue(category)) return res.status(400).send({ status: false, msg: "Please enter category!" })

    if (!isValidArray(subcategory)) return res.status(400).send({ status: false, msg: "Please enter subcategory!" })

    if (isDeleted === true) return res.status(400).send({ status: false, msg: "isDeleted must be false!" })

    { if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, msg: "Please enter releasedAt in the right format(YYYY-MM-DD)!" }) }

    if (review || review === "") {
      if (!numberValue(review)) return res.status(400).send({ status: false, msg: "Please enter review!" })
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

    let { userId, category, subcategory } = req.query;

    if (!keyValue(req.query)) return res.status(400).send({ status: false, msg: "Please provide the required params!" });

    if (userId) {
      if (!objectValue(userId)) return res.status(400).send({ status: false, msg: "Please enter userId!" })
      if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is invalid!" })
    }

    if (category) {
      if (!objectValue(category)) return res.status(400).send({ status: false, msg: "Please enter category!" })
    }

    if (subcategory) {
      if (!isValidArray(subcategory)) return res.status(400).send({ status: false, msg: "Please enter subcategory!" })
    }

    const bookList = await booksModel.find({ isDeleted: false,  $or: [  {userId: req.query.userId}, {category: req.query.category}, {subcategory:req.query.subcategory} ]  }).select({ ISBN: 0, subcategory: 0, isDeleted: 0, deletedAt: 0, updatedAt: 0, createdAt: 0, __v: 0 }).sort({ title: 1 });

    if (!bookList) return res.status(404).send({ status: false, msg: 'no such books are present!' })


    res.status(200).send({ status: true, data: bookList })  // Destructuring

  }

  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createbooks, getBooks }  // Destructuring