const catchError = require('../utils/catchError');
const Estudiante = require('../models/Estudiante');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Acudiente = require('../models/Acudiente');
const Curso = require('../models/Curso');
const Rol = require('../models/Rol');
const Periodo = require('../models/Periodo');
const Materia = require('../models/Materia');

const getAll = catchError(async(req, res) => {
	const results = await Estudiante.findAll({include: [Acudiente, Rol, {
		model:Curso,
		include:{
			model: Periodo,
			include: Materia
		}
	}]});
	return res.json(results);
});

const create = catchError(async (req, res) => {
    const { id, Contraseña, ...rest } = req.body;

    // Buscar el acudiente por el número de identificación
    const acudiente = await Acudiente.findByPk(id);


    // Calcular el hash de la contraseña
    const hashPassword = await bcrypt.hash(Contraseña, 10);

    // Crear el estudiante y asociarlo al acudiente encontrado
    const estudiante = await Estudiante.create({ ...rest, Contraseña: hashPassword, id});

    return res.status(201).json(estudiante);
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Estudiante.findByPk(id, {include: [Acudiente, Curso, Rol]});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Estudiante.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Estudiante.update(
		req.body,
		{ where: {id}, returning: true }
	);
	if(result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
	const {Identificacion, Contraseña} = req.body;
	const estudiante = await Estudiante.findOne({where: {Identificacion}})
	if(!estudiante) return res.sendStatus(401);

	const isValidPassword = await bcrypt.compare(Contraseña, estudiante.Contraseña)
	if(!isValidPassword) return res.sendStatus(401);

	const token = jwt.sign(
		{estudiante},
		process.env.TOKEN_SECRET,
		{expiresIn:"1d"}
	)
	return res.json({estudiante, token})
})


module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update, 
	login
}