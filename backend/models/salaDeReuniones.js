const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Espacio = require("./espacio");

const SalaDeReuniones = sequelize.define(
  "SalaDeReuniones",
  {
    ID_Espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Espacio,
        key: "ID_Espacio",
      },
    },
    Equipamiento: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "SalaDeReuniones",
    timestamps: false,
  }
);

module.exports = SalaDeReuniones;
