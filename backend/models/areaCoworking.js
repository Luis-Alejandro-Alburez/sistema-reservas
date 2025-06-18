const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Espacio = require("./espacio");

const AreaCoworking = sequelize.define(
  "AreaCoworking",
  {
    ID_Espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Espacio,
        key: "ID_Espacio",
      },
    },
    ServiciosIncluidos: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "AreaCoworking",
    timestamps: false,
  }
);

module.exports = AreaCoworking;
