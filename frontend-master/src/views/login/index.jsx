import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SurgiNXTLogo, IITKGPLogo } from "../../assets";
import { AuthContext } from "../../contexts";
import "./style.scss";

export default function LoginViewWrapper() {
  const currentUser = useContext(AuthContext).currentUser;
  const login = useContext(AuthContext).login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [height, setHeight] = useState("100vh");
  const history = useHistory();

  useEffect(() => {
    function handleResize() {
      var body = document.body,
        html = document.documentElement;

      let h = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      setHeight(h);
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      console.log("TAKING TO DASHBOARD");
      //history.push("/dashboard/demo");
      console.log(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    // function isemailValid(email) {
    //   /*
    //     emails can only have:
    //     - Lowercase Letters (a-z)
    //     - Numbers (0-9)
    //     - Dots (.)
    //     - Underscores (_)
    //   */
    //   const res = /^[a-z0-9_\.]+$/.exec(email);
    //   const valid = !!res;
    //   return valid;
    // }
    // if ((isemailValid(email) && emailError !== "") || email === "") {
    // setEmailError("");
    // } else if (!isemailValid(email)) {
    //   setEmailError("email cannot contain any special symbols or spaces");
    // }
  }, [email]);

  useEffect(() => {
    function isPasswordValid(password) {
      /* 
        passwords can only have: 
        - Lowercase Letters (a-z) 
        - Numbers (0-9)
        - Dots (.)
        - Underscores (_)
      */
      if (password.length < 8) {
        setPasswordError("Your password must be at least 8 characters");
        return false;
      }

      if (password.search(/[a-z]/i) < 0) {
        setPasswordError(
          "Your password must contain at least one lowercase letter"
        );
        return false;
      }

      if (password.search(/[A-Z]+/) < 0) {
        setPasswordError(
          "Your password must contain at least one uppercase letter"
        );
        return false;
      }

      if (password.search(/[0-9]/) < 0) {
        setPasswordError("Your password must contain at least one number");
        return false;
      }

      // const res = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.exec(
      //   password
      // );
      // const valid = !!res;
      return true;
    }

    if ((isPasswordValid(password) && passwordError !== "") || email === "") {
      setPasswordError("");
    }
  }, [password]);

  const loginHandler = async () => {
    login(email, password);

    history.push("/dashboard/demo")
  };
  function registerHandler(){
    history.push("/register");
  }

  return (
    <div className="login__wrapper">
      <section className="form__section">
        <div className="logo__main">
          <img src={SurgiNXTLogo} alt="Surgi-NXT Logo" />
        </div>
        <div className="login__form">
          <div className="greeting">Welcome !</div>
          <div className="login__box">
            <div className="input__wrapper">
              <div className="label">Email Address</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="error">{emailError}</div>
            </div>
            <div className="input__wrapper">
              <div className="label">Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="error">{passwordError}</div>
            </div>

            <div className="forgot__pass">Forgot Password?</div>

            <div className="action__wrapper">
              <button className="login__btn" onClick={loginHandler}>
                Login
              </button>
            </div>

            <div className="message">Don't have an account?</div>
            <div className="register" onClick = {registerHandler} >Register</div>
          </div>
        </div>
      </section>

      <img src={IITKGPLogo} alt="IIT Kharagpur" className="iit__logo" />
    </div>
  );
}
