const { where } = require('sequelize');
const Rol = require('../models/Rol');
const catchError = require('../utils/catchError');

const getAll = catchError(async(req, res) => {
	const rol = await Rol.findAll()
	return res.json(rol)
});

const create = catchError(async(req, res) => {
	const body = req.body;
	const addRol = await Rol.create(body);
	return res.status(201).json(addRol)
});

const getOne = catchError(async(req, res) => {
	const {id} = req.params;
	const rolOne = await Rol.findByPk(id)
	if(!rolOne) return res.status(404).json({message: "El usuario no existe"});
	return res.json(rolOne)
})

const update = catchError(async(req, res) => {
	const {id} = req.params;
	const body = req.body;
	const rolUpdate = await Rol.update(body, {where: {id}, returning: true})
	if(rolUpdate[0] === 0) return res.status(404).json({message: "rol no encontrado"});
	return res.json(rolUpdate)
})

const remove = catchError(async(req, res) => {
	const {id} = req.params;
	const rolRemove = await Rol.destroy({where: {id}});
	if(!rolRemove) return res.status(404).json({message: "rol no encontrado"});
    return res.sendStatus(204)
})

module.exports = {
	getAll,
	create,
	getOne,
	update,
	remove
}