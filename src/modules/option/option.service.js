const autoBind = require("auto-bind");
const OptionModel = require("./option.model");

class OptionService {
    #model;

    constructor() {
        autoBind(this)
        this.#model = OptionModel;
    }

    async find() { }

    async create(optionDto) { }

    async checkExistById(id) { }
}

module.exports = new OptionService()