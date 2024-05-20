const catchError = require('../utils/catchError');
const Docente = require('../models/Docente');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rol = require('../models/Rol');
const Curso = require('../models/Curso');
const Materia = require('../models/Materia');

const getAll = catchError(async(req, res) => {
	const results = await Docente.findAll({include: [Rol, Curso, Materia]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
    const { Contraseña, cursos, materia, ...rest } = req.body; // Separar la contraseña y los cursos del resto de los datos
    const hashPassword = await bcrypt.hash(Contraseña, 10); // Calcular el hash de la contraseña

    // Crear el docente con la contraseña hasheada
    const docente = await Docente.create({ ...rest, Contraseña: hashPassword });

    // Si se proporcionaron cursos, asociar los cursos al docente
    if (cursos && cursos.length > 0 && materia && materia.length > 0) {
        await docente.addCursos(cursos);
        await docente.addMateria(materia);
    }

    return res.status(201).json(docente);
});


const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Docente.findByPk(id, {include: [Rol, Curso, Materia]});
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Docente.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Se requiere un ID de docente para actualizar' });
    }

    const { Contraseña, cursos, materia, ...rest } = req.body;
    const updates = { ...rest };

    if (Contraseña) {
        updates.Contraseña = await bcrypt.hash(Contraseña, 10);
    }

    const [rowsAffected] = await Docente.update(
        updates,
        { where: { id } }
    );

    if (rowsAffected === 0) {
        return res.status(404).json({ error: 'No se encontró el docente para actualizar' });
    }

    if (cursos && cursos.length > 0 && materia && materia.length > 0) {
        const docente = await Docente.findByPk(id);

        await docente.setCursos(cursos);

        await docente.setMateria(materia);
    }

    const updatedDocente = await Docente.findByPk(id, { include: [Curso, Materia] });
    return res.json(updatedDocente);
});


const login = catchError(async(req, res) => {
	const {Email, Contraseña} = req.body;
	const docente = await Docente.findOne({where: {Email}})
	if(!docente) return res.sendStatus(401);

	const isValidPassword = await bcrypt.compare(Contraseña, docente.Contraseña)
	if(!isValidPassword) return res.sendStatus(401);

	const token = jwt.sign(
		{docente},
		process.env.TOKEN_SECRET,
		{expiresIn:"1d"}
	)
	return res.json({docente, token})
})

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
	login
}