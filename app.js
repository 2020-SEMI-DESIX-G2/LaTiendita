require('dotenv').config()
const express = require('express');
const app = express();
const connectDb = require('./dbConfig');

//body parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//puerto
const PORT = process.env.PORT || 3000;

//Controllers
app.get('/', (req,res)=>{
    res.send("ruta por defecto");
});

app.listen(PORT, ()=>{
    console.log(`server corriendo en el puerto ${PORT}`);
});
