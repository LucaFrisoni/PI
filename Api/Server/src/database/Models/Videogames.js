const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
//{ timestamps: false } para que no aparezca en la db la hora y fecha cuando fue modificada

module.exports = (sequelize) => {
  sequelize.define(
    "Videogames",
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platforms: {
        type:  DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "fecha de publicacion",
      },
      rating: {
        type: DataTypes.NUMERIC(4,2), // maximo de 4 digitos, 2 son decimales 
        allowNull: false,
      }
      
    },
    { timestamps: false }
  );
};
