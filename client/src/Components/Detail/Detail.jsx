// const videogamesbyID = {
//   id: data.id,
//   name: data.name,
//   description: data.description,
//   platforms: HandlePlatformNames(data.platforms),
//   image: data.background_image,
//   released: data.released,
//   Genders: data.genres,
// };


import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getGameById } from "../../Redux/Actions";

function Detail() {
  const games = useSelector((state) => state.idGame);
  const { id } = useParams();
  const dispatch = useDispatch();
console.log(games)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/id/${id}`);
       console.log(response)
        dispatch(getGameById(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div>
      <div >
        <h2>{games.name}</h2>
        <h2>{games.description}</h2>
        <h2>Platforms:{games.platforms?.join(", ")}</h2>
        <img src={games.image}></img>
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
