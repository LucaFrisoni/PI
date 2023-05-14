import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import {
  GenderFilter,
  reset,
  ratingFilter,
  orderFilter,
  sorceFilter,
  platformFilter,
  dateFilter,
  allFilts
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
  };

  const handlePrev = () => {
    setPages(pages - 1);
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



  /// Selects : Genders: // Ratings(de numes) // ORDER -ASC O DESC // SOURCE DATABASE-API // PLATFORMS PS5-PS4 ETC.. // DATE => podes hacer un input que busque los
  return (
    <div>
      <h1>Home</h1>
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
        <button onClick={handleReset}>Reset</button>
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
              />
            );
          })}
      </div>
      <div className="button-container">
        <button onClick={handlePrev} disabled={pages === 1}>
          Prev
        </button>
        <button>{pages}</button>
        <button
          onClick={handleNext}
          disabled={endIndex >= filters.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Cards;
