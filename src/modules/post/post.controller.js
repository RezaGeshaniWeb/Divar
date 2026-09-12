const autoBind = require("auto-bind");
const PostMessage = require("./post.messages");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { default: httpCodes } = require("http-codes");

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
            let options;
            if (slug) {
                slug = slug.trim()
                const category = await CategoryModel.findOne({ slug })
                if (!category) throw new createHttpError.NotFound(PostMessage.NotFound)
                options = await this.#service.getCategoryOptions(category._id)
                if (options.length === 0) options = null;
                showBack = true
                match = {
                    parent: category._id
                }
            }
            const categories = await CategoryModel.aggregate([{
                $match: match
            }])
            res.render("./pages/panel/create-post.ejs", { categories, showBack, options })
        } catch (error) {
            next(error)
        }
    }

    async createPostPage(req, res, next) {
        try {
            const { name, icon, slug, parent } = req.body;
            await this.#service.create({ name, icon, slug, parent })
            return res.status(httpCodes.CREATED).json({
                message: PostMessage.Created
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()