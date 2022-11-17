const jwt = require('jsonwebtoken')
const authorModel = require("../models/authormodel")
const blogModel = require("../models/blogmodel")


// -------------------✅--------------------------

const authentication = async (req, res, next) => {

    try {
        let token = req.headers["x-api-key"]

        if (!token) {
            return res.send({ status: false, message: "The token must be present" })
        }

        let decodeToken = jwt.verify(token, "fake password")

        if (!decodeToken) {
            return res.send({ status: false, message: "This token is invalid" })
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// -------------------⚠️--------------------------

const authorization = async (req, res, next) => {

    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            return res.send({ status: false, message: "The token must be present" })
        }


        let decodeToken = jwt.verify(token, "fake password")
        if (!decodeToken) {
            return res.send({ status: false, message: "This token is invalid" })
        }


        let tokenAuthorId = decodeToken.authorId
        let pathBlogId = req.params.blogId
        let findBlog = await blogModel.findOne({ _id: pathBlogId })
        let blogAuthorId = findBlog.authorId
        let queryAuthorId = req.query.authorId
        let bodyAuthorId = req.body.authorId

        if (tokenAuthorId != (blogAuthorId || queryAuthorId || bodyAuthorId)) {
            return res.send({ status: false, message: 'Access Denied !' })
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.authentication = authentication
module.exports.authorization = authorization