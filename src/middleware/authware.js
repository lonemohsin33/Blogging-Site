const jwt = require('jsonwebtoken')
const blogModel = require("../models/blogmodel")


// -------------------✅--------------------------

const authentication = (req, res, next) => {

    try {
        let token = req.headers["x-api-key"]

        if (!token) {
            return res.status(400).send({ status: false, message: "The token must be present" })
        }

        let decodeToken = jwt.verify(token, "fake password")

        if (!decodeToken) {
            return res.status(403).send({ status: false, message: "This token is invalid" })
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

        let decodeToken = jwt.verify(token, "fake password")

        let tokenAuthorId = decodeToken.authorId

        let pathBlogId = req.params.blogId
        
        if (pathBlogId) {
            let findBlog = await blogModel.findOne({ _id: pathBlogId })
            let blogAuthorId = findBlog.authorId

            if (tokenAuthorId != blogAuthorId) {
                return res.status(403).send({ status: false, message: 'You are not authorized !' })
            }
            next()
        }
        else if (req.query.authorId) {

            if (tokenAuthorId != req.query.authorId) {
                return res.status(403).send({ status: false, message: 'You are not authorized !' })
            }
            next()
        }
        else if (req.body.authorId) {

            if (tokenAuthorId != req.body.authorId) {
                return res.status(403).send({ status: false, message: 'You are not authorized !' })
            }
            next()
        }
        else {
            return res.status(400).send({ message: "Id must be present !", status: false })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.authentication = authentication
module.exports.authorization = authorization