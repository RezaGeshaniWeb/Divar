const autoBind = require("auto-bind");
const optionService = require("./option.service");
const OptionMessage = require("./option.messages");
const httpCodes = require("http-codes");

class OptionController {
    #service;

    constructor() {
        autoBind(this)
        this.#service = optionService;
    }

    async create(req, res, next) {
        try {
            const { title, key, guide, enum: list, type, category } = req.body;
            await this.#service.create({ title, key, guide, enum: list, type, category })
            return res.status(httpCodes.CREATED).json({
                message: OptionMessage.Created
            })
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        try {
            const options = await this.#service.find()
            res.json(options)
        } catch (error) {
            next(error)
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params
            const options = await this.#service.findById(id)
            return res.json(options)
        } catch (error) {
            next(error)
        }
    }

    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params
            const options = await this.#service.findByCategoryId(categoryId)
            return res.json(options)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController()