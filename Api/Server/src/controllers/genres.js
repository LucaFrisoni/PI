const axios = require("axios");
require("dotenv").config();
const{Videogames,Genders} = require("../database/Db_connection")
const { v4: uuidv4 } = require('uuid');// Crea id aleatorios

const URL= "https://api.rawg.io/api/genres"
const API_KEY = process.env.API_KEY;

async function getAllGenres(req, res) {
    try {
      const { data } = await axios.get(`${URL}?key=${API_KEY}`);
      if (data.results) {
        const maping = data.results.map((e) => e.name);
        console.log(maping);
        for (const gameGender of maping) {
          const [gender, created] = await Genders.findOrCreate({
            where: { name: gameGender },
            defaults: { id: uuidv4(), name: gameGender },
          });
          console.log(created ? `Created genre: ${gameGender}` : `Genre ${gameGender} already exists`);
        }
        res.status(200).json({ message: "Genres created successfully" ,genres:maping});
      } else {
        res.status(400).json({ message: "Axios failed" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
module.exports = getAllGenres