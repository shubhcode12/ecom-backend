const mongoose = require("mongoose");
const agreementSchema = new mongoose.Schema({
    "title": {
        "type": "String",
        required: true

    },

    "pdf": {
        "type": [
            "String"
        ],
        required: true,
    },

});

const AgreementModel = mongoose.model("agreement", agreementSchema, "agreement");

module.exports = AgreementModel;
