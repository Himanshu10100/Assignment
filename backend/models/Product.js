const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, "ID in required"],
  },
  title: {
    type: String,
    require: [true, "Enter Title"],
  },
  price: {
    type: Number,
    require: [true, "Enter Product Price"],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  sold: {
    type: Boolean,
  },
  dateOfSale: {
    type: Date,
  },
});

module.exports = mongoose.model("Product", productSchema);
