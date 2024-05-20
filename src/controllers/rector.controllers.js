const catchError = require('../utils/catchError');
const Rector = require('../models/Rector');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rol = require('../models/Rol');

const getAll = catchError(async(req, res) => {
	const results = await Rector.findAll({include:[Rol]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
    const { Contraseña, ...rest } = req.body; // Separar la contraseña del resto de los datos
    const hashPassword = await bcrypt.hash(Contraseña, 10); // Calcular el hash de la contraseña
    const result = await Rector.create({ ...rest, Contraseña: hashPassword }); // Crear el usuario con la contraseña hasheada
    return res.status(201).json(result);
});


const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Rector.findByPk(id, {include:[Rol]});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Rector.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const datos = req.body;
	const {Contraseña, ...rest} = datos;
	const hashPassword = await bcrypt.hash(Contraseña, 10)
	const result = await Rector.update(
		{...rest, Contraseña: hashPassword},
		{ where: {id}, returning: true }
	);
	if(result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
	const {Email, Contraseña} = req.body;
	const rector = await Rector.findOne({where: {Email}, include: [Rol]})
	if(!rector) return res.sendStatus(401);

	const isValidPassword = await bcrypt.compare(Contraseña, rector.Contraseña)
	if(!isValidPassword) return res.sendStatus(401);

	const token = jwt.sign(
		{rector},
		process.env.TOKEN_SECRET,
		{expiresIn:"1d"}
	)
	return res.json({rector, token})
})

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
	login
}