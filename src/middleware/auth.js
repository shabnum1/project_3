const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const booksModel = require("../models/booksModel");
const userModel = require("../models/userModel");

//======================================================1st Middleware===================================================================//

const authentication =async function (req,res,next){
    try {
        let token = req.headers["x-api-key"]

        if (!token) return res.status(400).send({ status: false, msg: "No Token Found" })
        let decodedToken = jwt.verify(token, "group66-project3")
        if (!decodedToken) return res.status(401).send({ status: false, msg: "invalid token" })

        next()

    } catch (err) {
        res.status(500).send({status:false, error:err.message})
        
    }

}
const authorization = async function (req, res, next) {

    try {

        let token = req.headers["x-api-key"]

        if (!token) return res.status(400).send({ status: false, msg: "No Token Found" })

        let decodedToken = jwt.verify(token, "group66-project3")

        if (!decodedToken) return res.status(401).send({ status: false, msg: "invalid token" })
        

        let usersId = decodedToken.userId
        let bodyData = req.body.userId
        
        
        console.log(bodyData)
        let booksId = req.params.bookId
        if(usersId){
        if(usersId!=bodyData) return res.status(403).send({ status: false, msg: "you are not autherized to do" })
        }

        if (bookId) {
            let books = await booksModel.findById(bookId)
            console.log(bookId)
            if (!books) {
                
                return res.status(404).send({ status: false, msg: "book does not existm" })
            }

            if (books.userId !==decodedToken.userId) {
                return res.status(404).send({ status: false, msg: "not authorize" })
                }

next()
            }}
     catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }}


module.exports={authentication,authorization}
