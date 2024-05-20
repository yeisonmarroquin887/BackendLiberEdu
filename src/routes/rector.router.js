const { getAll, create, getOne, remove, update, login } = require('../controllers/rector.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const rectorRouter = express.Router();

rectorRouter.route('/')
	.get(getAll)
	.post(create);

rectorRouter.route('/login')
    .post(login)

rectorRouter.route('/:id')
	.get(getOne)
	.delete(remove)
	.put(update);

module.exports = rectorRouter;