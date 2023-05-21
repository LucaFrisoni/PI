const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorites",
    {
      id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "fecha de publicacion",
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      rating: {
        type: DataTypes.NUMERIC(4, 2), // maximo de 4 digitos, 2 son decimales
        allowNull: false,
      },
      genders: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
