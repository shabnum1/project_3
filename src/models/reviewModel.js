const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  THIRD SCHEMA  =========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const reviewSchema = new mongoose.Schema(
    {

        bookId: {
            type: ObjectId,
            ref: "book",
            required: true,
            trim: true
        },

        reviewedBy: {
            type: String,
            required: true,
            trim: true,
            default: "Guest"
        },

        reviewedAt: { type: String, required:true},


        rating: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
            max: 5
        },

        review: {
            type: String
        },

        isDeleted: { type: Boolean, default: false }

    })


module.exports = mongoose.model("review", reviewSchema)
