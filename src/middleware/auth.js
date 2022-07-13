const jwt = require("jsonwebtoken");    // Importing

//====================================================Authentication Middleware=============================================================//

const authentication = async function (req, res, next) {                  // Authentication
    try {
        let token = req.headers["x-api-key"]

        if (!token) return res.status(400).send({ status: false, msg: "No Token Found!" })
        let decodedToken = jwt.verify(token, "group66-project3", (err, decoded) => {
            if (err) {
              return res.status(400).send({ status: false, Error: err.message })
               
            } else {
                return decoded
            }
        })
        if (!decodedToken) return res.status(401).send({ status: false, msg: "Invalid token!" })

        next()

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })

    }
}

module.exports = { authentication }     // Exporting 
