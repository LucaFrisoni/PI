import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameById } from "../../Redux/Actions";
import { resetId } from "../../Redux/Actions";
import axios from "axios";
import "./Detail.css"

function Detail() {
  const games = useSelector((state) => state.idGame);
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const handleBack = () => {
    dispatch(resetId())
  };

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
  


  return (
    <div className="full">
      <div className="glass-container">
        <Link to="/home">
          <button onClick={handleBack}>Back</button>
        </Link>
        <h1>{games.name}</h1>
        <h2>
        {games.description ? games.description.replace(/<\/?p>|<br\s*\/?>/gi, "").replace(/\n/g, "") : 'No description available'}
        </h2>
        <h2>Platforms:{games.platforms?.join(", ")}</h2>
  
        <h2>{games.released}</h2>
        {games.Genders && (
          <span>
            {games.Genders.map((gender) => (
              <h2 key={gender.name}>{gender.name}</h2>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export default Detail;
