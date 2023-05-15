import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameByName } from "../../Redux/Actions";
import axios from "axios";
import { useState } from "react";
//Si llego creo un favorites
function Nav() {

  const location = useLocation();
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState("");

  const games = useSelector((state) => state.allVideoGames);

  const handleName = (event) => {
    setGameName(event.target.value);
  };

  const handleSearch = () => {
    const gameNameTrimmed = gameName.trim()
    const gameFoundinApp = games.filter((game) => {
      return game.name.toLowerCase().replace(/\s/g, "") === gameNameTrimmed.toLowerCase().replace(/\s/g, "");
    });
    if (gameFoundinApp.length > 0) {
      dispatch(getGameByName(gameFoundinApp));
    } else {
      axios
        .get(`http://localhost:3001/videogames/name?search=${gameName}`)
        .then(({ data }) => {
          dispatch(getGameByName(data));
        }).catch((error) => {
          console.error("Error en la búsqueda:", error);
        });
    }
  };

  return (
    <div>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/create">
          <button>Create</button>
        </Link>
        <Link to="/">
          <button>Log out</button>
        </Link>
        {location.pathname === "/home" ? (
          <div>
            <input type="search" onChange={handleName} value={gameName} />
            <button onClick={handleSearch}>Search</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Nav;
