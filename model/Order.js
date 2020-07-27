const mongoose = require("mongoose");
const ProductSchema = require("./Products").schema;

const schema = new mongoose.Schema({
  orderName: {type: String},
  orderCreator: {type:String},
  creationDate: { type: Date, default: Date.now },
  Products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const Order = mongoose.model("order", schema);

module.exports = Order;
