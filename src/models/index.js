const Acudiente = require("./Acudiente");
const Curso = require("./Curso");
const Docente = require("./Docente");
const Estudiante = require("./Estudiante");
const Materia = require("./Materia");
const Periodo = require("./Periodo");
const Rector = require("./Rector");
const Rol = require("./Rol");

//Relaciones de uno a uno
Rector.belongsTo(Rol);
Docente.belongsTo(Rol);
Acudiente.belongsTo(Rol);
Estudiante.belongsTo(Rol);

//Relaciones de muchos a muchos
Docente.belongsToMany(Curso, {through: "DocenteCurso"});
Curso.belongsToMany(Docente, {through: "DocenteCurso"});

Docente.belongsToMany(Materia, {through: "DocenteMateria"});
Materia.belongsToMany(Docente, {through: "DocenteMateria"});

//Relaciones de uno a muchos
Curso.hasMany(Periodo);
Periodo.belongsTo(Curso);

Curso.hasMany(Materia);
Materia.belongsTo(Curso);

Periodo.hasMany(Materia);
Materia.belongsTo(Periodo);

Acudiente.hasMany(Estudiante);
Estudiante.belongsTo(Acudiente);

Curso.hasMany(Estudiante);
Estudiante.belongsTo(Curso);