const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const { Op } = require("sequelize");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { Email: email },
      include: ["Rol"],
    });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, usuario.Contraseña);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.ID_Usuario, rol: usuario.Rol.Nombre },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: usuario.ID_Usuario,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        email: usuario.Email,
        rol: usuario.Rol.Nombre,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { Email: email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario (asignamos rol de usuario común por defecto)
    const usuario = await Usuario.create({
      Nombre: nombre,
      Apellido: apellido,
      Email: email,
      Contraseña: hashedPassword,
      Teléfono: telefono,
      ID_Rol: 2, // Asumiendo que 2 es el ID para usuarios comunes
    });

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
