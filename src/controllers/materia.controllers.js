const catchError = require('../utils/catchError');
const Materia = require('../models/Materia');
const Periodo = require('../models/Periodo');
const Curso = require('../models/Curso');

const getAll = catchError(async(req, res) => {
	const results = await Materia.findAll({include: [Periodo, Curso]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
	const result = await Materia.create(req.body);
	return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Materia.findByPk(id, {include: [Periodo, Curso]});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Materia.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Materia.update(
		req.body,
		{ where: {id}, returning: true }
	);
	if(result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update
}