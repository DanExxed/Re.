const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Value: String,
  Action: String,
});

module.exports = mongoose.model("toxicsystem", schm);