import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { getGameById } from "../../Redux/Actions";
import { resetId } from "../../Redux/Actions";
import axios from "axios";
import "./Detail.css";

function Detail() {
  // ----------------------------------------------------------------Selectors------------------------------------------------------------------------------
  const games = useSelector((state) => state.idGame);
  
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ----------------------------------------------------------------Effects------------------------------------------------------------------------------
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/videogames/id/${id}`
        );
        console.log(response);
        dispatch(getGameById(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement && games.image) {
      rootElement.style.backgroundImage = `url(${games.image})`;
      rootElement.style.backgroundSize = "cover";
      rootElement.style.backgroundRepeat = "no-repeat";
      rootElement.style.backgroundPosition = "center";
      rootElement.style.height = "100vh";
      rootElement.style.overflow = "hidden";
    }
    // Cleanup function
    return () => {
      if (rootElement) {
        rootElement.style.backgroundImage = "";
        rootElement.style.backgroundSize = "";
        rootElement.style.backgroundRepeat = "";
        rootElement.style.backgroundPosition = "";
        rootElement.style.height = "";
        rootElement.style.overflow = "";
      }
    };
  }, [games.image]);
  // ----------------------------------------------------------------Handler------------------------------------------------------------------------------
  
  const handleBack = () => {
    dispatch(resetId());
    navigate(-1)
  };
  return (
    <div className="full">
      <div className="glass-container">
        <Link to="/home">
          <a href="http://localhost:3000/home" onClick={handleBack}>
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/pastel-glyph/64/000000/circled-left.png"
              alt="circled-left"
            />
          </a>
        </Link>
        <h1 className="color-changing-title">{games.name}</h1>
        <span className="desc">Descritpion:</span>
        <textarea 
        className="justify-content"
          name=""
          id=""
          cols="180"
          rows="10"
          value={
            games.description
              ? games.description
                  .replace(/<\/?p>|<br\s*\/?>/gi, "")
                  .replace(/\n/g, "")
              : "No description available"
          }
        ></textarea>

        <span className="spanit">Play it on:</span>
        <ul className="lista">
          {games.platforms &&
            games.platforms.map((platform, index) => (
              <li className="liii" key={index}>
                {platform}
              </li>
            ))}
        </ul>

        <h2 className="date">{games.released}</h2>
        {games.Genders && (
          <span className="genres-span">
            {games.Genders.map((gender) => (
              <h2 className="genre-title" key={gender.name}>{gender.name}</h2>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export default Detail;
