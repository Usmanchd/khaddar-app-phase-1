const mongoose = require("mongoose");

const CatSchema = mongoose.Schema({
  name: { type: String, require: true },
  img: { type: String, require: true },
  descrip: { type: String, require: true },
  caption: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Category", CatSchema);
