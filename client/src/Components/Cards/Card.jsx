import { Link } from "react-router-dom";
import "./Card.css";

function Card({ id, name, image, platforms, rating, genders }) {
  return (
    <div>
      <div className="card">
        <h2>{name}</h2>
        <h2>Platforms:{platforms.join(", ")}</h2>
        <img src={image}></img>
        <h2>{rating}</h2>
        {genders && (
          <span>
            {genders.map((gender) => (
              <h2 key={gender.name}>{gender.name}</h2>
            ))}
          </span>
        )}
        <Link to={`/detail/${id}`}>
          <button>+INFO</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
