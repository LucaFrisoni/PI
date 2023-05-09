const express = require("express");
const router = express.Router();

const games = require("./videogames")
const genders = require ("./genres")

router.use("/videogames",games)

router.use("/genres",genders)


module.exports=router