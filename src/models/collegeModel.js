const mongoose = require("mongoose");

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  FIRST SCHEMA  =========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        logoLink: {
            type: String,
            required: true
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    }

)


module.exports = mongoose.model("college", collegeSchema)

