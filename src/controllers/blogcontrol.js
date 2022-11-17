const authorModel = require("../models/authormodel")
const blogModel = require("../models/blogmodel")


// -------------------✅--------------------------

const createBlog = async (req, res) => {

    try {
        let blogData = req.body
        let authorId = blogData.authorId

        let checkId = await authorModel.findById(authorId)
        if (!checkId) {
            res.status(404).send({ status: false, message: "Author ID not exist !!" })
        }

        let savedBlog = await blogModel.create(blogData)
        res.status(201).send({ message: savedBlog })
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
            return res.status(404).send({ msg: "No data matched !" })
        }
        else {
            res.send({ filtered_Blogs: filterData })
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
        let newData = req.body
        let publish = newData.isPublished

        if (publish == true) {

            var updatedData = await blogModel.findOneAndUpdate({ isDeleted: false, _id: Id }, { $set: { title: newData.title, publishedAt: new Date() }, $push: { tags: newData.tags } }, { new: true })
        }
        else {

            var updatedData = await blogModel.findOneAndUpdate({ isDeleted: false, _id: Id }, { $set: newData }, { new: true })
        }

        if (!updatedData) {
            res.status(404).send({ msg: "Data not found !" })
        }
        res.status(200).send({ updated_blog: updatedData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ------------------✅---------------------------

const deleteById = async (req, res) => {

    try {
        let Id = req.params.blogId

        let delData = await blogModel.findOneAndUpdate({ isDeleted: false, _id: Id }, { $set: { isDeleted: true } }, { new: true })

        if (delData) {
            res.send({ warning: "Data Deleted !!" })
        }
        res.status(404).send({ msg: "Data not found !" })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ------------------✅---------------------------

const deleteByQuery = async (req, res) => {

    try {
        let queryParams = req.query


        let delData = await blogModel.findOneAndUpdate({ isDeleted: false, ...queryParams }, { $set: { isDeleted: true } }, { new: true })

        if (!delData) {
            return res.status(404).send({ msg: "No data matched !" })
        }
        res.send({ warning: "Data Deleted !!" })
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