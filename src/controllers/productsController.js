const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helperFunctions = require('../functions/helpers');

const db = require('../database/models');


let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/k-music'));
	},
	filename: function (req, file, cb) {
		let finalName = '../../images/k-music/' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })


let productsData = helperFunctions.getAll('todos');
let musicData = helperFunctions.getAll('k-pop'); 
let beautyData = helperFunctions.getAll('beauty');
let foodData = helperFunctions.getAll('food'); 

const productAddController = {
	products: (req, res) => {
		db.productos
		.findAll()
		.then (productos => {
			return res.render('todos',{
				title: 'Todos los Productos',
				productos
			});
		})
		.catch(error => res.send(error));
	},
	food: (req, res) => {
		
		res.render('food',{'productos': foodData  });
	},
	beauty: (req, res) => {
		
		res.render('beauty',{'productos': beautyData  });
	},
	music: (req, res) => {
		res.render('music',{'productos':musicData});
	},
	add: (req, res) => {
		res.render('productAdd');
	},
	update: (req, res) => {
		
		res.render('productUpdate',{'producto': helperFunctions.getProductById(req.params.idProducto)});
	},
	updateProcess: (req, res) => {
		// Asignar el nombre final de la imagen
		req.body.foto = req.file;
		console.log('entro');
		

		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		if(req.body.idProducto != ' '){
			req.body.id = req.params.idProducto;			
			helperFunctions.storeData(req.body,'update');
		}
		else{
		    helperFunctions.storeData(req.body,'add');
		}
		
		// Redirección para seguir agregando productos
	
		return res.redirect('/products/todosAdmin');

	},
	addProcess: (req, res) => {
		// Asignar el nombre final de la imagen
		req.body.foto = req.file.filename;

		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		 helperFunctions.storeData(req.body,'add');
		
		// Redirección para seguir agregando productos
		return res.redirect('/products/todosAdmin');

	},
	borrar: function (req, res){
		let product = helperFunctions.getAll('todos');
		productosFinales = product.filter(function(producto){
			return producto.id != req.params.idProducto;
		});
		helperFunctions.storeData(productosFinales,'borrar');
		
		return res.redirect('/products/todosAdmin');
	},
	todosAdmin: (req, res) => {
		res.render('todosAdmin',{'productos':productsData});
	},
	detail: (req, res) => {
		let productdet = helperFunctions.getProductById(req.params.idProducto);		
		res.render('detalleProducto',{'producto':productdet});
	},
	
};

module.exports = productAddController