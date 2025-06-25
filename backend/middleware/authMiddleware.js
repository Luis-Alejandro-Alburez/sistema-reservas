const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

module.exports = async (req, res, next) => {
  try {
    console.log("[DEBUG] JWT_SECRET:", process.env.JWT_SECRET); // ← Debe mostrar tu clave

    // Obtener el token del header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log("[DEBUG] Token recibido:", token); // ← Ahora sí req está definido

    if (!token) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario
    const usuario = await Usuario.findByPk(decoded.id, {
      include: ["Rol"],
    });

    if (!usuario) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    // Añadir usuario a la request
    req.usuario = usuario;
    next();
  } catch (error) {
    console.error("[ERROR] authMiddleware:", error.message); // ← Debug adicional
    res.status(401).json({ error: "Acceso no autorizado" });
  }
};
