const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  firstname: { type: String, require: true },
  secondname: { type: String, require: true },
  phonenumber: { type: Number, require: true },
  email: { type: String, require: true },
  phoneother: { type: Number, require: true },
  city: { type: String, require: true },
  permanentAddress: { type: String, require: true },
  postalAddress: { type: String, require: true },
  postcodeZip: { type: Number, require: true },
  othernotes: String,
  orderStatus: { type: String, default: "Pending" },
  orders: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: Number,
    },
  ],
  total: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Orders", OrdersSchema);
