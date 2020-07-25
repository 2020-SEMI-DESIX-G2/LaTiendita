const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  code: { type: String },
  price: {type: Number},
  image: {type: String}
});

const Products = mongoose.model('products', schema);

module.exports = Products;