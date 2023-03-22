const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({    
      "name": {
        "type": "String",
        required: true
        
      },
      "role": {
        "type": "String",
        required: true,
      },
      "review": {
        "type": "String",
        required: true,
      },
      
});

const ReviewModel = mongoose.model("review", reviewSchema , "reviews");

module.exports = ReviewModel;
