const { getAll, create, getOne, remove, update, login } = require('../controllers/acudiente.controllers');
const express = require('express');

const routerAcudiente = express.Router();

routerAcudiente.route('/')
	.get(getAll)
	.post(create);

routerAcudiente.route('/login')
    .post(login)

routerAcudiente.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = routerAcudiente;