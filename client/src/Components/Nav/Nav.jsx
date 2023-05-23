import { useDispatch, useSelector } from "react-redux";
import { getGameByName } from "../../Redux/Actions";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setMode } from "../../Redux/Actions";
import axios from "axios";
import "./Nav.css";

//Si llego creo un favorites
function Nav({ onLogout }) {
  // ----------------------------------------------------------------Selectors------------------------------------------------------------------------------
  const games = useSelector((state) => state.allVideoGames);
  const checkk = useSelector((state)=>state.mode)
  // ----------------------------------------------------------------States------------------------------------------------------------------------------
  const [darkMode, setDarkModee] = useState(false);
  const [gameName, setGameName] = useState("");
  
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  const location = useLocation();
  const dispatch = useDispatch();

  // ----------------------------------------------------------------Light/DarkMode------------------------------------------------------------------------------

  useEffect(() => {
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
  }, []);

  
  const handleMode = () => {
    let background_cards = document.querySelectorAll(".details");
    let card_h2 = document.querySelectorAll(".details h2");
    let card_span = document.querySelectorAll(".details h2 span");
    let rating_span = document.querySelectorAll(".rating span");
    let tags = document.querySelectorAll(".tags span");
    let infooo = document.querySelectorAll(".infooo");
    let checked = document.getElementById("darkmode-toohle").checked;
    let header = document.querySelector("header");
    let logo = document.querySelector(".logo");
    let navLinks = document.querySelectorAll("header ul li a");
    let searchBox = document.querySelector(".searchBox");
    let input = document.querySelector(".searchBox input");
    let selects = document.querySelector(".container-selects");
    if (checked) {
      setDarkModee(true);
      dispatch(setMode(true))
      background_cards.forEach((card) => {
        card.classList.add("color-cards");
      });
      card_h2.forEach((element) => {
        element.classList.add("color-cards-title");
        element.style.color = "white";
        element.style.margin = "0";
        element.style.padding = "0";
        element.style.fontSize = "20px";
        element.style.fontWeight = "700";
      });
      card_span.forEach((element) => {
        element.classList.add("color-cards-span");
        element.style.color = "white";
        element.style.fontSize = "14px";
      });
      rating_span.forEach((element) => {
        element.classList.add("color-cards-rating");
        element.style.color = "white";
      });
      tags.forEach((element) => {
        element.classList.add("color-cards-tags");
        element.style.color = "white";
        element.style.border = "1px solid white";
      });
      infooo.forEach((element) => {
        element.style.backgroundColor = "white";
        element.style.borderRadius = "13px";
      });
      header.style.backgroundColor = "#0e1215";
      logo.style.color = "white";
      navLinks.forEach((link) => {
        link.style.color = "#eee";
      });
      searchBox.style.backgroundColor = "#0e1215";
      input.style.backgroundColor = "#0e1215";
      input.style.color = "white";
      input.style.borderBottom = "1px solid white";
      if (location.pathname == "/home") {
        selects.style.backgroundColor = "#0e1215";
        selects.style.border = "1px solid #0e1215";
      }
    } else {
      setDarkModee(false);
      dispatch(setMode(false))
      // Restablecer estilos originales de las cards
      background_cards.forEach((card) => {
        card.classList.remove("color-cards");
      });
      card_h2.forEach((element) => {
        element.classList.remove("color-cards-title");
        element.style.color = "black";
        element.style.margin = "";
        element.style.padding = "";
        element.style.fontSize = "";
        element.style.fontWeight = "";
      });
      card_span.forEach((element) => {
        element.classList.remove("color-cards-span");
        element.style.color = "black";
        element.style.fontSize = "14px";
      });
      rating_span.forEach((element) => {
        element.classList.remove("color-cards-rating");
        element.style.color = "black";
      });
      tags.forEach((element) => {
        element.classList.remove("color-cards-tags");
        element.style.color = "black";
        element.style.border = "";
      });
      infooo.forEach((element) => {
        element.style.backgroundColor = "";
        element.style.borderRadius = "";
      });

      // Restablecer estilos originales de la barra de navegación
      header.style.backgroundColor = "white";
      logo.style.color = "#333";
      navLinks.forEach((link) => {
        link.style.color = "rgba(0, 0, 0, 0.7)";
      });
      searchBox.style.backgroundColor = "white";
      input.style.backgroundColor = "white";
      input.style.color = "#333";
      input.style.borderBottom = "1px solid rgba(0, 0, 0, 0.5)";
      if (location.pathname === "/home") {
        selects.style.backgroundColor = "white";
        selects.style.border = "1px solid white";
      }
    }
  };

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
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
      axios
        .get(`http://localhost:3001/videogames/name?search=${gameName}`)
        .then(({ data }) => {
          dispatch(getGameByName(data));
        })
        .catch((error) => {
          console.error("Error en la búsqueda:", error);
        });
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
  console.log(gameName);

  return (
    <header>
      <a href="http://localhost:3000/home" className="logo">
        VideoGames{" "}
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/emoji/48/000000/video-game-emoji.png"
          alt="video-game-emoji"
          className="floating-control"
        />
      </a>
      <div className="change-mode">
        <input
          type="checkbox"
          id="darkmode-toohle"
          className="darkmode-toohle"
          onClick={handleMode}
          checked={darkMode}
        />
        <label className="label-dark" for="darkmode-toohle"></label>
      </div>
      <div className="group">
        <ul className="navigation">
          <li>
            <a href="http://localhost:3000/home">Home</a>
          </li>

          <li>
            <a href="http://localhost:3000/about">About</a>
          </li>
          <li>
            <a href="http://localhost:3000/create">Create</a>
          </li>
          <li>
            <a href="http://localhost:3000/favorites">Favorites</a>
          </li>
          <li>
            <a onClick={onLogout} href="http://localhost:3000/">
              Log out
            </a>
          </li>
        </ul>
        <div className="search">
          {darkMode ? (
            <span className="icon">
              <img
                className="searchBtn"
                width="30"
                height="30"
                src="https://img.icons8.com/pastel-glyph/64/FFFFFF/search--v2.png"
                alt="search--v2"
              />

              <img
                className="closeBtn"
                width="20"
                height="20"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/delete-sign--v1.png"
                alt="delete-sign--v1"
              />
            </span>
          ) : (
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
          )}
        </div>
      </div>
      <div className="searchBox">
        <input
          type="text"
          onChange={handleName}
          onKeyDown={handleKeyPress}
          placeholder="Search game . . ."
        />
      </div>
    </header>
  );
}

export default Nav;
