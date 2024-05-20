const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Docente = sequelize.define('docente', {
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

Docente.prototype.toJSON = function(){
    const values = Object.assign({}, this.get());
    delete values.Contraseña; 
    return values;
};

module.exports = Docente;