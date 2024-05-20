const { getAll, create, getOne, remove, update } = require('../controllers/docente.controllers');
const express = require('express');

const routerDocente = express.Router();

routerDocente.route('/')
	.get(getAll)
	.post(create);

routerDocente.route('/login')

routerDocente.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = routerDocente;