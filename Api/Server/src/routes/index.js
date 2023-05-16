const express = require("express");
const router = express.Router();

const games = require("./videogames")
const genders = require ("./genres")
const users = require("./users")

router.use("/videogames",games)

router.use("/genres",genders)

router.use("/users",users)

module.exports=router