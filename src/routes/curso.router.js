const { getAll, create, getOne, remove, update } = require('../controllers/curso.controllers');
const express = require('express');

const routerCurso = express.Router();

routerCurso.route('/')
	.get(getAll)
	.post(create);

routerCurso.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = routerCurso;