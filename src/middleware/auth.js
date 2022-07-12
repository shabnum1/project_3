const jwt = require("jsonwebtoken");    // Importing

//======================================================1st Middleware===================================================================//

const authentication = async function (req, res, next) {                  // Authentication
    try {
        let token = req.headers["x-api-key"]

        if (!token) return res.status(400).send({ status: false, msg: "No Token Found!" })
        let decodedToken = jwt.verify(token, "group66-project3")
        if (!decodedToken) return res.status(401).send({ status: false, msg: "Invalid token!" })

        next()

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })

    }

}

//========================================================2nd Middleware===================================================================//

const authorization = async function (req, res, next) {                         // Authorization

    try {

        let token = req.headers["x-api-key"]

        if (!token) return res.status(400).send({ status: false, msg: "No Token Found!" })

        let decodedToken = jwt.verify(token, "group66-project3")

        if (!decodedToken) return res.status(401).send({ status: false, msg: "Invalid token!" })

        let usersId = decodedToken.userId
        let bodyData = req.body.userId

        console.log(bodyData)

        if (usersId != bodyData) return res.status(403).send({ status: false, msg: "Not Authorized!" })

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}


module.exports = { authentication, authorization }     // Exporting them
