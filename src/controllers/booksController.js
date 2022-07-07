const booksModel = require("../models/booksModel");
const moment = require("moment")

const { objectValue,  keyValue, ISBNregex, isValidArray, numberValue, booleanValue, dateValue, isValidObjectId } = require("../middleware/validator")  // IMPORTING VALIDATORS

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  THIRD API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// V = Validator 

const createbooks = async (req, res) => {

    try {
      let  {title, excerpt, userId, ISBN, category, subcategory, releasedAt, isDeleted, review} = req.body 

      if (!keyValue(req.body)) return res.status(400).send({ status: false, msg: "Please provide details!" })

      if (!objectValue(title)) return res.status(400).send({ status: false, msg: "Please enter title!" })

      let duplicateTitle = await booksModel.findOne({title})

      if (duplicateTitle) return res.status(400).send({ status: false, msg: "title is already in use!" })

      if (!objectValue(excerpt)) return res.status(400).send({ status: false, msg: "Please enter excerpt!" })

      if (!objectValue(userId)) return res.status(400).send({ status: false, msg: "Please enter userId!" })
      if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "userId is invalid!" })

    //   if(ISBNregex(ISBN)){ return res.status(400).send({ status: false, message: 'Please provide a valid ISBN of 13 digits!'})}

    if(!/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/.test(ISBN)){
        return res.status(400).send({ status: false, message: 'Please provide a valid ISBN(ISBN should be 13 digit)' })}


      let duplicateISBN = await booksModel.findOne({ ISBN })

      if (duplicateISBN) return res.status(400).send({ status: false, msg: "ISBN is already registered!" })

      if (!objectValue(category)) return res.status(400).send({ status: false, msg: "Please enter category!" })

      if (!isValidArray(subcategory)) return res.status(400).send({ status: false, msg: "Please enter subcategory!" })

      if (isDeleted || isDeleted === "") {
        if (!booleanValue(isDeleted)) return res.status(400).send({ status: false, msg: "Please enter isDeleted!" })
      }

      if (review || review === "") {
        if (!numberValue(review)) return res.status(400).send({ status: false, msg: "Please enter review!" })
      }
      
      if (!dateValue(releasedAt)) { return res.status(400).send({ status: false, message: 'Please enter releasedAt' })}

    //   if (releasedAt !== moment(new Date()).format("YYYY-MM-DD")) { return res.status(400).send({ status: false, message: 'Please provide a valid Date(YYYY-MM-DD)' })}

      const bookCreation = await booksModel.create(req.body)

      res.status(201).send({ status: true, data: bookCreation })

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<===========================  THIRD API  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const getBooks = async (req, res) => {
    try {

        let {userId, category, subcategory} = req.query;

        if (!keyValue(req.query))return res.status(400).send({ status: false, msg: "Please provide the required params!" });

        const bookList= await booksModel.find({isDeleted : false}).select({ ISBN: 0, isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 }).sort({ title: 1 });

        if (!bookList) return res.status(404).send({ status: false, msg: 'no such books are present!' })


        res.status(200).send({ status: true, data:bookList} )  // Destructuring
        // res.status(200).send({ status: true, data: { name: college.name, fullName: college.fullName, logoLink: college.logoLink, interns: intern } })  // Destructuring

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = { createbooks, getBooks }  // Destructuring