const autoBind = require("auto-bind");
const PostMessage = require("./post.messages");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { default: httpCodes } = require("http-codes");
const { Types } = require("mongoose");
const { default: axios } = require("axios");

class PostController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = postService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let match = { parent: null };
      let options, category;
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);
      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        options,
        category: category?._id.toString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createPostPage(req, res, next) {
    try {
      const { title_post: title, description: content, lat, lng, category } = req.body;
      const { address, province, city, district } = await getAddressDetail(lat, lng);
      const options = removePropertyInObject(req.body, [
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);
      await this.#service.create({
        title,
        content,
        category: new Types.ObjectId(category),
        cordinate: [lat, lng],
        images: [],
        options,
        address,
        province,
        city,
        district,
      });
      return res.status(httpCodes.CREATED).json({
        message: PostMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
