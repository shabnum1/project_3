const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const booksModel = require("../models/booksModel");
const userModel = require("../models/userModel");

//======================================================1st Middleware===================================================================//

const authenticate = function (req, res, next) {
    try {
        let token = req.headers["X-api-key"];
        if (!token) token = req.headers["x-api-key"];
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
        console.log(token);

        let decodedToken = jwt.decode(token);
       
        if (decodedToken) {
            try {
                jwt.verify(token, "group66-project3")
                next()
            }
            catch (err) {
                return res.status(400).send({ status: false, msg: err.message })
            }
        }
        else return res.status(400).send({ status: false, msg: "token is invalid" });
       
    }
    catch (err) {
        console.log("This is the error:", err.message)
        return res.status(500).send({ status: false, msg: err.message })
        
    }
} 


//--------------------------------------------------AUTHORISATION MIDDLEWARE --------------------------------------------------------------\\

// const authorisation = async function (req, res, next) {

//     try {
//         let token = req.headers["x-Auth-token"];
//         if (!token) token = req.headers["x-auth-token"];
  
     
//      let decodedToken = jwt.verify(token, "group66-project3");

//       let userLoggedIn = decodedToken.userId
 
//       let userToBeModified = req.query.userId
    
//       console.log(userToBeModified)
  
//       //userId comparision to check if the logged-in user is requesting for their own data
//       if(userToBeModified != userLoggedIn) 
//       return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

//       next()
//     } catch (err) {
//       return res.status(500).send({ status: false, msg: err.message })
//     }
  
  
//   }
  
  
 
module.exports = { authenticate ,authorisation}