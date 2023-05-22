import Card from "../Cards/Card";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  GenderFilter,
  reset,
  ratingFilter,
  orderFilter,
  sorceFilter,
  platformFilter,
  dateFilter,
  allFiltsFav,
} from "../../Redux/Actions";
import "./Favorites.css";

function Favorites() {
  // ----------------------------------------------------------------Selectors------------------------------------------------------------------------------
  const games = useSelector((state) => state.allFavs);
  const filters = useSelector((state) => state.filterFavs);
  const allGenres = useSelector((state) => state.allGenders);
  const allPlatforms = useSelector((state) => state.allPlatformsFav);
  const allDates = useSelector((state) => state.allDatesFav);
  const allfilters = useSelector((state) => state.filtersFav);
  const mode = useSelector((state) => state.mode);
  console.log(games);
  console.log(mode)
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const location = useLocation();

  // ----------------------------------------------------------------Paging------------------------------------------------------------------------------
  const [pages, setPages] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (pages - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------

  const handleNext = () => {
    setPages(pages + 1);
    const topElement = document.querySelector("#topElement");
    topElement.scrollIntoView({ behavior: "auto" });
  };

  const handlePrev = () => {
    setPages(pages - 1);
    const topElement = document.querySelector("#topElement");
    topElement.scrollIntoView({ behavior: "auto" });
  };

  const handleReset = () => {
    dispatch(reset());
    setPages(1);
    document.getElementById("Genders").selectedIndex = 0;
    document.getElementById("Ratings").selectedIndex = 0;
    document.getElementById("Order").selectedIndex = 0;
    document.getElementById("Source").selectedIndex = 0;
    document.getElementById("Platforms").selectedIndex = 0;
    document.getElementById("Date").selectedIndex = 0;
    const topElement = document.querySelector("#topElement");
    topElement.scrollIntoView({ behavior: "smooth" });
  };
  const handleGenresOptions = (event) => {
    dispatch(GenderFilter(event.target.value));
    setPages(1);
  };

  const handleRatingOptions = (event) => {
    dispatch(ratingFilter(event.target.value));
    setPages(1);
  };

  const handleOrderOptions = (event) => {
    dispatch(orderFilter(event.target.value));
    setPages(1);
  };

  const handleSourceOptions = (event) => {
    dispatch(sorceFilter(event.target.value));
    setPages(1);
  };

  const handlePlatforms = (event) => {
    dispatch(platformFilter(event.target.value));
    setPages(1);
  };

  const handleDateOptions = (event) => {
    dispatch(dateFilter(event.target.value));
    setPages(1);
  };

  useEffect(() => {
    dispatch(allFiltsFav(allfilters));
  }, [allfilters, dispatch]);

  // ----------------------------------------------------------------UseEffect-DarkMode-----------------------------------------------------------------------------
  useEffect(() => {
    let background_cards = document.querySelectorAll(".details");
    let card_h2 = document.querySelectorAll(".details h2");
    let card_span = document.querySelectorAll(".details h2 span");
    let rating_span = document.querySelectorAll(".rating span");
    let tags = document.querySelectorAll(".tags span");
    let infooo = document.querySelectorAll(".infooo");
    let toggelChecked = document.getElementById("darkmode-toohle");
    let checked = toggelChecked.checked;
    let header = document.querySelector("header");
    let logo = document.querySelector(".logo");
    let navLinks = document.querySelectorAll("header ul li a");
    let searchBox = document.querySelector(".searchBox");
    let input = document.querySelector(".searchBox input");
    let selects = document.querySelector(".container-selects");

    if (mode) {
      toggelChecked.checked = true;

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
      if (location.pathname == "/favorites") {
        selects.style.backgroundColor = "#0e1215";
        selects.style.border = "1px solid #0e1215";
      }
    } else {
      toggelChecked.checked = false;
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
      if (location.pathname === "/favorites") {
        selects.style.backgroundColor = "white";
        selects.style.border = "1px solid white";
      }
    }
  }, [mode]);

  useEffect(() => {
    const originalBackground = document.body.style.backgroundImage;
    const newBackground =
      "url(https://i.pinimg.com/originals/4c/ba/51/4cba51207cfecb2db9e21b8cdc5ca019.png)";

    document.body.style.backgroundImage = newBackground;

    return () => {
      document.body.style.backgroundImage = originalBackground;
    };
  }, []);
  return (
    <div>
      <a href="http://localhost:3000/home" id="topElement">
        a
      </a>
      <div className="container-selects">
        <select id="Genders" defaultValue="" onChange={handleGenresOptions}>
          <option value="" disabled hidden>
            Genders
          </option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select id="Ratings" defaultValue="" onChange={handleRatingOptions}>
          <option value="" disabled hidden>
            Ratings
          </option>
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four">4</option>
          <option value="five">5</option>
        </select>
        <select id="Order" defaultValue="" onChange={handleOrderOptions}>
          <option value="" disabled hidden>
            Order
          </option>
          <option value="Ascendent">Ascendent</option>
          <option value="Descendent">Descendent</option>
        </select>
        <select id="Source" defaultValue="" onChange={handleSourceOptions}>
          <option value="" disabled hidden>
            Source
          </option>
          <option value="Api">Api</option>
          <option value="dataBase">Data Base</option>
        </select>
        <select id="Platforms" defaultValue="" onChange={handlePlatforms}>
          <option value="" disabled hidden>
            Platforms
          </option>
          {allPlatforms.map((plat) => (
            <option value={plat} key={plat}>
              {plat}
            </option>
          ))}
        </select>
        <select id="Date" defaultValue="" onChange={handleDateOptions}>
          <option value="" disabled hidden>
            Date
          </option>
          {allDates.map((date) => (
            <option value={date} key={date}>
              {date}
            </option>
          ))}
        </select>
        <button className="reset-buton" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="container">
        {filters &&
          filters.slice(startIndex, endIndex).map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                name={e.name}
                image={e.image}
                platforms={e.platforms}
                rating={e.rating}
                genders={e.genders}
                released={e.released}
              />
            );
          })}
      </div>
      <div className="button-container">
        <button onClick={handlePrev} disabled={pages === 1}>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/plasticine/50/000000/left-squared.png"
            alt="left-squared"
          />
        </button>
        <button>
          <div>{pages}</div>
        </button>
        <button onClick={handleNext} disabled={endIndex >= filters.length}>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/plasticine/50/000000/right-squared.png"
            alt="right-squared"
          />
        </button>
      </div>
    </div>
  );
}

export default Favorites;
