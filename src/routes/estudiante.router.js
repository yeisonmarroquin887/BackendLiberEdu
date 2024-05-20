const { getAll, create, getOne, remove, update, login } = require('../controllers/estudiante.controllers');
const express = require('express');

const routerEstudiante = express.Router();

routerEstudiante.route('/')
	.get(getAll)
	.post(create);

routerEstudiante.route('/login')
    .post(login)

routerEstudiante.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = routerEstudiante;