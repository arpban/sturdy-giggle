const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
