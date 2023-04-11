const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    "name": {
      "type": "String"
    },
    "password": {
      "type": "String"
    },
    "email": {
      "type": "String"
    }
  });

const CompanyModel = mongoose.model("company", companySchema , "company");

module.exports = CompanyModel;