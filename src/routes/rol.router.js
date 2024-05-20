const express = require("express");
const { getAll, create, getOne, update, remove } = require("../controllers/rol.controllers");

const rolRouter = express.Router();

rolRouter.route("/")
.get(getAll)
.post(create)

rolRouter.route("/:id")
.get(getOne)
.put(update)
.delete(remove)

module.exports = rolRouter