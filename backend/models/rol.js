const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rol = sequelize.define(
  "Rol",
  {
    ID_Rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Permisos: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Rol",
    timestamps: false,
  }
);

module.exports = Rol;
