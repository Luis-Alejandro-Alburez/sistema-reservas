const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Espacio = require("./espacio");

const HorarioDisponible = sequelize.define(
  "HorarioDisponible",
  {
    ID_Horario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_Espacio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Espacio,
        key: "ID_Espacio",
      },
    },
    DiaSemana: {
      type: DataTypes.ENUM(
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
      ),
      allowNull: false,
    },
    HoraApertura: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    HoraCierre: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: "HorarioDisponible",
    timestamps: false,
  }
);

module.exports = HorarioDisponible;
