const mongoose = require("mongoose");
const schm = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Message: String,
  ShowMembers: String,
});

module.exports = mongoose.model("azurywelcome", schm);