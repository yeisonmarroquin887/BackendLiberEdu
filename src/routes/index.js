const express = require('express');
const rolRouter = require('./rol.router');
const rectorRouter = require('./rector.router');
const routerDocente = require('./docente.router');
const routerCurso = require('./curso.router');
const routerPeriodo = require('./periodo.router');
const routerMateria = require('./materia.router');
const routerAcudiente = require('./acudiente.router');
const routerEstudiante = require('./estudiante.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/roles", rolRouter)
router.use("/rector", rectorRouter)
router.use("/docente", routerDocente)
router.use("/curso", routerCurso)
router.use("/periodo", routerPeriodo)
router.use("/materia", routerMateria)
router.use("/acudiente", routerAcudiente)
router.use("/estudiante", routerEstudiante)


module.exports = router;