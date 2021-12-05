import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import heading from "./heading.png";
import { AuthContext } from "../../contexts";
import "./style.scss";

export default function RegisterViewWrapper() {
  const currentUser = useContext(AuthContext).currentUser;
  const register = useContext(AuthContext).register;
  const [select, setSelect] = useState(null);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  function handleChange(event) {
    setSelect(event.target.value);
  }

  const registersubmit = async () => {
    register(email, password, firstname, lastname);
    //history.push("/login");
  };

  return (
    <div className="register__wrapper">
      
      <img src={heading} alt="heading" className="heading"></img>

      <div className="leftside">
        <div className="label">First Name</div>
        <input
         type="text"
         className="register__input"
         value = {firstname}
         onChange = {(e) => setFirstName(e.target.value)}></input>

        <div className="label">Email</div>
        <input
         type="email"
         className="register__input"
         value = {email}
         onChange = {(e) => setEmail(e.target.value)}></input>

        <div className="label">How would you describe yourself?</div>
        <select
          className="register__input"
          value={select}
          onChange={handleChange}
        >
          <option value="none" selected disabled hidden></option>
          <option value="student">Student</option>
          <option value="researcher">Researcher</option>
          <option value="engineer">Engineer</option>
          <option value="manager">Manager</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="surgeon">Surgeon</option>
          <option value="radiologist">Radiologist</option>
          <option value="others">Other Doctor</option>
        </select>

        <div
          className={
            select === "surgeon" ||
            select === "radiologist" ||
            select === "others"
              ? "extraoptions"
              : "extraoptions__hidden"
          }
        >
          <div className="label">Doctor Name</div>
          <input type="text" className="register__input"></input>

          <div className = "label">Browse By Year of Registration</div>
            <select className = "register__input" >
              <option value="none" selected disabled hidden ></option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
              <option>2014</option>
              <option>2013</option>
              <option>2012</option>
              <option>2011</option>
              <option>2010</option>
              <option>2009</option>
              <option>2008</option>
            </select>

        </div>

        <div className="label">Username</div>
        <input type="text" className="register__input" placeholder = {email} readOnly></input>

        <div className="label">Password</div>
        <input
         type="password"
         className="register__input"
         value = {password}
         onChange = {(e) => setPassword(e.target.value)}></input>
      </div>

      <div className="rightside">
        <div className="label">Last Name</div>
        <input
         type="text"
         className="register__input"
         value = {lastname}
         onChange = {(e) => setLastName(e.target.value)}></input>

        <div className="label">Profession</div>
        <input type="text" className="register__input"></input>

        <div className="label">
          How would you like to contribute to this platform?
        </div>
        <select className="register__input">
          <option value="none" selected disabled hidden></option>
          <option value="annotator">Annotator</option>
          <option value="airesearcher">AI Researcher</option>
          <option value="datauploader">Data Uploader</option>
          <option value="medicalcollaborator">Medical Collaborator</option>
          <option value="hospital">(hospital??)</option>
          <option value="noneoftheabove">None of the above</option>
        </select>

        <div
          className={
            select === "surgeon" ||
            select === "radiologist" ||
            select === "others"
              ? "extraoptions"
              : "extraoptions__hidden"
          }
        >
          <div className="label">Browse By Registrstion Number</div>
          <input type="text" className="register__input"></input>

          <div className = "label">State Medical Council</div>
            <select className = "register__input" >
              <option value="none" selected disabled hidden ></option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
              <option>2014</option>
              <option>2013</option>
              <option>2012</option>
              <option>2011</option>
              <option>2010</option>
              <option>2009</option>
              <option>2008</option>
            </select>

        </div>

        <div className="label">Confirm Password</div>
        <input type="password" className="register__input"></input>

        <button className="verify" onClick = {registersubmit} >Verify Using Email ID</button>

      </div>

      

      
    </div>
  );
}
