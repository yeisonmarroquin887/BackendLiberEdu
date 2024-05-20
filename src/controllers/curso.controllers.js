const catchError = require('../utils/catchError');
const Curso = require('../models/Curso');
const Docente = require('../models/Docente');
const Periodo = require('../models/Periodo');

const getAll = catchError(async(req, res) => {
	const results = await Curso.findAll({include: [Docente, Periodo]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
	const result = await Curso.create(req.body);
	return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Curso.findByPk(id, {include: [Docente, Periodo]});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Curso.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Curso.update(
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