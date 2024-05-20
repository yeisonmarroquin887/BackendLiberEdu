const { getAll, create, getOne, remove, update } = require('../controllers/Periodo.controllers');
const express = require('express');

const routerPeriodo = express.Router();

routerPeriodo.route('/')
	.get(getAll)
	.post(create);

routerPeriodo.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = routerPeriodo;