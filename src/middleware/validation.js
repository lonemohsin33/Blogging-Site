const mongoose = require('mongoose')

const authorModel = require("../models/authormodel")



const validAuthor = function (req, res, next) {

    try {
        let fname = req.body.fname
        let lname = req.body.lname
        let title = req.body.title
        let email = req.body.email
        let password = req.body.password
        let data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ message: "No data Present", status: false })
        }
        if (!fname) return res.status(400).send({ message: "fname is required", status: false })
        if (!lname) return res.status(400).send({ message: "lname is required", status: false })
        if (!title) return res.status(400).send({ message: "title is required", status: false })
        if (!email) return res.status(400).send({ message: "email is required", status: false })
        
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        
        if (validateEmail(email) == false) return res.status(400).send({ message: "email format is invalid", status: false })
        
        if (!password) return res.status(400).send({ message: "password is required", status: false })
        
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const validBlog = async function (req, res, next) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ message: "No data Present", status: false })
        }
        let body = req.body.body
        let authorId = req.body.authorId
        let title = req.body.title
        let category = req.body.category


        if (!title) return res.status(400).send({ message: "title is required", status: false })
        if (!body) return res.status(400).send({ message: "body is required", status: false })
        if (!authorId) return res.status(400).send({ message: "authorId is required", status: false })
        if (!category) return res.status(400).send({ message: "category is required", status: false })

        let valid = mongoose.isValidObjectId(authorId)
        if (valid == false) return res.status(400).send({ message: "Invalid AuthorId", status: false })

        let present = await authorModel.findOne({ _id: authorId })
        if (!present) return res.status(400).send({ message: "User doesnt exist/incorrect", status: false })
        next()
    }
    catch (err) {
        res.status(500).send({ message: err.message, status: false })
    }
}


const isPubChecker = async function (req, res, next) {

    try {
        let isPublished = req.body.isPublished

        if (isPublished == true) {
            req.body.publishedAt = new Date()
            next()
        }
        else {
            next()
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message, status: false })
    }
}



module.exports.validAuthor = validAuthor
module.exports.validBlog = validBlog
module.exports.isPubChecker = isPubChecker