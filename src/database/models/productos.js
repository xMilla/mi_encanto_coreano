module.exports = (sequelize, DataTypes ) => {

    let alias = 'productos';
    let columns = {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        nombre: DataTypes.STRING,
        id_tipo: DataTypes.INTEGER,
		marca: DataTypes.STRING,
		precio: DataTypes.INTEGER,
		stock: DataTypes.INTEGER,
		desc: DataTypes.STRING,
        desc_larga: DataTypes.STRING,
        foto: DataTypes.STRING,
    };

    const producto = sequelize.define(alias, columns);


    return producto;
}