const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
      "name": {
        "type": "String",
        required: true
      },
      "price": {
        "type": "Number",
        required: true,
      },
      "images": {
        "type": [
          "String"
        ],
        required: true,
      },
      "discount": {
        "$numberLong": {
          "type": "Date"
        }
      },
      "category": {
        "type": "String",
        required: true
      }
});

const ProductModel = mongoose.model("products", productSchema , "products");

module.exports = ProductModel;
