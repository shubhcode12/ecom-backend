const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({    
      "productId": {
        "type": "String",
        required: true        
      },
      "userId" : {
        "type": "String",
        required: true 
      }, 
      "quantity" : {
        "type": Number,
        required : false
      }      
});

const CartModel = mongoose.model("cart", cartSchema , "cart");

module.exports = CartModel;
