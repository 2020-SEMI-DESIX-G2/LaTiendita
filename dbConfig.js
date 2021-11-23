require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = `mongodb://${process.env.MONGODB_SERVER || 'localhost'}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
//const MONGO_URL2 = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@tienditadb.iyhac.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

const mongoOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = () => mongoose.connect(MONGO_URL, mongoOptions);

module.exports = connectDb;