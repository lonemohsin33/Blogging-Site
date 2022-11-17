const express = require('express')
const router = express.Router()

const AuthorControl = require("../controllers/authorcontrol")
const BlogControl = require("../controllers/blogcontrol")
const AuthWare = require("../middleware/authware")
const LogicWare = require("../middleware/logicware")


router.get("/servertest", (req, res) => res.send("server working fine !"))

router.post("/login",           LogicWare.clientBody, AuthorControl.loginAuthor)

router.post("/authors",         LogicWare.clientBody, AuthorControl.createAuthor)
router.post("/blogs",           AuthWare.authentication, LogicWare.clientBody, AuthWare.authorization, BlogControl.createBlog)

router.get("/blogs",            AuthWare.authentication, BlogControl.filterBlog)

router.put("/blogs/:blogId",    AuthWare.authentication, AuthWare.authorization, LogicWare.clientBody, BlogControl.updateBlog)

router.delete("/blogs/:blogId", AuthWare.authentication, AuthWare.authorization, BlogControl.deleteById)
router.delete("/blogs",         AuthWare.authentication, AuthWare.authorization, BlogControl.deleteByQuery)


module.exports = router