const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const Rol = require("./rol");
const Usuario = require("./usuario");
const Espacio = require("./espacio");
const SalaDeReuniones = require("./salaDeReuniones");
const CanchaDeportiva = require("./canchaDeportiva");
const AreaCoworking = require("./areaCoworking");
const HorarioDisponible = require("./horarioDisponible");
const Reserva = require("./reserva");

// Asociaciones
Usuario.belongsTo(Rol, { foreignKey: "ID_Rol" });
Rol.hasMany(Usuario, { foreignKey: "ID_Rol" });

SalaDeReuniones.belongsTo(Espacio, { foreignKey: "ID_Espacio" });
CanchaDeportiva.belongsTo(Espacio, { foreignKey: "ID_Espacio" });
AreaCoworking.belongsTo(Espacio, { foreignKey: "ID_Espacio" });

HorarioDisponible.belongsTo(Espacio, { foreignKey: "ID_Espacio" });
Espacio.hasMany(HorarioDisponible, { foreignKey: "ID_Espacio" });

Reserva.belongsTo(Usuario, { foreignKey: "ID_Usuario" });
Usuario.hasMany(Reserva, { foreignKey: "ID_Usuario" });

Reserva.belongsTo(Espacio, { foreignKey: "ID_Espacio" });
Espacio.hasMany(Reserva, { foreignKey: "ID_Espacio" });

module.exports = {
  sequelize,
  Rol,
  Usuario,
  Espacio,
  SalaDeReuniones,
  CanchaDeportiva,
  AreaCoworking,
  HorarioDisponible,
  Reserva,
};
