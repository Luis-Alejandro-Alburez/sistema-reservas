const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

module.exports = async (req, res, next) => {
  try {
    console.log(`asdf`);
    // Obtener el token del header
    const token = req.header("Authorization")?.replace("Bearer ", "");

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
    res.status(401).json({ error: "Acceso no autorizado" });
  }
};
