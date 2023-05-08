const app = require ("./app");
const { conn } = require("./database/Db_connection");

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server raised in port: http://localhost:3001`);
    conn.sync({force:true})
 });