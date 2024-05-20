const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Estudiante = sequelize.define('estudiante', {
	Nombres: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Apellidos: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Identificacion: {
		type: DataTypes.STRING,
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
    //Rol
});

Estudiante.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    delete values.Contraseña; 
    return values;
};

module.exports = Estudiante;