const catchError = require('../utils/catchError');
const Periodo = require('../models/Periodo');
const Curso = require('../models/Curso');
const Materia = require('../models/Materia');

const getAll = catchError(async(req, res) => {
	const results = await Periodo.findAll({include: [Curso, Materia]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
	const result = await Periodo.create(req.body);
	return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Periodo.findByPk(id, {include: [Curso, Materia]});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Periodo.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Periodo.update(
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