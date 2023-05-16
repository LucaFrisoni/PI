import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAll, getGenders } from "./Redux/Actions";

import Login from "./Components/Login/Login";
import Cards from "./Components/Cards/Cards";
import About from "./Components/About/About";
import Detail from "./Components/Detail/Detail";
import Favorites from "./Components/Favorites/Favorites";
import Create from "./Components/Create/Create";
import Nav from "./Components/Nav/Nav";
import SignUp from "./Components/Sign up/Signup";
import { getPlatforms, getDates } from "./Redux/Actions";
// hacer peticion al back de todos los personajes y mandarselo a Cards

const URL = "http://localhost:3001/videogames/all";
const URL2 = "http://localhost:3001/videogames/all?page=2";
const URL3 = "http://localhost:3001/videogames/all?page=3";
const URL4 = "http://localhost:3001/videogames/all?page=4";
const URL5 = "http://localhost:3001/videogames/all?page=5";
const URL6 = "http://localhost:3001/videogames/all?page=6";

function App() {
  const dispatch = useDispatch();
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------

  const games = useSelector((state) => state.allVideoGames);

  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);

  useEffect(() => {
    const dates = games.map((game) => game.released.slice(0, 4));
    const uniqueDates = dates.filter(
      (date, index) => dates.indexOf(date) === index
    );
    const sortedDates = uniqueDates.sort();
    dispatch(getDates(sortedDates));
  }, [dispatch, games]);

  useEffect(() => {
    const newPlatforms = [];
    games.forEach((game) => {
      game.platforms.forEach((platform) => {
        if (!newPlatforms.includes(platform)) {
          newPlatforms.push(platform);
        }
      });
    });
    dispatch(getPlatforms(newPlatforms));
  }, [dispatch, games]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          response1,
          response2,
          response3,
          response4,
          response5,
          response6,
        ] = await Promise.all([
          axios.get(URL),
          axios.get(URL2),
          axios.get(URL3),
          axios.get(URL4),
          axios.get(URL5),
          axios.get(URL6),
        ]);
        const allData = [
          ...response1.data,
          ...response2.data,
          ...response3.data,
          ...response4.data,
          ...response5.data,
          ...response6.data,
        ];
        dispatch(getAll(allData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllData();
  }, [dispatch]);

  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" ||
      location.pathname === "/detail/:id" ||
      location.pathname === "/about" || location.pathname === "/sign"  ? null : (
        <Nav />
      )}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Cards />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/sign" element={<SignUp />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </div>
  );
}

export default App;
