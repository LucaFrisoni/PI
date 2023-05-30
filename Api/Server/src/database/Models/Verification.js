const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "Verifications",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique:true
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          isEmail: {
            message:
              'Sequelize:El campo "email" debe ser una dirección de correo electrónico válida.',
          },
        },
      },
    },

    { timestamps: false }
  );
};
