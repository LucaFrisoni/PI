import padlock from "../../Assets/icons8-candado-30.png";
import email from "../../Assets/icons8-nuevo-post-30.png";
import userrr from "../../Assets/icons8-usuario-30.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";

function SignUp() {
  useEffect(() => {
    // Guardar los estilos originales del body
    const originalStyles = {
      display: document.body.style.display,
      justifyContent: document.body.style.justifyContent,
      minHeight: document.body.style.minHeight,
      background: document.body.style.background,
      alignItems: document.body.style.alignItems,
    };

    // Aplicar los nuevos estilos al body
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.background = "#223243";
    document.body.style.alignItems = "center";

    // Restaurar los estilos originales al desmontar el componente
    return () => {
      document.body.style.display = originalStyles.display;
      document.body.style.justifyContent = originalStyles.justifyContent;
      document.body.style.minHeight = originalStyles.minHeight;
      document.body.style.background = originalStyles.background;
      document.body.style.alignItems = originalStyles.alignItems;
    };
  }, []);

  const URL = "http://localhost:3001/users";

  async function validate(user) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const error = {};
    if (user.userName.length > 30) {
      error.userName = "User name too long";
    }
    if (user.userName) {
      const { data } = await axios.get(URL);
      const userFind = data.allUsers.find(
        (userr) => userr.userName === user.userName
      );

      if (userFind) {
        error.userName = "User name already exists";
      }
    }

    if (!emailRegex.test(user.email)) {
      error.email = "You must enter a valid email";
    }
    if (user.email) {
      const { data } = await axios.get(URL);
      const mailFind = data.allUsers.find(
        (userr) => userr.email === user.email
      );

      if (mailFind) {
        error.email = "Email already exists";
      }
    }
    if (!passwordRegex.test(user.password)) {
      error.password =
        "You must enter a password with a capital leter, a number and a special character";
    }
    if (user.password !== user.confirm_password) {
      error.confirm_password = "Passwords are not the same";
    }
    return error;
  }
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputs = (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;
    setUser({
      ...user,
      [input_name]: input_value,
    });
    if (flag === true) {
      setFlag(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      if (flag) {
        setFlag(false); // Cambia flag a false si ya se creó un usuario anteriormente
      } else {
        axios
          .post("http://localhost:3001/users/createuser", {
            userName: user.userName,
            email: user.email,
            password: user.password,
          })
          .then(() => {
            setFlag(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  console.log(user.userName);
  console.log(user.email);
  console.log(user.password);
  return (
    <div className="sign-body">
      <div className="container_sign">
        <form onSubmit={handleSubmit} className="form signup">
          <h2>Sign up</h2>
          <div className="inputBox">
            <input
              type="text"
              required
              name="userName"
              value={user.userName}
              onChange={handleInputs}
            ></input>
            <img className="img-sign" src={userrr}></img>
            <span className="sign-span">Username</span>
            <p>{errors.userName}</p>
          </div>
          <div className="inputBox">
            <input
              type="email"
              required
              name="email"
              value={user.email}
              onChange={handleInputs}
            ></input>
            <img className="img-sign" src={email}></img>
            <span className="sign-span">Email address</span>
            <p>{errors.email}</p>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required
              name="password"
              value={user.password}
              onChange={handleInputs}
            ></input>
            <img className="img-sign" src={padlock}></img>
            <span className="sign-span">Create Password</span>
            <p>{errors.password}</p>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required
              name="confirm_password"
              value={user.confirm_password}
              onChange={handleInputs}
            ></input>
            <img className="img-sign" src={padlock}></img>
            <span className="sign-span">Confirm Password</span>
            <p>{errors.confirm_password}</p>
          </div>
          <div className="inputBox">
            <input type="submit" value="Create Account"></input>
          </div>
          <p id="userCreatedMessage">{flag ? "User created!" : null}</p>
          <p>
            Already a member ?{" "}
            <a href="http://localhost:3000/" className="login">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
