const express = require("express");
const router = express.Router();
const espacioController = require("../controllers/espacioController");

router.get("/", espacioController.obtenerEspacios);
router.get("/disponibles", espacioController.obtenerEspaciosDisponibles);
router.get("/:id", espacioController.obtenerEspacioPorId);

module.exports = router;
