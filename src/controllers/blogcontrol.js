const jwt = require('jsonwebtoken')
const { update } = require('../models/authormodel')

const authorModel = require("../models/authormodel")
const blogModel = require("../models/blogmodel")


// ---------------------------------------------

const createBlog = async function (req, res) {

    try {
        let blogData = req.body

        let authorId = req.body.authorId
        let checkId = await authorModel.findById(authorId)
        if (!checkId) {
            res.send({ msg: "Author ID is not valid" })
        }

        let savedBlog = await blogModel.create(blogData)
        res.status(201).send({ message: savedBlog })
    }
    catch (err) {
        res.status(400).send(err)
    }
}

const filterBlog = async function (req, res) {

    try {
        let id = req.query.authorId
        let category = req.query.category
        let tag = req.query.tags
        let subcategory = req.query.subcategory

        let filterData = await blogModel.find({ $and: [{ $and: [{ isPublished: true }, { isDeleted: false }] }, { $or: [{ authorId: id }, { category: category }, { tags: tag }, { subcategory: subcategory }] }] })


        if (!filterData) {
            return res.status(404).send({ msg: "No data matched !" })
        }

        res.send({ filtered_Blogs: filterData })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const updateBlog = async function (req, res) {

    try {
        let Id = req.params.blogId
        let newData = req.body

        let updatedData = await blogModel.findOneAndUpdate({ $and: [{ _id: Id }, { isDeleted: false }] }, { $set: { newData } })

        if (!updatedData) {
            res.status(404).send({ msg: "Data not found !" })
        }

        res.send({ updated_blog: updatedData })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const deleteById = async function (req, res) {

    try {
        let blogId = req.params.blogId

        let delData = await blogModel.findByIdAndUpdate({ blogId }, { $set: { isDeleted: true } })

        if (!delData) {
            res.status(404).send({ msg: "Data not found !" })
        }

        res.send({ warning: "Data Deleted !!" })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

const deleteByQuery = async function (req, res) {

    try {
        let id = req.query.blogId
        let idData = req.query.authorId
        let catData = req.query.category
        let tagData = req.query.tags
        let subData = req.query.subcategory
        let pubData = req.query.publish

        let delData = await blogModel.findOneAndDelete({ $or: [{ _id: id }, { authorId: idData }, { category: catData }, { tags: tagData }, { subcategory: subData }, { isPublished: pubData }] }, { $set: { isDeleted: true } })

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