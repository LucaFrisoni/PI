import padlock from "../../Assets/icons8-candado-30.png";
import email from "../../Assets/icons8-nuevo-post-30.png";
import userrr from "../../Assets/icons8-usuario-30.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function Forgot() {
  // ----------------------------------------------------------------States------------------------------------------------------------------------------
  const URL = "http://localhost:3001/users";

  const [flag, setFlag] = useState(false);
  const [changeForgot, setChangeForgot] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    confirmUserName: "",
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

  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------
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
    if (user.password) {
      const { data } = await axios.get(URL);
      const passwordFind = data.allUsers.find(
        (userr) => userr.password === user.password
      );

      if (passwordFind) {
        error.password = "Password already exists";
      }
    }
    if (user.password) {
      if (!passwordRegex.test(user.password)) {
        error.password =
          "You must enter a password with a capital leter, a number and a special character";
      }
    }
    if (user.password !== user.confirm_password) {
      error.confirm_password = "Passwords are not the same";
    }
    if (user.userName !== user.confirmUserName) {
      error.confirmUserName = "Users are not the same";
    }
    return error;
  }

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
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
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (changeForgot) {
        if (flag) {
          setFlag(false); // Cambia flag a false si ya se creó un usuario anteriormente
        } else {
          axios
            .put("http://localhost:3001/users/changeusername", {
              email: user.email,
              userName: user.userName,
            })
            .then(() => {
              setFlag(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        if (flag) {
          setFlag(false); // Cambia flag a false si ya se creó un usuario anteriormente
        } else {
          axios
            .put("http://localhost:3001/users/changepassword", {
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
    }
  };
  const handleForgotUser = () => {
    setChangeForgot(!changeForgot);
  };
  // ----------------------------------------------------------------Style-effect------------------------------------------------------------------------------
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

  return (
    <div>
      {changeForgot ? (
        <div className="sign-body">
          <div className="container_sign">
            <form onSubmit={handleSubmit} className="form">
              <h2>Forgot Username?</h2>
              <div className="inputBox">
                <input
                  type="email"
                  required
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                ></input>
                <img alt="imagen" className="img-sign" src={email}></img>
                <span className="sign-span">Email address</span>
                <p className="erorrp">{errors.email}</p>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  name="userName"
                  value={user.userName}
                  onChange={handleInputs}
                ></input>
                <img alt="imagen" className="img-sign" src={userrr}></img>
                <span className="sign-span">Username</span>
                <p className="erorrp">{errors.userName}</p>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  name="confirmUserName"
                  value={user.confirmUserName}
                  onChange={handleInputs}
                ></input>
                <img alt="imagen" className="img-sign" src={userrr}></img>
                <span className="sign-span">Confirm Username</span>
                <p className="erorrp">{errors.confirmUserName}</p>
              </div>
              <div className="inputBox">
                <input type="submit" value="Change Username"></input>
              </div>
              <p id="userCreatedMessage">{flag ? "Username change!" : null}</p>
              <p>
                Already a member ?{" "}
                <a href="http://localhost:3000/" className="login">
                  Log in
                </a>
                <br></br>
                Forgot Password?
                <a onClick={handleForgotUser} href="#" className="login">
                  Change password
                </a>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div className="sign-body">
          <div className="container_sign">
            <form onSubmit={handleSubmit} className="form">
              <h2>Forgot Password?</h2>
              <div className="inputBox">
                <input
                  type="email"
                  required
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                ></input>
                <img alt="imagen" className="img-sign" src={email}></img>
                <span className="sign-span">Email address</span>
                <p className="erorrp">{errors.email}</p>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  required
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                ></input>
                <img alt="imagen" className="img-sign" src={padlock}></img>
                <span className="sign-span">New Password</span>
                <p className="erorrp">{errors.password}</p>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  required
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={handleInputs}
                ></input>
                <img alt="imagen" className="img-sign" src={padlock}></img>
                <span className="sign-span">Confirm Password</span>
                <p className="erorrp">{errors.confirm_password}</p>
              </div>
              <div className="inputBox">
                <input type="submit" value="Change Password"></input>
              </div>
              <p id="userCreatedMessage">{flag ? "Password Change" : null}</p>
              <p>
                Already a member ?{" "}
                <a href="http://localhost:3000/" className="login">
                  Log in
                </a>
                <br></br>
                Forgot User Name?
                <a onClick={handleForgotUser} href="#" className="login">
                  Change user name
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forgot;
