const { DataTypes } = require("sequelize");

//{ timestamps: false } para que no aparezca en la db la hora y fecha cuando fue modificada

module.exports = (sequelize) => {
  sequelize.define(
    "Videogames",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoincrement: true,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "fecha de publicacion",
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
