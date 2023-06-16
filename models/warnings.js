const { model, Schema } = require('mongoose');

const sch = new Schema({
  Guild: String,
  User : String,
  Array: Array,
  ID: String,
})

module.exports = model('warnings', sch)
/* ============================================== */
/* ⭐ Azury Manager • Private • Server Manager ⭐ */
/* Coded by discord.gg/azury Copyrighted @ Azury  */
/* ============================================== */