const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Amount: Number,
  Bots: Boolean,
});

module.exports = mongoose.model("antimassmention", schm);