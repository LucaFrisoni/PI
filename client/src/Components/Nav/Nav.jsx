import { useDispatch, useSelector } from "react-redux";
import { getGameByName } from "../../Redux/Actions";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Nav.css";

//Si llego creo un favorites
function Nav() {
  useEffect(()=>{
    let searchBtn = document.querySelector(".searchBtn");
    let closeBtn = document.querySelector(".closeBtn");
    let searchBox = document.querySelector(".searchBox");
    searchBtn.onclick = function () {
      searchBox.classList.add("active");
      closeBtn.classList.add("active");
      searchBtn.classList.add("active");
  
    };
    closeBtn.onclick = function () {
      searchBox.classList.remove("active");
      closeBtn.classList.remove("active");
      searchBtn.classList.remove("active");
      const input = document.querySelector(".searchBox input");
      input.value = "";
    };
  },[])
  

  const dispatch = useDispatch();
  const [gameName, setGameName] = useState("");

  const games = useSelector((state) => state.allVideoGames);

  const handleName = (event) => {
    setGameName(event.target.value);
  };

  const handleSearch = () => {
    const gameNameTrimmed = gameName.trim();
    const gameFoundinApp = games.filter((game) => {
      return (
        game.name.toLowerCase().replace(/\s/g, "") ===
        gameNameTrimmed.toLowerCase().replace(/\s/g, "")
      );
    });
    if (gameFoundinApp.length > 0) {
      dispatch(getGameByName(gameFoundinApp));
    } else {
      axios
        .get(`http://localhost:3001/videogames/name?search=${gameName}`)
        .then(({ data }) => {
          dispatch(getGameByName(data));
        })
        .catch((error) => {
          console.error("Error en la búsqueda:", error);
        });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
console.log(gameName)
  return (
    <header>
      <a href="http://localhost:3000/home" className="logo">
        VideoGames <img width="30" height="30" src="https://img.icons8.com/emoji/48/000000/video-game-emoji.png" alt="video-game-emoji"/>
      </a>
      <div className="group">
        <ul className="navigation">
          <li>
            <a href="http://localhost:3000/home">Home</a>
          </li>
          <li>
            <a href="http://localhost:3000/about">About</a>
          </li>
          <li>
            <a href="create">Create</a>
          </li>
          <li>
            <a href="http://localhost:3000/">Log out</a>
          </li>
        </ul>
        <div className="search">
          <span className="icon">
            <img
              className="searchBtn"
              width="30"
              height="30"
              src="https://img.icons8.com/pastel-glyph/64/search--v2.png"
              alt="search--v2"
            />
            <img
              className="closeBtn"
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
              alt="delete-sign"
            />
          </span>
        </div>
      </div>
      <div className="searchBox">
        <input type="text" onChange={handleName} onKeyDown={handleKeyPress} placeholder="Search game . . ." />
      </div>
    </header>
  );
}

export default Nav;
