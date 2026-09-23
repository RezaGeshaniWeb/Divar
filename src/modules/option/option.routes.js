const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router()

router.post('/', optionController.create)
router.get('/', optionController.find)
router.get('/by-category/:categoryId', optionController.findByCategoryId)
router.get('/by-category-slug/:slug', optionController.findByCategorySlug)
router.get('/:id', optionController.findById)
router.put('/:id', optionController.update)
router.delete('/:id', optionController.removeById)

module.exports = {
    OptionRoutes: router
}
