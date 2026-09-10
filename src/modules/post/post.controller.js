const autoBind = require("auto-bind");
const PostMessage = require("./post.messages");
const httpCodes = require("http-codes");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");

class PostController {
    #service;

    constructor() {
        autoBind(this)
        this.#service = postService;
    }

    async createPostPage(req, res, next) {
        try {
            let { slug } = req.query
            let showBack = false
            let match = { parent: null }
            let categories = []
            if (slug) {
                slug = slug.trim()
                const category = await CategoryModel.findOne({ slug })
                if (!category) throw new createHttpError.NotFound(PostMessage.NotFound)
                showBack = true
                match = {
                    parent: category._id
                }
            } else {

            }
            categories = await CategoryModel.aggregate([{
                $match: match
            }])
            res.render("./pages/panel/create-post.ejs", { categories, showBack })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()