const mongoose = require('mongoose');
const esquema= mongoose.Schema;

const producEsquema = new esquema({
    id: String,
    nombreProducto: String,
    precio: String,
    cantidad: Number,
    proveedor: [{
        type: esquema.Types.ObjectId,
        ref: 'proveedores'
    }]
});

module.exports = mongoose.model('productos',producEsquema);