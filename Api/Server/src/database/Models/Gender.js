const { DataTypes } = require("sequelize");

//{ timestamps: false } para que no aparezca en la db la hora y fecha cuando fue modificada

module.exports = (sequelize) => {
  sequelize.define(
    "Genders",
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
      },
    },
    { timestamps: false }
  );
};
