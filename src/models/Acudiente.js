const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Acudiente = sequelize.define('acudiente', {
	Nombres: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Apellidos: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Identificacion: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true
	},
	Contraseña: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Telefono: {
		type: DataTypes.STRING,
		allowNull: false
	},
    //Rol
});

Acudiente.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    delete values.Contraseña; 
    return values;
};

module.exports = Acudiente;