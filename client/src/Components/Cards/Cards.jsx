import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  GenderFilter,
  reset,
  ratingFilter,
  orderFilter,
  sorceFilter,
  platformFilter,
  dateFilter,
  allFilts,
} from "../../Redux/Actions";
import Card from "./Card";
import "./Cards.css";

function Cards() {
  // ----------------------------------------------------------------Selectors------------------------------------------------------------------------------
  const games = useSelector((state) => state.allVideoGames);
  const filters = useSelector((state) => state.filtersGames);
  const allGenres = useSelector((state) => state.allGenders);
  const allPlatforms = useSelector((state) => state.allPlatforms);
  const allDates = useSelector((state) => state.allDates);
  const allfilters = useSelector((state) => state.filters);
  console.log(allGenres);
  console.log(allPlatforms);
  console.log(games);

  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  const dispatch = useDispatch();

  // ----------------------------------------------------------------Paging------------------------------------------------------------------------------
  const [pages, setPages] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (pages - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
  const handleNext = () => {
    setPages(pages + 1);
    const topElement = document.querySelector('#topElement')
    topElement.scrollIntoView({ behavior: 'auto' });
  };

  const handlePrev = () => {
    setPages(pages - 1);
    const topElement = document.querySelector('#topElement')
    topElement.scrollIntoView({ behavior: 'auto' });
  };

  const handleGenresOptions = (event) => {
    dispatch(GenderFilter(event.target.value));
    setPages(1);
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
    const topElement = document.querySelector('#topElement')
    topElement.scrollIntoView({ behavior: 'smooth' });
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
    dispatch(allFilts(allfilters));
  }, [allfilters, dispatch]);

  useEffect(() => {
    const originalBackground = document.body.style.backgroundImage;
    const newBackground =
      "url(https://i.pinimg.com/originals/4c/ba/51/4cba51207cfecb2db9e21b8cdc5ca019.png)";

    document.body.style.backgroundImage = newBackground;

    return () => {
      document.body.style.backgroundImage = originalBackground;
    };
  }, []);

  /// Selects : Genders: // Ratings(de numes) // ORDER -ASC O DESC // SOURCE DATABASE-API // PLATFORMS PS5-PS4 ETC.. // DATE => podes hacer un input que busque los
  return (
    <div>
      <a href="http://localhost:3000/home" id="topElement">a</a>
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
        <button className="reset-buton" onClick={handleReset}>Reset</button>
      </div>

      <div className="container">
        {(filters && filters.length > 0 ? filters : games)
          .slice(startIndex, endIndex)
          .map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                name={e.name}
                image={e.image}
                platforms={e.platforms}
                rating={e.rating}
                genders={e.Genders}
                released={e.released}
              />
            );
          })}
      </div>
      <div className="button-container">
        <button onClick={handlePrev} disabled={pages === 1}>
        <img width="50" height="50" src="https://img.icons8.com/plasticine/50/000000/left-squared.png" alt="left-squared"/>
        </button>
        <button><div>{pages}</div></button>
        <button onClick={handleNext} disabled={endIndex >= filters.length}>
        <img width="50" height="50" src="https://img.icons8.com/plasticine/50/000000/right-squared.png" alt="right-squared"/>
        </button>
      </div>
    </div>
  );
}

export default Cards;
