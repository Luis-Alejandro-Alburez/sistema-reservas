const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Usuario = require("./usuario");
const Espacio = require("./espacio");

const Reserva = sequelize.define(
  "Reserva",
  {
    ID_Reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "ID_Usuario",
      },
    },
    ID_Espacio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Espacio,
        key: "ID_Espacio",
      },
    },
    FechaReserva: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    HoraInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    HoraFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.ENUM("Confirmada", "Cancelada", "Pendiente"),
      defaultValue: "Pendiente",
    },
  },
  {
    tableName: "Reserva",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["ID_Espacio", "FechaReserva", "HoraInicio", "HoraFin"],
      },
      {
        fields: ["FechaReserva"],
      },
      {
        fields: ["Estado"],
      },
    ],
  }
);

module.exports = Reserva;
