const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas protegidas por autenticación
router.get("/", authMiddleware, usuarioController.obtenerUsuarios);
router.get("/:id", authMiddleware, usuarioController.obtenerUsuarioPorId);
router.put("/:id", authMiddleware, usuarioController.actualizarUsuario);
router.delete("/:id", authMiddleware, usuarioController.eliminarUsuario);
router.put(
  "/:id/cambiar-contraseña",
  authMiddleware,
  usuarioController.cambiarContraseña
);

module.exports = router;
