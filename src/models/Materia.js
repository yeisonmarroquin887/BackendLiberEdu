const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Materia = sequelize.define('materia', {
	NombreMate: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = Materia;