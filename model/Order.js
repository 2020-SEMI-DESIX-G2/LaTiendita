const mongoose = require("mongoose");
const ProductSchema = require("./Products").schema;

const schema = new mongoose.Schema({
  orderCreator: { 
    name: String,
    lastName: String,
    email: String
   },
  creationDate: { type: Date, default: Date.now },
  products: [{
    name: String,
    description: String,
    code: String,
    price: Number,
    image: String
  }]
});

const Order = mongoose.model("order", schema);

module.exports = Order;
