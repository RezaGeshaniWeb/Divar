const autoBind = require("auto-bind");
const PostModel = require("./post.model");

class PostService {
    #model;

    constructor() {
        autoBind(this)
        this.#model = PostModel;
    }
}

module.exports = new PostService()