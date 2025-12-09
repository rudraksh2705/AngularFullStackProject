const express = require("express");
const controller = require("../Controllers/controller");

const Router = express.Router();
Router.route("/").post(controller.create).get(controller.getModel)
Router.route("/:id").delete(controller.delete).patch(controller.update).get(controller.getData);


module.exports = Router;