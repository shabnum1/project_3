const mongoose = require("mongoose");

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  FIRST SCHEMA  =========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

const userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            enum:["Mr", "Mrs", "Miss"]
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 8,
            maxlength: 15
        },

        address: {
            street: { type: String },
            city: { type: String},
            pincode: { type: String}
        },


    }, {timestamps: true}

)


module.exports = mongoose.model("user", userSchema)

