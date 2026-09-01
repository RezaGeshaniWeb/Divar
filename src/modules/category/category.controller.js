const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const CategoryMessage = require("./category.messages");
const httpCodes = require("http-codes");

class CategoryController {
    #service;

    constructor() {
        autoBind(this)
        this.#service = categoryService;
    }

    async create(req, res, next) {
        try {
            const { name, icon, slug, parent } = req.body;
            await this.#service.create({ name, icon, slug, parent })
            return res.status(httpCodes.CREATED).json({
                message: CategoryMessage.Created
            })
        } catch (error) {
            next(error)
        }
    }
    
    async find(req, res, next) {
        try {
            const categories = await this.#service.find()
            return res.json(categories)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CategoryController()