const express = require("express");
const router = express.Router();

const games = require("./videogames")
const genders = require ("./genres")
const users = require("./users")
const favorites = require ("./favorites")

router.use("/videogames",games)

router.use("/genres",genders)

router.use("/users",users)

router.use("/favorites",favorites)

module.exports=router