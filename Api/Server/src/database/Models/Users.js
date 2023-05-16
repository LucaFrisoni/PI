const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
       autoIncrement:true
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: { type: DataTypes.STRING(30), allowNull: false,},
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            message: 'Sequelize:El campo "email" debe ser una dirección de correo electrónico válida.'
          }
        }
      }
    },

    { timestamps: false }
  );
};
