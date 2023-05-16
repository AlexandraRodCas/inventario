const express = require('express');
const app = express();
const { auth }= require("express-openid-connect");
const path = require('path');
require('dotenv').config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
  };

app.use(express.urlencoded({extended:false}));
app.use(express.json());




//Conexion a la base de datos. 
const dataBase = require('mongoose');
dataBase.connect("mongodb://127.0.0.1/inventarios").
then(dataBase => console.log("Conectado")).
catch(err=>console.log(err));

app.set('views',__dirname + '/formularios');
app.set('view engine', 'ejs');
app.disable('view cache');

const rutasProve = require('./rutas/proveedorRutas');
const rutasPro = require('./rutas/index');

app.use(auth(config));
app.use('/',rutasProve);
app.use('/',rutasPro);




app.listen(8000, ()=>{
    //console.log("Servidor Activo"); 
})