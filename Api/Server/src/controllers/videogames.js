const axios = require("axios");
require("dotenv").config();
const{Videogames,Gender} = require("../database/Db_connection")




const API_KEY = process.env.API_KEY;
const URL = "https://api.rawg.io/api/games";





function getAllVideoGames(req, res) {
  const { page } = req.query;

  try {
    if (!page) {
      axios.get(`${URL}?key=${API_KEY}`).then(({ data }) => {
        if (data) {
          const infogames = data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              description:
                "La descripcion del juego se encuentra al buscar por params",
              platforms: game.platforms,
              image: game.background_image,
              released: game.released,
              rating: game.rating,
              genres:game.genres,
            };
          });
          res.status(200).json(infogames);
        } else {
          res.status(400).json({ message: "loading fail" });
        }
      });
    }
    // Para todas las paginas
    if (page) {
      axios.get(`${URL}?key=${API_KEY}&page=${page}`).then(({ data }) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "loading fail" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

function getVideoGamesById(req, res) {
  const { idVideogame } = req.params;
  try {
    axios.get(`${URL}/${idVideogame}?key=${API_KEY}`).then(({ data }) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "Videogame could not be obtained" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

function getVideoGamesByName(req, res) {
    const { search } = req.query;
  
    if (!search) {
      return res.status(400).json({ message: "You must include search term" });
    }
  
    try {
        console.log('Realizando petición a la API...');
        axios.get(`${URL}?search=${search}&key=${API_KEY}`).then(({ data }) => {
        if (data && data.results) {
            
          res.status(200).json(data.results);
        } else {
          res.status(400).json({ message: "Videogame could not be obtained" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Search fail" });
    }
  }

async function postVideoGame (req,res) {
const {name,description,platforms,image,released,rating,genres} = req.body

try {
    const [game,created]= await Videogames.findOrCreate({
        where:{name},
        defaults:{
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres,
        }
    })
    if (created) {
        res.status(200).json({message:"Game created"})
    } else {
        res.status(200).json({message:"Game already"})
    }
} catch (error) {
    res.status(500).json({message:error})
}


}

module.exports = {
  getAllVideoGames,
  getVideoGamesById,
  getVideoGamesByName,
  postVideoGame,
};
