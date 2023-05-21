const express = require("express");
const router = express.Router();
const {getFavs,postFav,deleteFav}= require("../controllers/favorites")

router.get("/",getFavs)
router.post("/posteo",postFav)
router.delete("/:id",deleteFav)

module.exports=router