require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./dbConfig");
const Products = require("./model/Products");
const Order = require("./model/Order");
const User = require('./model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

//body parser
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//puerto
const PORT = process.env.PORT || 5000;

//Controladores - API
/**
 * Obtener todos los productos
 */
app.get("/api/products/", async (req, res) => {
  const products = await Products.find();
  if (products){
    res.status(200).send({
      products
    })
  }
});

/**
 * Encontrar un producto por id
 */
app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id).exec();
    res.json(product);
  } catch (error) {
    console.log(`error obteniendo producto ${error}`);
    res.json({});
  }
});

/**
 * Añadir un producto
 */
app.post("/api/products/", verify , async (req, res) => {
    const { nombre, descripcion, codigo, precio } = req.body;
    await Products.create({ nombre, descripcion, codigo, precio });
    res.send("producto añadido correctamente");
  });

/**
 * Registrar un usuario
 */
app.post('/api/register', async(req, res)=>{

  const emailExists = await User.findOne({email: req.body.email});
  if ( emailExists ) return res.status(400).send('Email ya existente');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });
  try {
    const savedUser = await user.save();
    res.status(200).send({user: savedUser._id});
  } catch (error) {
    res.status(400).send(err);
  }

});

/**
 * login
 */
app.post('/api/login', async (req,res) =>{
  const user = await User.findOne({email: req.body.email});
  if ( !user ) return res.status(400).send('Email incorrecto');
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('password esta mal');
  //create a token
  const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(JSON.stringify({
    tkn: token,
    usr: user
  }));

});

//crear un pedido
app.post("/api/order", verify , async (req,res) => {
  const {orderCreator, products } = req.body;
  const created = await Order.create(req.body);
  if (created){
    res.status(200).send("orden agregada exitosamente");
  }else {
    res.status(401).send("error guardando orden");
  }
});

/**
 * Conexión a base de datos y levantar el server
 */
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Ejecutando en el puerto ${PORT}`);
  });
});
