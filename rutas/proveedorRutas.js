const {render} = require("ejs");
const {application} = require("express");
const express = require('express');
const rutas = express.Router();
const {requiresAuth} = require('express-openid-connect');

const proveedores = require('../baseDatos/proveedor');
const producto = require('../baseDatos/productos');

rutas.use(function(req, res, next){
    if(req.query._method=="DELETE"){
        req.method="DELETE";
        req.url = req.path;
    }
    if(req.query._method=='PUT'){
        req.method='PUT';
        req.url= req.path;
    }
    next();
})

rutas.get('/consultarProveedores', requiresAuth(), async(req, res)=>{
    const listaProveedores = await proveedores.find();
    res.render("consultarProveedores", {listaProveedores,
        isAuthenticated: req.oidc.isAuthenticated()
    });

});

rutas.get('/registrarProveedor', requiresAuth(), async(req, res)=>{
    res.render('RegistrarProveedor',{
        isAuthenticated: req.oidc.isAuthenticated()});
});

rutas.post('/registrarProveedor', async(req, res)=>{
    var p = new proveedores(req.body);
    await proveedores.insertMany(p);
    res.redirect('/registrarProveedor');   
});

rutas.get('/registrar',requiresAuth(), async(req, res)=>{
    const list = await proveedores.find();
    res.render('registrar', {list, isAuthenticated: req.oidc.isAuthenticated()});

});

rutas.get('/editarProveedor',requiresAuth(), async(req, res)=>{
    const listaProve = await proveedores.find();
    res.render('editarProveedor', {listaProve,
         isAuthenticated: req.oidc.isAuthenticated()});
});

rutas.post('/eliminarProveedor', async(req, res)=>{
    try{
        await proveedores.deleteOne({id:req.body.id});
        res.status(200).send({success:true,msg:'Post delete'});
    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
});

rutas.delete('/editarProveedor/:id', async(req,res, next)=>{
    const id = req.params.id;
    await proveedores.deleteOne({id:id});
    res.redirect('/editarProveedor')
});

rutas.get('/actualizarProducto/:id', requiresAuth(),async(req, res)=>{
    const list = await proveedores.find();
    const id = req.params.id;
    const productodb = await producto.findOne({id:id}).exec();
    res.render('actualizarProducto', {list, productodb,
        isAuthenticated: req.oidc.isAuthenticated()});
    
});

rutas.put('/actualizarProducto/:id', async(req,res, next)=>{
    const id = req.params.id;
    var p = new producto(req.body);
    var proveedor = await proveedores.findOne({productoProveedor:req.body.proveedor});
    
    await producto.updateOne({id:id}, { $set:{nombreProducto: p.nombreProducto} });
    await producto.updateOne({id:id}, { $set:{precio: p.precio} });
    await producto.updateOne({id:id}, { $set:{cantidad: p.cantidad} });
    await producto.updateOne({id:id}, { $set:{proveedor: proveedor} });

    res.redirect('/editarProducto');

});

rutas.get('/actualizarProveedor/:id',requiresAuth(), async(req, res)=>{
    const id = req.params.id;
    const proveedordb = await proveedores.findOne({id:id}).exec();
    res.render('actualizarProveedor', {proveedordb,isAuthenticated: req.oidc.isAuthenticated()});
    
});

rutas.put('/actualizarProveedor/:id', async(req,res, next)=>{
    const id = req.params.id;
    var p = new proveedores(req.body);

    await proveedores.updateOne({id:id}, { $set:{nombreProveedor: p.nombreProveedor} });
    await proveedores.updateOne({id:id}, { $set:{direc: p.direc} });
    await proveedores.updateOne({id:id}, { $set:{telefono: p.telefono} });
    await proveedores.updateOne({id:id}, { $set:{email: p.email} });
    await proveedores.updateOne({id:id}, { $set:{empresa: p.empresa} });
    

    res.redirect('/editarProveedor');

});

module.exports = rutas;