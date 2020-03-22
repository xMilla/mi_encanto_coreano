module.exports = (sequelize, DataTypes ) => {

    let alias = 'usuarios';
    let columns = {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        fullname: DataTypes.STRING,
        email: DataTypes.STRING,
		password: DataTypes.STRING,
		repassword: DataTypes.STRING,
		categoria: DataTypes.STRING,
		avatar: DataTypes.STRING,
    };

    const usuario = sequelize.define(alias, columns);


    return usuario;
}