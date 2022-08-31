const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const legoSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  pieces: Number,
  img: String,
  value: Number,
  qty: { type: Number, max: 99 },
  retired: Boolean,
});

const Lego = mongoose.model("Lego", legoSchema);
module.exports = Lego;
