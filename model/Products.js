const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nombre: { type: String },
  descripcion: { type: String },
  codigo: { type: String },
  precio: {type: Number}
});

const Products = mongoose.model('Products', schema);

module.exports = Products;