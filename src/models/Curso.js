const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Curso = sequelize.define('curso', {
	NombreCurso: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Descripcion: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = Curso;