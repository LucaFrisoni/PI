import { Link } from "react-router-dom";
import "./Card.css";
import img_star from "../../Assets/icons8-estrella-16.png";
import info from "../../Assets/icons8-información-24.png";
import calendar from "../../Assets/icons8-calendario-24.png";

function Card({ id, name, image, platforms, rating, genders, released }) {
  <img
    width="16"
    height="16"
    src="https://img.icons8.com/fluency/16/000000/star-half-empty.png"
    alt="star-half-empty"
  />;
  const hanldeStars = () => {
    if (rating <= 1.4) {
      return  (<div className="rating"><img alt="star" src={img_star}></img>  <span>{rating}</span></div>)
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
          />  <span>{rating}</span>
        </div>
      );
    }
    if (rating > 1.99 && rating <= 2.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>  <span>{rating}</span>
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
          />  <span>{rating}</span>
        </div>
      );
    }
    if (rating > 2.99 && rating <= 3.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>  <span>{rating}</span>
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
          />  <span>{rating}</span>
        </div>
      );
    }
    if (rating > 3.99 && rating <= 4.4) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>
          <img alt="star" src={img_star}></img>  <span>{rating}</span>
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
          />  <span>{rating}</span>
        </div>
      );
    }
    if (rating === 5) {
      return (
        <div className="rating">
          <img alt="star" src={img_star}></img>  
          <img alt="star" src={img_star}></img>  
          <img alt="star" src={img_star}></img>  
          <img alt="star" src={img_star}></img>  
          <img alt="star" src={img_star}></img>    <span>{rating}</span>
        </div>
      );
    }
  };

  return (
    <div className="card">
      <div className="poster">
        <img alt="game_image" src={image}></img>
      </div>
      <div className="details">
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
