const mongoose = require("mongoose");
const orderSchema = require('./Order').schema;

const schema = new mongoose.Schema({
  name: {type: String},
  lastName: {type: String},
  username: {type: String},
  password: {type: String},
  email: {type: String}
});

const User = mongoose.model('user', schema);

module.exports = User;