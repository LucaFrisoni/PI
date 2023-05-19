import "./Create.css";
import axios from "axios";
import { useState, useEffect } from "react";
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
          platforms: [...inputs.platforms, { platform: { name: name } }],
        })
      );
    }

    if (!checked && inputs.platforms.length > 0) {
      const filteredGenres = inputs.platforms.filter((plat) => plat.platform.name !== name);
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
    
    }

    if (!checked && inputs.genres.length > 0) {
      const filteredGenres = inputs.genres.filter((gen) => gen !== name);
      setInputs({
        ...inputs,
        genres: filteredGenres,
      });
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
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(inputs);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(URL, {
          name: inputs.name,
          description: inputs.textarea,
          platforms: inputs.platforms,
          image: inputs.img,
          released: inputs.date,
          rating: Number(inputs.rating),
          genres: inputs.genres,
        });
  
        const message = response.data.message;
        console.log(response.data.message);
        setMessage(message);
      } catch (error) {
        const messageError = error.response.data.message;
        console.log(error.response.data.message);
        setMessage(messageError);
      }
    }
  };
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.margin = "0";
      rootElement.style.padding = "0";
      rootElement.style.border = "none";
      rootElement.style.background = "#223243";
    }

    // Cleanup function
    return () => {
      if (rootElement) {
        rootElement.style.margin = "";
        rootElement.style.padding = "";
        rootElement.style.border = "";
        rootElement.style.background = ""; // Restaurar el fondo original si es necesario
      }
    };
  }, []);
  return (
    <div className="container-flex">
      <div className="container-form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Create your Game!</h2>
          <img  className="img-transform" width="100" height="100" src="https://img.icons8.com/nolan/100/create-new.png" alt="create-new"/>
          <div className="inputBox">
            <input
              id="game-name"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
            ></input>
            <span className="form-span">Game name</span>
            <p className="error-p">{errors.name}</p>
          </div>
          <div className="inputBox">
            <input
              type="url"
              id="image"
              name="img"
              value={inputs.img}
              onChange={handleChange}
              required
            ></input>
            <span className="form-span">Img Url</span>
            <p className="error-p">{errors.img}</p>
          </div>
          <div>
            <textarea
              name="textarea"
              value={inputs.textarea}
              onChange={handleChange}
            ></textarea>
            <p className="error-p">{errors.textarea}</p>
          </div>
          <div className="inputBox">
            <input
              id="date"
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
            ></input>
            <span className="form-spannn">Date Released</span>
            <p className="error-p">{errors.date}</p>
          </div>
          <div className="inputBox">
            <input
              type="number"
              id="rating"
              name="rating"
              step="0.01"
              min="0"
              max="5.01"
              value={inputs.rating}
              onChange={handleChange}
              required
            />
            <span className="form-spann" htmlFor="rating">
              Rating
            </span>
            <p className="error-p">{errors.rating}</p>
          </div>
          <h2 className="genres-text">Genres:</h2>
          <div>
            <ul>
            {genders.map((gender) => (
              <li className="lis" key={gender.name}>
              <div >
                <label htmlFor={gender.name}>{gender.name}</label>
                <input
                  type="checkbox"
                  name={gender.id}
                  id={"id_" + gender.name}
                  value={gender.name}
                  checked={CheckGenders.gender}
                  onClick={handleCheckGenders}
                />
              </div></li>
            ))}</ul>
            <p className="error-p">{errors.genres}</p>
          </div>
          <h2 className="genres-plat">Platforms:</h2>
          <div id="platforms_form_div">
            <ul>
              {platforms.map((plat) => (
                <li className="lis" key={plat}>
                  <div>
                    <label htmlFor={plat}>-{plat}</label>
                    <input
                      type="checkbox"
                      name={plat}
                      id={"id_" + plat}
                      value={plat}
                      checked={checkPlatforms.plat}
                      onClick={handleCheckPlatforms}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="error-p">{errors.platforms}</p>
          {Object.keys(errors).length === 0 ? (
            <div className="inputBox">
              <input value="Create" type="submit"></input>
            </div>
          ) : null}
          {message && <p className="succes">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Create;
