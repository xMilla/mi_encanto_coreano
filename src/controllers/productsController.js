const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helperFunctions = require('../functions/helpers');

const db = require('../database/models');
const Productos = db.productos;
const Tipos = db.tipos;

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
		Productos
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
		Tipos
		.findAll()
		.then(tipos => {
			res.render('productAdd',{
				title: 'Crear Producto',
				tipos
			});
		})
		.catch(error => res.send(error));
		
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
		 //Asignar el nombre final de la imagen
		 console.log(req.body);
		 req.body.tipoId = req.body.tipo_id;
		 req.body.foto = req.file.filename;

		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		 //helperFunctions.storeData(req.body,'add');
		Productos
		.create(req.body)
		.then(producto =>{
			// Redirección para seguir agregando productos
			return res.redirect('/products/todosAdmin');
		})
		.catch(error => res.send(error));
		

	},
	borrar: function (req, res){
		//let product = helperFunctions.getAll('todos');
		//productosFinales = product.filter(function(producto){
		//	return producto.id != req.params.idProducto;
		//});
		//helperFunctions.storeData(productosFinales,'borrar');
		Productos
		.destroy({
			where:{
				id: req.params.idProducto
			}
		})
		.then( ()=> {
			return res.redirect('/products/todosAdmin');
		})
		.catch(error => res.send(error));
	},
	todosAdmin: (req, res) => {
		Productos
		.findAll()
		.then (productos => {
			return res.render('todosAdmin',{
				title: 'Todos los Productos',
				productos
			});
		})
		.catch(error => res.send(error));
	},
	detail: (req, res) => {
		//let productdet = helperFunctions.getProductById(req.params.idProducto);		
		Productos
		.findByPk(req.params.idProducto,{
			include: ['tipo']
		})
		.then(producto => {
			return res.render('detalleProducto',{
				title: `Detella de ${producto.nombre}`,
				producto
			});
		} )
		.catch(error => res.send(error));
	},
	
};

module.exports = productAddController