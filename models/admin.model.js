const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
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

const AdminModel = mongoose.model("admin", adminSchema , "admin");

module.exports = AdminModel;