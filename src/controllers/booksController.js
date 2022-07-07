const booksModel = require("../models/booksModel");

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
    if (isValidISBN(ISBN)) { return res.status(400).send({ status: false, message: 'Please provide a valid ISBN of 13 digits!' }) }

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

    const srotedBooks = bookList.sort((a, b) => a.title.localeCompare(b.title))

    res.status(200).send({ status: true, data: srotedBooks })

  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<============================ FIFTH API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\


module.exports = { createbooks, getBooks }  // Destructuring