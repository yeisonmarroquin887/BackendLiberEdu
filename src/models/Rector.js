const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require("bcrypt")

const Rector = sequelize.define('rector', {
	Nombres: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Apellidos: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	Contraseña: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Telefono: {
		type: DataTypes.STRING,
		allowNull: false
	},
    //Rol
});

Rector.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    delete values.Contraseña; 
    return values;
};

module.exports = Rector;