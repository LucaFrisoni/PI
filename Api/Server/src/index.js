const { default: axios } = require("axios");
const app = require("./app");
const { conn, Videogames, Genders } = require("./database/Db_connection");
const PORT = 3001;

const URL = "https://api.rawg.io/api/genres";
const API_KEY = process.env.API_KEY;

app.listen(PORT, () => {
  console.log(`Server raised in port: http://localhost:3001`);
  conn.sync({ alter: true }).then(() => {
    axios.get(`${URL}?key=${API_KEY}`).then(async (response) => {
      if (response.data) {
        const genreName = response.data.results.map((e) => {
          return { name: e.name, id: e.id };
        });
        for (const gameGender of genreName) {
          const [gender, created] = await Genders.findOrCreate({
            where: { name: gameGender.name },
            defaults: { id: gameGender.id, name: gameGender.name },
          });
          console.log(
            created
              ? `Created genre: ${gameGender.name}`
              : `Genre ${gameGender.name} already exists`
          );
        }
      }
    });
  });
});





























// async function getAllGenres(req, res) {
//   try {
//     const { data } = await axios.get(`${URL}?key=${API_KEY}`);
//     if (data.results) {
//       const maping = data.results.map((e) => e.name);

//       for (const gameGender of maping) {
//         const [gender, created] = await Genders.findOrCreate({
//           where: { name: gameGender },
//           defaults: { id: uuidv4(), name: gameGender },
//         });
//         console.log(
//           created
//             ? `Created genre: ${gameGender}`
//             : `Genre ${gameGender} already exists`
//         );
//       }
//       res
//         .status(200)
//         .json({ message: "Genres created successfully", genres: maping });
//     } else {
//       res.status(400).json({ message: "Axios failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// }
