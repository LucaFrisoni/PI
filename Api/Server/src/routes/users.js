const express = require("express");
const router = express.Router();
const {getUser,postUser}=require("../controllers/user")

router.get("/",getUser)
router.post("/createuser",postUser)


module.exports=router