const express = require("express");
const router = express.Router();
const {getUser,postUser,changeUserPass,changeUserName}=require("../controllers/user")

router.get("/",getUser)
router.post("/createuser",postUser)
router.put("/changepassword",changeUserPass)
router.put("/changeusername",changeUserName)

module.exports=router