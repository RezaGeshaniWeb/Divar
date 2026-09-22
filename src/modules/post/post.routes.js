const { Router } = require("express");
const postController = require("./post.controller");
const { upload } = require("../../common/utils/multer");
const Authorization = require("../../common/guard/authorization.guard");

const router = Router()

router.get('/create', Authorization, postController.createPostPage)
router.get('/my', Authorization, postController.findMyPosts)
router.get('/:id', postController.showPost)
router.delete('/delete/:id', Authorization, postController.remove)
router.post('/create', Authorization, upload.array("images", 10), postController.create)

module.exports = {
    PostRoutes: router
}