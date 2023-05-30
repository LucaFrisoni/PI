const express = require("express");
const router = express.Router();
const {getUser,postUser,changeUserPass,changeUserName,postVerifyUser,getVerifyUser}=require("../controllers/user")

router.get("/",getUser)
router.post("/createuser",postUser)
router.put("/changepassword",changeUserPass)
router.put("/changeusername",changeUserName)
router.post("/verify_email",postVerifyUser)
router.get("/verify_emaill/:uuid/:email",getVerifyUser)


module.exports=router