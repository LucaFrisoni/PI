const { where } = require("sequelize");
const { Users } = require("../database/Db_connection");
const { v4: uuidv4 } = require("uuid");
async function getUser(req, res) {
  try {
    const allUsers = await Users.findAll();
    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function postUser(req, res) {
  const { userName, email, password } = req.body;
  try {
    const newUser = await Users.create({
      userName,
      email,
      password,
    });
    res.status(200).json({ message: "User create" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function changeUserPass(req, res) {
    const { email, password } = req.body;
    try {
      const newPassword = await Users.update({ password }, { where: {email} });
      res.status(200).json(newPassword); //devuelve el id de la data
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  }
async function changeUserName(req, res) {
    const { email, userName } = req.body;
    try {
      const newUsername = await Users.update({ userName }, { where: {email} });
      res.status(200).json(newUsername); //devuelve el id de la data
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  }
module.exports = {
  getUser,
  postUser,
  changeUserPass,
  changeUserName
};
