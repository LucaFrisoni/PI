import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getGameById } from "../../Redux/Actions";
import { resetId } from "../../Redux/Actions";

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

  return (
    <div>
      <div>
        <h2>{games.name}</h2>
        <Link to="/home">
          <button onClick={handleBack}>Back</button>
        </Link>
        <h2>
        {games.description ? games.description.replace(/<\/?p>|<br\s*\/?>/gi, "").replace(/\n/g, "") : 'No description available'}
        </h2>
        <h2>Platforms:{games.platforms?.join(", ")}</h2>
        <img src={games.image} alt={games.name_ + "a"}/>
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
