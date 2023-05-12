import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Card from "./Card";
import "./Cards.css";

function Cards() {
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  // ----------------------------------------------------------------Selectors------------------------------------------------------------------------------
  const games = useSelector((state) => state.allVideoGames);
  const filters = useSelector((state) => state.filtersGames);
  const allGenres = useSelector((state) => state.allGenders);
  console.log(allGenres)
  // ----------------------------------------------------------------Paging------------------------------------------------------------------------------
  console.log(games);
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
  /// Selects : Genders: // Ratings(de numes) // ORDER -ASC O DESC // SOURCE DATABASE-API // PLATFORMS PS5-PS4 ETC.. // DATE
  return (
    <div>
      <h1>Home</h1>
      <div className="container-selects">
        <select id="Genders">
          {allGenres.map((genre) => (
            <option key={genre.id}  value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <select></select>
        <select></select>
        <select></select>
        <select></select>
        <select></select>
      </div>
      <div className="container">
        {(filters.length > 0 ? filters : games)
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
        <button onClick={handleNext} disabled={endIndex >= games.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Cards;
