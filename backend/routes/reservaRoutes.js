const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas protegidas por autenticación
router.post("/", authMiddleware, reservaController.crearReserva);
router.get("/", authMiddleware, reservaController.obtenerReservas);
router.get(
  "/usuario/:id",
  authMiddleware,
  reservaController.obtenerReservasPorUsuario
);
router.get(
  "/espacio/:id",
  authMiddleware,
  reservaController.obtenerReservasPorEspacio
);
router.put("/:id/cancelar", authMiddleware, reservaController.cancelarReserva);

module.exports = router;
