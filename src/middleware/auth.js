const jwt = require("jsonwebtoken");    // Importing

//====================================================Authentication Middleware=============================================================//

const authentication= async function(req,res,next){
    try{
     let token= req.headers["X-Api-key"];
     if(!token) token= req.headers["x-api-key"]
     if (!token) return res.send({ status: false, message: "token must be present" }); 
     jwt.verify(token, "group66-project3",function (err, decoded) {
        if (err) {
             return res.status(401).send({ status: false, message: "invalid token" })
        } else {
            console.log(decoded)
            req.decodedToken=decoded
            next()
        }
    })
    
}
catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

module.exports = { authentication }     // Exporting 
