module.exports = (sequelize, DataTypes ) => {

    let alias = 'productos';
    let columns = {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        nombre: DataTypes.STRING,
        tipoId:{
            type: DataTypes.INTEGER,
            field: 'id_tipo'

        } ,
		marca: DataTypes.STRING,
		precio: DataTypes.INTEGER,
		stock: DataTypes.INTEGER,
		desc: DataTypes.STRING,
        descLarga:{
            type: DataTypes.STRING,
            field: 'desc_larga'
        } ,
        foto: DataTypes.STRING,
    };

    const producto = sequelize.define(alias, columns);

    //realciones

    producto.associate = (models) => {
        producto.belongsTo(models.tipos,{
            as:'tipo',
            foreignkey: 'id_tipo'
        })
    }
    return producto;
}