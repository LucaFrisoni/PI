import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
function Login({handleLogin}) {
  const URL = "http://localhost:3001/users";
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  const navigate = useNavigate();
  
  // ----------------------------------------------------------------States------------------------------------------------------------------------------
  const [submitted, setSubmitted] = useState(false)

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
  });
  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------

  async function validate(user) {
    const error = {};
    console.log("si me submitie");
    if (user.userName) {
      const { data } = await axios.get(URL);
      const userFind = data.allUsers.find(
        (userr) => userr.userName === user.userName
      );
      console.log(userFind);
      if (!userFind) {
        error.userName = "User doesn't exist";
        return error;
      }
    }
    if (user.password) {
      const { data } = await axios.get(URL);
      const passwordFind = data.allUsers.find(
        (userr) => userr.password === user.password
      );
      console.log(passwordFind);
      if (!passwordFind) {
        error.password = "Invalid password";
      }
    }

    return error;
  }

  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------

  useEffect(() => {
    // Aplicar estilos al body cuando el componente se monta
    
    document.body.style.background = "black";

    // Restaurar los estilos originales del body cuando el componente se desmonta
    return () => {
      document.body.style.background = "";
    };
  }, []);
  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------

  const handleInputs = (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;
    setUser({
      ...user,
      [input_name]: input_value,
    });
  };
  console.log(user.userName);
  console.log(user.password);

  const handleSubmit = async (event) => {
    console.log("estoy submit")
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);
    setSubmitted(true)
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("isLoggedIn", "true");
      handleLogin(); // Llamar a la función onLogin pasada por props
      navigate("/home");
    
    }
    setSubmitted(false)
  };

  return (
    <div>
      <section className="section-login">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <div className="signin">
          <div className="content">
            <h2>SIGN IN</h2>

            <form className="form" onSubmit={handleSubmit}>
              <div className="inputBx">
                <input
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleInputs}
                  required
                ></input>
                <i>Username</i>
                <p className="error-login">{errors.userName}</p>
              </div>
              <div className="inputBx">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  required
                ></input>
                <i>Password</i>
                <p className="error-login">{errors.password}</p>
              </div>
              <div className="links">
                <a className="signin_btn" href="http://localhost:3000/forgotpassword">
                  Forgot Password
                </a>

                <a href="http://localhost:3000/sign">Sign up</a>
              </div>
              <div className="inputBx">
                <input
                  type="submit"
                 value="Login"
                  disabled={Object.keys(errors).length > 0 && submitted}
              
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
