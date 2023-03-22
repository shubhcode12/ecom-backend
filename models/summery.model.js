const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    "orders": {
        "type": Number,
        required: true

    },
    "customers": {
        "type": Number,
        required: true,
    },
    "product": {
        "type": Number,
        required: true,
    },
    "categories": {
        "type": Number,
        required: true,
    },

});

const CategoryModel = mongoose.model("category", categorySchema, "categories");

module.exports = CategoryModel;
