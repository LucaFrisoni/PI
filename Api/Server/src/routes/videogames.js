const express = require("express");
const router = express.Router();

const {getAllVideoGames,getVideoGamesById,getVideoGamesByName,postVideoGame} = require("../controllers/videogames")

router.get("/all",getAllVideoGames)
router.get("/:idVideogame",getVideoGamesById)
router.get("/name",getVideoGamesByName) // la que usas con query
router.post("/posteos",postVideoGame)

module.exports=router