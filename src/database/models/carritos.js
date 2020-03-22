module.exports = (sequelize, DataTypes ) => {

    let alias = 'carritos';
    let columns = {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        id_producto: DataTypes.INTEGER,
        cantidad: DataTypes.INTEGER,
        precio: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
    };

    const carrito = sequelize.define(alias, columns);


    return carrito;
}