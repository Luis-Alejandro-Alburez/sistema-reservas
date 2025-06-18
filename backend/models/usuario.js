const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Rol = require("./rol");
const bcrypt = require("bcrypt");

const Usuario = sequelize.define(
  "Usuario",
  {
    ID_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    Contraseña: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Teléfono: {
      type: DataTypes.STRING(20),
    },
    ID_Rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rol,
        key: "ID_Rol",
      },
    },
  },
  {
    tableName: "Usuario",
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.Contraseña) {
          const salt = await bcrypt.genSalt(10);
          usuario.Contraseña = await bcrypt.hash(usuario.Contraseña, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed("Contraseña")) {
          const salt = await bcrypt.genSalt(10);
          usuario.Contraseña = await bcrypt.hash(usuario.Contraseña, salt);
        }
      },
    },
  }
);

Usuario.belongsTo(Rol, { foreignKey: "ID_Rol", as: "Rol" });

Usuario.prototype.validarContraseña = async function (contraseña) {
  console.log(contraseña, this.Contraseña);
  return await bcrypt.compare(contraseña, this.Contraseña);
};

module.exports = Usuario;
