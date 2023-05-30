const { where } = require("sequelize");
const { Users,Verifications } = require("../database/Db_connection");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");


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
      res.status(200).json({ message: "User create" }); //devuelve el id de la data
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  }

  // ----------------------------------------------------------------Node-Mailer------------------------------------------------------------------------------
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "frisoniluca1@gmail.com",
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Ignorar la verificación del certificado
    }
  });


async function postVerifyUser(req, res) {
    const { email, uuid,userName,password} = req.body;
    try {
      const newVerify = await Verifications.create({uuid,email});
      const encodedUuid = encodeURIComponent(uuid);// hace que los caracteres especiales se conviertan en la url
      const encodedEmail = encodeURIComponent(email);
      const encodedUser = encodeURIComponent(userName);
      const encodedPassword = encodeURIComponent(password);
      const verifyEmailUrl = `http://localhost:3000/verify-email/${encodedUuid}/${encodedEmail}?userName=${encodedUser}&password=${encodedPassword}`;
      const mailOptions = {
        from: "frisoniluca1@gmail.com",
        to:email,
        subject: "Confirmación de correo electrónico",
        html: `
          <h3>Hola ${userName},</h3>
          <p>Gracias por registrarte en nuestra aplicación.</p>
          <p>Para confirmar tu correo electrónico, haz clic en el siguiente enlace:</p>
          <a href="${verifyEmailUrl}">Confirmar correo electrónico</a>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico de confirmación enviado");
        }
      });
      res.status(200).json({ message: "Verifaction create" }); 
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  }


async function getVerifyUser(req, res) {
  const{uuid,email}=req.params
  try {
    const verification = await Verifications.findOne({
      where: {
        uuid,
        email,
      },
    });
   if (verification) {
    res.status(200).json( verification )
   }
    else{res.status(400).json( {message:"Verification denied"} )}
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  }

module.exports = {
  getUser,
  postUser,
  changeUserPass,
  changeUserName,
  postVerifyUser,
  getVerifyUser
};
