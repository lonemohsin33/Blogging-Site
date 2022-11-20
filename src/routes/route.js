const express = require('express')
const router = express.Router()

const AuthorControl = require("../controllers/authorcontrol")
const BlogControl = require("../controllers/blogcontrol")
const AuthWare = require("../middleware/authware")
const Validation = require("../middleware/validation")


router.get("/servertest", (req, res) => res.send("server working fine !"))

router.post("/login",           AuthorControl.loginAuthor)

router.post("/authors",         Validation.validAuthor, AuthorControl.createAuthor)
router.post("/blogs",           AuthWare.authentication, Validation.validBlog, Validation.isPubChecker, AuthWare.authorization, BlogControl.createBlog)

router.get("/blogs",            AuthWare.authentication, BlogControl.filterBlog)

router.put("/blogs/:blogId",    AuthWare.authentication, AuthWare.authorization,  BlogControl.updateBlog)

router.delete("/blogs/:blogId", AuthWare.authentication, AuthWare.authorization, BlogControl.deleteById)
router.delete("/blogs",         AuthWare.authentication, AuthWare.authorization, BlogControl.deleteByQuery)


module.exports = router