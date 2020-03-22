module.exports = (sequelize, DataTypes ) => {

    let alias = 'carritos_compras';
    let columns = {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        id_carrito: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,
    };

    const carritos_compra = sequelize.define(alias, columns);


    return carritos_compra;
}