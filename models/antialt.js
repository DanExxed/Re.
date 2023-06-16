const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Days: Number,
  Bots: Boolean,
});

module.exports = mongoose.model("antialt", schm);