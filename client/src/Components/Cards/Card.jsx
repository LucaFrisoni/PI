import img_star from "../../Assets/icons8-estrella-16.png";
import info from "../../Assets/icons8-información-24.png";
import calendar from "../../Assets/icons8-calendario-24.png";
import { Link,useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios"
import "./Card.css";

function Card({ id, name, image, platforms, rating, genders, released }) {
  
  // ----------------------------------------------------------------Hooks-----------------------------------------------------------------------------
  const dispatch = useDispatch();
const location =useLocation()
// ----------------------------------------------------------------Selectors-----------------------------------------------------------------------------
const favoritesGames = useSelector((state)=> state.allFavs)
const mode = useSelector((state)=> state.mode)


  // ----------------------------------------------------------------State-----------------------------------------------------------------------------
  const [heart, setHeart] = useState(false);
 
  // ----------------------------------------------------------------Handlers-Stars-----------------------------------------------------------------------------
  const hanldeStars = () => {
    if (rating <= 1.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img> <span>{rating}</span>
        </div>
      );
    }
    if (rating > 1.4 && rating <= 1.99) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img
            className="star_del"
            width="16"
            height="16"
            src="https://img.icons8.com/fluency/16/000000/star-half-empty.png"
            alt="star-half-empty"
          />{" "}
          <span>{rating}</span>
        </div>
      );
    }
    if (rating > 1.99 && rating <= 2.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img> <span>{rating}</span>
        </div>
      );
    }
    if (rating > 2.4 && rating <= 2.99) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img
            width="16"
            height="16"
            src="https://img.icons8.com/fluency/16/000000/star-half-empty.png"
            alt="star-half-empty"
            className="star_del"
          />{" "}
          <span>{rating}</span>
        </div>
      );
    }
    if (rating > 2.99 && rating <= 3.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img> <span>{rating}</span>
        </div>
      );
    }
    if (rating > 3.4 && rating <= 3.99) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img
            width="16"
            height="16"
            src="https://img.icons8.com/fluency/16/000000/star-half-empty.png"
            alt="star-half-empty"
            className="star_del"
          />{" "}
          <span>{rating}</span>
        </div>
      );
    }
    if (rating > 3.99 && rating <= 4.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img> <span>{rating}</span>
        </div>
      );
    }
    if (rating > 4.4 && rating <= 4.99) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img
            className="star_del"
            width="17"
            height="17"
            src="https://img.icons8.com/fluency/16/000000/star-half-empty.png"
            alt="star-half-empty"
          />{" "}
          <span className="">{rating}</span>
        </div>
      );
    }
    if (rating >= 5) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img> <span>{rating}</span>
        </div>
      );
    }
  };
  // ----------------------------------------------------------------Favs-----------------------------------------------------------------------------

  const handleFav = async() => {
    if (heart) {
      setHeart(false);
  await axios.delete(`http://localhost:3001/favorites/${id}`)
    } else {
      setHeart(true);
   await axios.post("http://localhost:3001/favorites/posteo",{id,name,image,rating,genders,released,platforms})
    }
  };

  useEffect(() => {
    favoritesGames.forEach((fav) => {
      if (isNaN(fav.id)) { // Si el id no es un número
        if (fav.id === id) {
          setHeart(true);
        }
      } else { // Si el id es un número
        if (parseInt(fav.id) === parseInt(id)) {
          setHeart(true);
        }
      }
    });
  }, [favoritesGames, id]);

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
    if (location.pathname == "/home") {
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
    if (location.pathname === "/home") {
      selects.style.backgroundColor = "white";
      selects.style.border = "1px solid white";
    }
  }
}, [mode]);

  return (
    <div className="card">
      <div className="poster">
        <img alt="game_image" src={image}></img>
      </div>
      <div className="details">
        <div className="favs-btn">
          {heart ? (
            <button className="favs-btn pulse" onClick={handleFav}>
              ❤️
            </button>
          ) : (
            <button className="favs-btn" onClick={handleFav}>
              🤍
            </button>
          )}
        </div>
        <h2>
          {name}
          <br></br>
          <br></br>
          <span>
            <img alt="calendar" className="calendar" src={calendar}></img>
            {released}
          </span>
        </h2>
        {hanldeStars()}
        <div className="tags">
          {genders.map((gender) => (
            <span key={gender.name}>{gender.name}</span>
          ))}
        </div>
        <div className="info">
          <br></br>
          <br></br>
          <Link to={`/detail/${id}`}>
            <img alt="info" className="infooo" src={info}></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
