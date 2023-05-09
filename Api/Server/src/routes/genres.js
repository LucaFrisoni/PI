const express = require("express");
const router = express.Router();
const getAllGenders= require("../controllers/genres")

router.get("/",getAllGenders)

module.exports=router