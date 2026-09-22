const { Router } = require("express");
const postController = require("./post.controller");
const { upload } = require("../../common/utils/multer");

const router = Router()

router.get('/create', postController.createPostPage)
router.get('/my', postController.find)
router.post('/create', upload.array("images", 10), postController.create)

module.exports = {
    PostRoutes: router
}