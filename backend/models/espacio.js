const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Espacio = sequelize.define(
  "Espacio",
  {
    ID_Espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Ubicación: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Capacidad: {
      type: DataTypes.INTEGER,
    },
    Estado: {
      type: DataTypes.ENUM("Disponible", "En mantenimiento", "No Disponible"),
      defaultValue: "Disponible",
    },
    Tipo: {
      type: DataTypes.ENUM("Sala", "Cancha", "Coworking"),
      allowNull: false,
    },
  },
  {
    tableName: "Espacio",
    timestamps: false,
  }
);

module.exports = Espacio;
