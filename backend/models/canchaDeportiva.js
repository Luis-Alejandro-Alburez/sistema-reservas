const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Espacio = require("./espacio");

const CanchaDeportiva = sequelize.define(
  "CanchaDeportiva",
  {
    ID_Espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Espacio,
        key: "ID_Espacio",
      },
    },
    TipoDeporte: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Superficie: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "CanchaDeportiva",
    timestamps: false,
  }
);

module.exports = CanchaDeportiva;
