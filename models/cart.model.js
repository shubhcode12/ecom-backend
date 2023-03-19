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
        default : 1
      }      
});

const CartModel = mongoose.model("cart", cartSchema , "cart");

module.exports = CartModel;
