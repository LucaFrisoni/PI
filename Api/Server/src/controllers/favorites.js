const axios = require("axios");
const { Favorites } = require("../database/Db_connection");


async function getFavs (req,res){

    try {
        const allFavorites = await Favorites.findAll()
        res.status(200).json({allFavorites})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

async function postFav(req,res) {
    const { id, name, released, rating, genders, image,platforms } =
    req.body
    try {
    const newUser = await Favorites.create({id,
        name, released, rating, genders, image,platforms
    })
    res.status(200).json({message:"Favorites create"})
} catch (error) {
    res.status(400).json({message:error.message})
}
}
async function deleteFav(req, res) {
    const favId = req.params.id;
    try {
      // Buscar el favorito por su ID
      const favorite = await Favorites.findByPk(favId);
  
      if (!favorite) {
        return res.status(404).json({ message: "Favorito no encontrado" });
      }
  
      // Eliminar el favorito
      await favorite.destroy();
  
      res.status(200).json({ message: "Favorito eliminado" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  module.exports = {
    deleteFav
  };
module.exports={
    getFavs,
    postFav,
    deleteFav
}