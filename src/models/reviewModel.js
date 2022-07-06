const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

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

        reviewedAt: { type: Date, required: true, default: null },


        rating: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
            max: 5
        },

        reviews: {
            type: String
        },

        isDeleted: { type: Boolean, default: false }

    }, { timestamps: true })




module.exports = mongoose.model("review", reviewSchema)
