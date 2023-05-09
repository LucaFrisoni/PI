const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
//{ timestamps: false } para que no aparezca en la db la hora y fecha cuando fue modificada

module.exports = (sequelize) => {
  sequelize.define(
    "Genders",
    {
      id: {
        type: DataTypes.UUID, 
        allowNull: false,
        primaryKey: true,
       
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique:true
      },
    },
    { timestamps: false }
  );
};
