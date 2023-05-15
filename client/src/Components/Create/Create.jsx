import "./Create.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function Create() {
  const platforms = useSelector((state) => state.allPlatforms);
  const genders = useSelector((state) => state.allGenders);

  const URL = "http://localhost:3001/videogames/posteos";
  // ----------------------------------------------------------------States------------------------------------------------------------------------------
  const [inputs, setInputs] = useState({
    name: "",
    textarea: "",
    date: "",
    rating: "",
    img: "",
    genres: [],
    platforms: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    textarea: "",
    date: "",
    rating: "",
    img: "",
    genres: [],
    platforms: [],
  });

  const CheckPlatforms = {};
  platforms.forEach((plat) => {
    CheckPlatforms[plat] = false;
  });

  const CheckGenders = {};
  genders.forEach((gender) => {
    CheckGenders[gender.name] = false;
  });

  const [checkPlatforms, setCheckPlatforms] = useState(CheckPlatforms);
  const [checkGenders, setCheckGenders] = useState(CheckGenders);
  const [message, setMessage] = useState("");

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
  const validateImage = (url) => {
    const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
    return imageExtensions.test(url);
  };

  const validate = (inputs) => {
    const error = {};
    if (!inputs.name.trim()) {
      error.name = "You must add the name of the Videogame";
    }
    if (inputs.name.length > 80) {
      error.name = "Name shouldnt pass 80 characters, including spaces";
    }
    if (!inputs.textarea.trim()) {
      error.textarea = "You must add a description";
    }
    if (!inputs.date) {
      error.date = "You must add the released date";
    }
    if (!inputs.rating) {
      error.rating = "You must add the rating of the game";
    }
    if (inputs.rating > 5) {
      error.rating = "Rating shouldnt be more than 5";
    }
    if (inputs.rating < 0) {
      error.rating = "Rating shouldnt be less than 0";
    }
    if (inputs.genres.length === 0) {
      error.genres = "You must select at least one genre";
    }
    if (inputs.platforms.length === 0) {
      error.platforms = "You must select at least one platform";
    }
    if (!inputs.img) {
      error.img = "You must add the image of the game";
    }
    if (inputs.img) {
      const validImage = validateImage(inputs.img);
      if (!validImage) {
        error.img = "Only jpg, jpge, png and gif format are accepted";
      }
    }

    return error;
  };

  // const { name, checked } = event.target;
  // setInputs({
  //   ...inputs,
  //   genres: {
  //     ...inputs.genres,
  //     [name]: !inputs.genres.[name],
  //   },

  const handleCheckPlatforms = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setInputs({
        ...inputs,
        platforms: [...inputs.platforms, { platform: { name: name } }],
      });
      setErrors(
        validate({
          ...inputs,
          platforms: [...inputs.platforms, name],
        })
      );
    }

    if (!checked && inputs.platforms.length > 0) {
      const filteredGenres = inputs.platforms.filter((plat) => plat !== name);
      setInputs({
        ...inputs,
        platforms: filteredGenres,
      });
      setErrors(
        validate({
          ...inputs,
          platforms: filteredGenres,
        })
      );
    }
    setCheckPlatforms({ ...checkPlatforms, [name]: !checkPlatforms[name] });
  };
  const handleCheckGenders = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setInputs({
        ...inputs,
        genres: [...inputs.genres, name],
      });
      setErrors(
        validate({
          ...inputs,
          genres: [...inputs.genres, name],
        })
      );
    }

    if (!checked && inputs.genres.length > 0) {
      const filteredGenres = inputs.genres.filter((gen) => gen !== name);
      setInputs({
        ...inputs,
        genres: filteredGenres,
      });
      setErrors(
        validate({
          ...inputs,
          genres: filteredGenres,
        })
      );
    }

    setCheckGenders({ ...checkGenders, [name]: !checkGenders[name] });
  };
  console.log(inputs.genres);
  console.log(inputs.platforms);
  const handleChange = (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;

    setInputs({
      ...inputs,
      [input_name]: input_value,
    });
    setErrors(
      validate({
        ...inputs,
        [input_name]: input_value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(URL, {
        name: inputs.name,
        description: inputs.textarea,
        platforms: inputs.platforms,
        image: inputs.img,
        released:inputs.date,
        rating: Number(inputs.rating),
        genres: inputs.genres,
      })
      .then((response) => {
        const message = response.data.message;
        console.log(response.data.message);
        setMessage(message);
      })
      .catch((error) => {
        const mesagge_error =error.response.data.message;
         console.log(error.response.data.message);
         setMessage(mesagge_error);
      });
  };

  //Pensar ValidateImg
  return (
    <div className="page_form">
      <h1>Create your Game!</h1>
      <div className="container-flex">
        <div className="container-form">
          <form className="container-form" onSubmit={handleSubmit}>
            <div>
              <label>Game name</label>
              <input
                id="game-name"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              ></input>
              <p>{errors.name}</p>
            </div>
            <div>
              <label>Img Url</label>
              <input
                type="url"
                id="image"
                name="img"
                value={inputs.img}
                onChange={handleChange}
              ></input>
              <p>{errors.img}</p>
            </div>
            <div>
              <textarea
                name="textarea"
                value={inputs.textarea}
                onChange={handleChange}
              ></textarea>
              <p>{errors.textarea}</p>
            </div>
            <div>
              <label>Date Released</label>
              <input
                id="date"
                type="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
              ></input>
              <p>{errors.date}</p>
            </div>
            <div>
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                step="0.01"
                min="0"
                max="5"
                value={inputs.rating}
                onChange={handleChange}
              />
              <p>{errors.rating}</p>
            </div>
            <h2 className="genres-text">Genres:</h2>
            <div>
              {genders.map((gender) => (
                <div key={gender.name}>
                  <label htmlFor={gender.name}>{gender.name}</label>
                  <input
                    type="checkbox"
                    name={gender.id}
                    id={"id_" + gender.name}
                    value={gender.name}
                    checked={CheckGenders.gender}
                    onClick={handleCheckGenders}
                  />
                </div>
              ))}
              <p>{errors.genres}</p>
            </div>
            <h2 className="genres-plat">Platforms:</h2>
            <div id="platforms_form_div">
              {platforms.map((plat) => (
                <div key={plat}>
                  <label htmlFor={plat}>{plat}</label>
                  <input
                    type="checkbox"
                    name={plat}
                    id={"id_" + plat}
                    value={plat}
                    checked={checkPlatforms.plat}
                    onClick={handleCheckPlatforms}
                  />
                </div>
              ))}
            </div>
            <p>{errors.platforms}</p>
            {Object.keys(errors).length === 0 ? (
              <button type="submit">
                Send
              </button>
            ) : null}
           {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
