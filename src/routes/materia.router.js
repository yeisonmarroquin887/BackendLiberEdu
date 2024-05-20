const { getAll, create, getOne, remove, update } = require('../controllers/materia.controllers');
const express = require('express');

const routerMateria = express.Router();

routerMateria.route('/')
	.get(getAll)
	.post(create);

routerMateria.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = routerMateria;