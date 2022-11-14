const jwt = require('jsonwebtoken')


const authenticate = function (req, res, next) {

    let token = req.headers["x-api-key"]

    if (!token) {
        return res.send({ status: false, msg: "token must be present" })
    }

    let decodeToken = jwt.verify(token, "fake password")

    if (!decodeToken) {
        return res.send({ status: false, msg: "token is invalid" })
    }

    next()
}


const authorize = function (req, res, next) {

    let token = req.headers["x-api-key"]

    if (!token) {
        return res.send({ status: false, msg: "token must be present" })
    }

    let decodeToken = jwt.verify(token, "fake password")

    if (!decodeToken) {
        return res.send({ status: false, msg: "token is invalid" })
    }

    let userToBeModified = req.params.userId

    let userLoggedIn = decodedToken.userId

    if (userToBeModified != userLoggedIn) {
        return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    }

    next()
}

module.exports.authenticate = authenticate
module.exports.authorize = authorize