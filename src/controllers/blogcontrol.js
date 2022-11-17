const mongoose = require('mongoose')
const authorModel = require("../models/authormodel")
const blogModel = require("../models/blogmodel")


// -------------------✅--------------------------

const createBlog = async (req, res) => {

    try {
        let blogData = req.body

        let savedBlog = await blogModel.create(blogData)
        res.status(201).send({ status: true, message: savedBlog })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// --------------------✅-------------------------

const filterBlog = async (req, res) => {

    try {
        let queryParams = req.query

        let filterData = await blogModel.find({ isDeleted: false, isPublished: true, ...queryParams })

        if (Object.keys(filterData).length == 0) {
            return res.status(404).send({ status: false, message: "No data matched !" })
        }
        else {
            res.status(201).send({ status: true, filtered_Blogs: filterData })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ------------------✅---------------------------

const updateBlog = async (req, res) => {

    try {
        let Id = req.params.blogId

        let valid = mongoose.isValidObjectId(Id)
        if (valid == false) {
            return res.status(400).send({ status: false, message: "Invalid Id !" })
        }

        let findBlogId = await blogModel.findOne({ _id: Id })
        if (!findBlogId) return res.status(404).send({ message: "BlogId doesn't exist or incorrect !", status: false })

        let newData = req.body
        if (Object.keys(newData).length == 0) {
            return res.status(400).send({ message: "No data Present", status: false })
        }

        let updatedData = await blogModel.findOneAndUpdate({ isDeleted: false, _id: Id }, { $set: { title: newData.title, body: newData.body, category: newData.category }, $push: { tags: newData.tags, subcategory: newData.subcategory } }, { new: true })

        if (!updatedData) {
            return res.status(404).send({ status: false, message: "Data not found !" })
        }
        res.status(200).send({ status: true, updated_blog: updatedData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ------------------✅---------------------------

const deleteById = async (req, res) => {

    try {
        let Id = req.params.blogId
        let valid = mongoose.isValidObjectId(Id)
        if (valid == false) {
            return res.status(400).send({ status: false, message: "Invalid Id !" })
        }


        let findBlogId = await blogModel.findOne({ _id: Id })
        if (!findBlogId) return res.status(404).send({ message: "BlogId doesn't exist or incorrect !", status: false })


        let delData = await blogModel.findOneAndUpdate({ isDeleted: false, _id: Id }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        if (delData) {
            return res.status(201).send({ status: true, message: "Data Deleted !!" })
        }
        res.status(404).send({ status: false, message: "Data not found !" })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ------------------✅---------------------------

const deleteByQuery = async (req, res) => {

    try {
        let queryParams = req.query
        if (!queryParams) return res.status(400).send({ message: "Author Id must be present !", status: false })

        let authorId = queryParams.authorId
        if (!authorId) return res.status(400).send({ message: "Author Id must be present !", status: false })

        let valid = mongoose.isValidObjectId(authorId)
        if (valid == false) return res.status(400).send({ status: false, message: "Invalid Id !" })

        let findBlog = await blogModel.findOne({ authorId: authorId })
        if (!findBlog) return res.status(404).send({ message: "BlogId doesn't exist or incorrect !", status: false })

        let delData = await blogModel.findOneAndUpdate({ isDeleted: false, ...queryParams }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        if (!delData) {
            return res.status(404).send({ message: "No data matched !" })
        }
        res.status(200).send({ status: true, message: "Data Deleted !!" })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createBlog = createBlog
module.exports.filterBlog = filterBlog

module.exports.updateBlog = updateBlog
module.exports.deleteById = deleteById
module.exports.deleteByQuery = deleteByQuery