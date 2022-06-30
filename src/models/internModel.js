const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  SECOND SCHEMA  ========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const internSchema = new mongoose.Schema(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },

        name: {
            type: String,
            required: "Intern name is required!",
            trim: true
        },

        email: {
            type: String,
            required: "Email is required!",
            unique: true,
            trim: true
        },

        mobile: {
            type: String,
            required: "Mobile number is required!",
            unique: true,
            trim: true
        },

        collegeId: {
            type: ObjectId,
            ref: "college"
        }
       

    }

)


module.exports = mongoose.model("intern", internSchema)
