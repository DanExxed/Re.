const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Type: String,
  Channel: String,
});

module.exports = mongoose.model("membercountsystem", schm);