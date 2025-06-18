const { Usuario, Rol } = require("../models");
const bcrypt = require("bcryptjs");

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Rol,
          attributes: ["Nombre"],
        },
      ],
      attributes: { exclude: ["Contraseña"] },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [
        {
          model: Rol,
          attributes: ["Nombre"],
        },
      ],
      attributes: { exclude: ["Contraseña"] },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, ID_Rol } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar campos
    usuario.Nombre = nombre || usuario.Nombre;
    usuario.Apellido = apellido || usuario.Apellido;
    usuario.Email = email || usuario.Email;
    usuario.Teléfono = telefono || usuario.Teléfono;
    usuario.ID_Rol = ID_Rol || usuario.ID_Rol;

    await usuario.save();

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseñaActual, nuevaContraseña } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar contraseña actual
    const esValida = await bcrypt.compare(contraseñaActual, usuario.Contraseña);
    if (!esValida) {
      return res.status(400).json({ error: "Contraseña actual incorrecta" });
    }

    // Hash de la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaContraseña, salt);

    usuario.Contraseña = hashedPassword;
    await usuario.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
