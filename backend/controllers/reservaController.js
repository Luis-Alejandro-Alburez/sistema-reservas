const { Reserva, Usuario, Espacio } = require("../models");
const { Op } = require("sequelize");

exports.crearReserva = async (req, res) => {
  try {
    const { ID_Espacio, FechaReserva, HoraInicio, HoraFin } = req.body;
    const ID_Usuario = req.usuario.ID_Usuario;

    // Verificar disponibilidad
    const conflicto = await Reserva.findOne({
      where: {
        ID_Espacio,
        FechaReserva,
        [Op.or]: [
          {
            HoraInicio: { [Op.lt]: HoraFin },
            HoraFin: { [Op.gt]: HoraInicio },
          },
        ],
      },
    });

    if (conflicto) {
      return res
        .status(400)
        .json({ error: "El espacio no está disponible en ese horario" });
    }

    const reserva = await Reserva.create({
      ID_Usuario,
      ID_Espacio,
      FechaReserva,
      HoraInicio,
      HoraFin,
      Estado: "Confirmada",
    });

    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Usuario, attributes: ["Nombre", "Apellido", "Email"] },
        { model: Espacio, attributes: ["Nombre", "Ubicación", "Tipo"] },
      ],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerReservasPorUsuario = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { ID_Usuario: req.params.id },
      include: [
        { model: Espacio, attributes: ["Nombre", "Ubicación", "Tipo"] },
      ],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (
      reserva.ID_Usuario !== req.usuario.ID_Usuario &&
      req.usuario.Rol.Nombre !== "Administrador"
    ) {
      return res
        .status(403)
        .json({ error: "No autorizado para cancelar esta reserva" });
    }

    reserva.Estado = "Cancelada";
    await reserva.save();

    res.json({ message: "Reserva cancelada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerReservasPorEspacio = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { ID_Espacio: req.params.id },
      include: [{ model: Usuario, attributes: ["Nombre", "Apellido"] }],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
