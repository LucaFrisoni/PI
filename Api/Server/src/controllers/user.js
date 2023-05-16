const { Users,} = require("../database/Db_connection");
const { v4: uuidv4 } = require("uuid");
async function getUser(req,res) {

    try {
    const allUsers = await Users.findAll()
    res.status(200).json({allUsers})
} catch (error) {
    res.status(400).json({message:error.message})
}
}
async function postUser(req,res) {
const {userName,email,password} = req.body
    try {
    const newUser = await Users.create({
        userName,
        email,
        password
    })
    res.status(200).json({message:"User create"})
} catch (error) {
    res.status(400).json({message:error.message})
}
}
module.exports = {
  getUser,
  postUser,
};
