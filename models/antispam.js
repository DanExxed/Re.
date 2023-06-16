const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Limit: String,
});

module.exports = mongoose.model("antispam", schm);