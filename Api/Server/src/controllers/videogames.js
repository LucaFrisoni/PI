const axios = require("axios");
require("dotenv").config();
const { Videogames, Genders } = require("../database/Db_connection");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const API_KEY = process.env.API_KEY;
const URL = "https://api.rawg.io/api/games";

async function getAllVideoGames(req, res) {
  const { page } = req.query;

  try {
    const infoGamesDB = await Videogames.findAll({
      include: [
        { model: Genders, attributes: ["name"], through: { attributes: [] } },
      ],
    });

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
              genres: game.genres,
            };
          });
          const concatenacion = infoGamesDB.concat(infogames);
          res.status(200).json(concatenacion);
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

async function getVideoGamesById(req, res) {
  const { idVideogame } = req.params;
  try {
    if (idVideogame.length > 7) {
      const videoGamesDB = await Videogames.findByPk(idVideogame, {
        include: [
          { model: Genders, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      res.status(200).json(videoGamesDB);
    } else {
      axios.get(`${URL}/${idVideogame}?key=${API_KEY}`).then(({ data }) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "Videogame could not be obtained" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
// falta hacer que busque en la base de datos  y usar include para los genders
function getVideoGamesByName(req, res) {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ message: "You must include search term" });
  }

  try {
    console.log("Realizando petición a la API...");
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

// Podria haber creado otra relacion en vez de esta funcion
function HandlePlatformNames(platforms) {
  return platforms.map((platform) => platform.platform.name);
}

const postVideoGame = async (req, res) => {
  const { name, description, platforms, released, rating, genres, image } =
    req.body;
  try {
    const newVideogame = await Videogames.create({
      id: uuidv4(),
      name,
      description,
      released,
      rating,
      image,
      platforms: HandlePlatformNames(platforms),
    });
    const genreNames = await Genders.findAll({
      where: {
        id: {
          [Op.in]: genres,
        },
      },
    });
    await newVideogame.addGenders(genreNames)
    res.status(200).json({
      message: "Videogame created successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = {
  getAllVideoGames,
  getVideoGamesById,
  getVideoGamesByName,
  postVideoGame,
};
// const [game, created] = await Videogames.findOrCreate({
//   where: { name },
//   defaults: {
//     id: uuidv4(),
//     name,
//     description,
//     platforms: HandlePlatformNames(platforms),
//     image,
//     released,
//     rating,
//   },
// });
// const genderNames = Genders.findAll({ where: { id: { [Op.in]: genres } } })[
//   ("action", "adventure")
// ];
// if (created) {
//   game.addGenders(genderNames);

//   // await game.addGenders(genresArray); // la relaciones de muchos a muchos
//   res.status(200).json({ message: "Game created" });
// } else {
//   res.status(200).json({ message: "Game already exist" });
//}
