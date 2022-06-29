const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "College name is required!",
            unique: true,
            trim: true
        },

        fullName: {
            type: String,
            required: "Full name is required!",
            trim: true
        },

        logoLink: {
            type: String,
            required: "URL logo link is required!"
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    }

)


module.exports = mongoose.model("college", collegeSchema)

