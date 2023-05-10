require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const VideogamesModel = require("./Models/Videogames");
const GenderModel =require("./Models/Gender")

//Te conectas a la Db instanciando Sequilize
const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/videogames`,
    { logging: false, native: false } // 
  );
  //El loggin:false deshabilita que aparezcan en la consola todas las consultas que SQL realiza
  //El native:false desactiva el uso del controlador nativo de PostgreSQL. Sequilize se conectara a la Db a traves de una bibiloteca pura de Js


  //Le paso sequeilize a los models
VideogamesModel(sequelize);
GenderModel(sequelize);


  //Relaciono los Models => Relacion Muchos a Muchos
const {Videogames,Genders} = sequelize.models
Videogames.belongsToMany(Genders,{through:"16horasDeMiVida"})
Genders.belongsToMany(Videogames,{through:"16horasDeMiVida"})

module.exports={
    ...sequelize.models,
    conn:sequelize,
};
