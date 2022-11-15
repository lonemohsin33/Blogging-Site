// const jwt = require('jsonwebtoken')

const authorModel = require("../models/authormodel")
const blogModel = require("../models/blogmodel")


// -------------------✅--------------------------

const createBlog = async function (req, res) {

    try {
        let blogData = req.body
        let authorId = blogData.authorId

        let checkId = await authorModel.findById(authorId)
        if (!checkId) {
            res.send({ warning: "Author ID not exist !!" })
        }

        let savedBlog = await blogModel.create(blogData)
        res.status(201).send({ message: savedBlog })
    }
    catch (err) {
        if (err.name == "ValidationError") {
            res.status(400).send({ warning: err.message })
        }
        else {

            res.status(500).send({ warning: err.message })
        }
    }
}

// --------------------⚠️-------------------------

const filterBlog = async function (req, res) {

    try {
        let queryParams = req.query

        let filterData = await blogModel.find({ isDeleted: false, isPublished: true, ...queryParams })

        if (!filterData) {
            return res.status(404).send({ msg: "No data matched !" })
        }
        else {
            res.send({ filtered_Blogs: filterData })
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

// ------------------✅---------------------------

const updateBlog = async function (req, res) {

    try {
        let Id = req.params.blogId
        let newData = req.body

        let updatedData = await blogModel.findOneAndUpdate({ isDeleted: false, isPublished: true, _id: Id }, { $set: newData }, { new: true })

        if (!updatedData) {
            res.status(404).send({ msg: "Data not found !" })
        }
        res.status(200).send({ updated_blog: updatedData })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

// ------------------✅---------------------------

const deleteById = async function (req, res) {

    try {
        let Id = req.params.blogId

        let delData = await blogModel.findOneAndUpdate({ isDeleted: false, _id: Id }, { $set: { isDeleted: true } }, { new: true })

        if (delData) {
            res.send({ warning: "Data Deleted !!" })
        }
        res.status(404).send({ msg: "Data not found !" })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

// ------------------✅---------------------------

const deleteByQuery = async function (req, res) {

    try {
        let queryParams = req.query
        let delData = await blogModel.findOneAndUpdate({ isDeleted: false, ...queryParams }, { $set: { isDeleted: true } }, { new: true })

        if (!delData) {
            return res.status(404).send({ msg: "No data matched !" })
        }
        res.send({ warning: "Data Deleted !!" })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports.createBlog = createBlog
module.exports.filterBlog = filterBlog

module.exports.updateBlog = updateBlog
module.exports.deleteById = deleteById
module.exports.deleteByQuery = deleteByQuery