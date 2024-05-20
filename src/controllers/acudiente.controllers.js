const catchError = require('../utils/catchError');
const Acudiente = require('../models/Acudiente');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rol = require('../models/Rol');

const getAll = catchError(async(req, res) => {
	const results = await Acudiente.findAll({include: [Rol]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
    const { Contraseña, ...rest } = req.body; // Separar la contraseña y los cursos del resto de los datos
    const hashPassword = await bcrypt.hash(Contraseña, 10); // Calcular el hash de la contraseña
    const acudiente = await Acudiente.create({ ...rest, Contraseña: hashPassword });

    return res.status(201).json(acudiente);
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Acudiente.findByPk(id, {include: Rol});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Acudiente.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Acudiente.update(
		req.body,
		{ where: {id}, returning: true }
	);
	if(result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
	const {Identificacion, Contraseña} = req.body;
	const acudiente = await Acudiente.findOne({where: {Identificacion}})
	if(!acudiente) return res.sendStatus(401);

	const isValidPassword = await bcrypt.compare(Contraseña, acudiente.Contraseña)
	if(!isValidPassword) return res.sendStatus(401);

	const token = jwt.sign(
		{acudiente},
		process.env.TOKEN_SECRET,
		{expiresIn:"1d"}
	)
	return res.json({acudiente, token})
})

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update, 
	login
}