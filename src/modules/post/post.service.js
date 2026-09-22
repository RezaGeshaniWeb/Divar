const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const OptionModel = require("../option/option.model");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const PostMessage = require("./post.messages");

class PostService {
    #model;
    #optionModel;

    constructor() {
        autoBind(this)
        this.#model = PostModel;
        this.#optionModel = OptionModel;
    }

    async getCategoryOptions(categoryId) {
        const options = await this.#optionModel.find({ category: categoryId })
        return options;
    }

    async create(dto) {
        return await this.#model.create(dto)
    }

    async checkExist(postId) {
        if (!postId || !isValidObjectId(postId))
            throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
        const post = await this.#model.findById(postId)
        if (!post)
            throw new createHttpError.NotFound(PostMessage.NotFound)
        return post
    }

    async remove(postId) {
        await this.checkExist(postId)
        await this.#model.deleteOne({ _id: postId })
    }

    async find(userId) {
        if (userId && isValidObjectId(userId))
            return await this.#model.find({ userId })
        throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
    }
}

module.exports = new PostService()