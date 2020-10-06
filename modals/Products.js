const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  name: { type: String, require: true },
  img: { type: String, require: true },
  descrip: { type: String, require: true },
  price: { type: String, require: true },
  discount: { type: String, require: true },
  type: { type: String, require: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  code: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Products", ProductsSchema);
