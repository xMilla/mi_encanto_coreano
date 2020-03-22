module.exports = (sequelize, DataTypes ) => {

    let alias = 'tipos';
    let columns = {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        desc: DataTypes.STRING,
    };

    const tipo = sequelize.define(alias, columns);


    return tipo;
}