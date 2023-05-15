const mongo = require('mongoose');
const esquema = mongo.Schema;

const proveEsq = new esquema({
    id:String,
    nombreProveedor:String,
    direc:String,
    telefono: String,
    email: String, 
    empresa: String
});

module.exports = mongo.model("proveedores",proveEsq);