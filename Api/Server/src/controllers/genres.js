const axios = require("axios");
require("dotenv").config();
const { Genders } = require("../database/Db_connection");
 

const URL = "https://api.rawg.io/api/genres";
const API_KEY = process.env.API_KEY;


const getAllGenres = async (req,res)=>{
  try {
    const allGenres = await Genders.findAll()
    res.status(200).json({genres:allGenres})
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"Fail"})
  }
}



module.exports = getAllGenres;
