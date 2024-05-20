const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Periodo = sequelize.define('periodo', {
	NombrePeriodo: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = Periodo;