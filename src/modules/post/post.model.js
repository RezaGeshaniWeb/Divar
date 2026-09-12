const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    province: { type: String, required: false },
    city: { type: String, required: false },
    district: { type: String, required: false },
    cordinate: { type: [Number], required: true },
    images: { type: [String], required: false, default: [] },
    options: { type: Object, default: {} }
}, {
    timestamps: true
})

const PostModel = model("Post", PostSchema)

module.exports = PostModel;