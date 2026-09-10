const autoBind = require("auto-bind");
const PostMessage = require("./post.messages");
const httpCodes = require("http-codes");
const postService = require("./post.service");

class PostController {
    #service;

    constructor() {
        autoBind(this)
        this.#service = postService;
    }

    async createPostPage(req, res, next) {
        try {
            res.render("./pages/panel/create-post.ejs")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()