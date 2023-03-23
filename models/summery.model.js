const mongoose = require("mongoose");
const summerySchema = new mongoose.Schema({
    "title": {
        "type": "String",
        required: true

    },
    "subtitle": {
        "type": "String",
        required: true,
    },
    "value": {
        "type": "String",
        required: true,
    },   

});

const SummeryModel = mongoose.model("summery", summerySchema, "summery");

module.exports = SummeryModel;
