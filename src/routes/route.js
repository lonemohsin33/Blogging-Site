const express = require('express')
const router = express.Router()

const authorController = require("../controllers/authorcontrol")
const blogController = require("../controllers/blogcontrol")
const Middleware = require("../middleware/logicware")


router.get("/servertest", (req, res) => res.send("server working fine !"))


router.post("/authors",         Middleware.clientBody, authorController.createAuthor)
router.post("/blogs",           Middleware.clientBody, blogController.createBlog)

router.get("/blogs",            blogController.filterBlog)

router.put("/blogs/:blogId",    Middleware.clientBody, blogController.updateBlog)

router.delete("/blogs/:blogId", blogController.deleteById)
router.delete("/blogs",         blogController.deleteByQuery)


module.exports = router