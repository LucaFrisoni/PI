const express = require("express");
const app = express();
const logger = require("morgan");
//Siempre usarlo como Primer MiddleWare
app.use(express.json()); // Para poder recibir solicitudes Http en formato Json y poder convertirlo a js

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
    res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ); //Autorizo recibir solicitudes con dichos hedears
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next(); // para pasar el control al siguiente middleware
  });
  
  app.use(logger("dev")); //Middleware para que apararezca los métodos que se van usando  
  
  app.get("/",(req,res)=>{
    res.status(200).json({message: "Levantando el server del Pi", app: "Luca si podes pa"})
})

module.exports = app;