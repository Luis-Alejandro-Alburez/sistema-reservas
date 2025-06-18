const { Espacio, HorarioDisponible, Reserva } = require("../models");
const { Op } = require("sequelize");

exports.obtenerEspacios = async (req, res) => {
  try {
    const { tipo } = req.query;
    const where = {};

    if (tipo) {
      where.Tipo = tipo;
    }

    const espacios = await Espacio.findAll({ where });
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerEspaciosDisponibles = async (req, res) => {
  try {
    const { fecha, tipo } = req.query;

    if (!fecha) {
      return res.status(400).json({ error: "La fecha es requerida" });
    }

    // Obtener todos los espacios del tipo solicitado
    const espacios = await Espacio.findAll({
      where: tipo ? { Tipo: tipo } : {},
      include: [HorarioDisponible],
    });

    // Obtener reservas para la fecha solicitada
    const reservas = await Reserva.findAll({
      where: { FechaReserva: fecha },
    });

    // Filtrar espacios disponibles
    const espaciosDisponibles = espacios
      .map((espacio) => {
        const espacioJSON = espacio.toJSON();

        // Filtrar horarios disponibles
        espacioJSON.HorarioDisponibles = espacioJSON.HorarioDisponibles.filter(
          (horario) => {
            // Verificar si hay reservas que coincidan con este horario
            const hayReserva = reservas.some(
              (reserva) =>
                reserva.ID_Espacio === espacio.ID_Espacio &&
                reserva.HoraInicio < horario.HoraCierre &&
                reserva.HoraFin > horario.HoraApertura
            );

            return !hayReserva;
          }
        );

        return espacioJSON;
      })
      .filter((espacio) => espacio.HorarioDisponibles.length > 0);

    res.json(espaciosDisponibles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerEspacioPorId = async (req, res) => {
  try {
    const espacio = await Espacio.findByPk(req.params.id, {
      include: [HorarioDisponible],
    });

    if (!espacio) {
      return res.status(404).json({ error: "Espacio no encontrado" });
    }

    res.json(espacio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
