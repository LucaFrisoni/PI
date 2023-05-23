import "./App.css";
import axios from "axios";
import { useEffect,useState } from "react";
import { Routes, Route, useLocation,Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAll, getGenders,getFavs,getPlatforms, getDates,getDatesFav,getPlatformsFav } from "./Redux/Actions";

import Login from "./Components/Login/Login";
import Cards from "./Components/Cards/Cards";
import About from "./Components/About/About";
import Detail from "./Components/Detail/Detail";
import Favorites from "./Components/Favorites/Favorites";
import Create from "./Components/Create/Create";
import Nav from "./Components/Nav/Nav";
import SignUp from "./Components/Sign up/Signup";
import Forgot from "./Components/ForgotPassword/ForgotPassword";

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
  const favGames = useSelector((state) => state.allFavs);

  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFavs());
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
    const datesFav = favGames.map((game) => game.released.slice(0, 4));
    const uniqueDatesFav = datesFav.filter(
      (date, index) => datesFav.indexOf(date) === index
    );
    const sortedDatesFav = uniqueDatesFav.sort();
    dispatch(getDatesFav(sortedDatesFav));
  }, [dispatch, favGames]);

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
    const newPlatformsFav = [];
   favGames.forEach((game) => {
      game.platforms.forEach((platform) => {
        if (!newPlatformsFav.includes(platform)) {
          newPlatformsFav.push(platform);
        }
      });
    });
    dispatch(getPlatformsFav(newPlatformsFav));
  }, [dispatch,favGames]);

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

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedOut(!userLoggedIn); // Invertir el valor para verificar si el usuario está desconectado
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedOut(false); // Actualizar el estado a false cuando el inicio de sesión sea exitoso
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedOut(true); // Actualizar el estado a true al cerrar sesión
  };

  return (
    <div>
      {isLoggedOut && location.pathname !== "/" && location.pathname !== "/sign" && location.pathname !== "/forgotpassword" && <Navigate to="/" />}
      {location.pathname === "/" ||
      location.pathname === "/detail/:id" ||
      location.pathname === "/about" || location.pathname === "/sign" || location.pathname === "/forgotpassword" ? null : (
        <Nav onLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin}/>}></Route>
        <Route path="/sign" element={<SignUp />}></Route>
        <Route path="/forgotpassword" element={<Forgot />}></Route>
        {!isLoggedOut && ( // Verificar si el usuario está desconectado
          <>
            <Route path="/home" element={<Cards />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
        
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
