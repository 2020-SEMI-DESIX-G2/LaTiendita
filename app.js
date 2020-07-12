require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./dbConfig');
const Products = require ('./model/Products');

path = require('path');

//body parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set("view engine", "pug");
app.set("Views", path.resolve("./public"));

//puerto
const PORT = process.env.PORT || 3000;

/**
 * Controladores templates
 */

app.get('/', async(req,res)=>{
  res.render("index");
});

 
//Controladores - API
/**
 * Obtener todos los productos
 */
app.get('/api/products/', async (req, res) => {
    const products = await Products.find();
    res.json({
        products,
        cantidad: products.length
    });
});

//encontrar un producto por su ID
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
app.post("/api/products/", async (req, res) => {
    const { nombre, descripcion, codigo, precio } = req.body;
    await Products.create({ nombre, descripcion, codigo, precio });
    res.send("estudiante añadido correctamente");
  });


  /**
   * Conexión a base de datos y levantar el server 
   */
connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});