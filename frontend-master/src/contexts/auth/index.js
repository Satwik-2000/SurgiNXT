import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function show(id, caseName){
    console.log(id, caseName);
    axios
        .post(
          `${process.env.REACT_APP_API}/users/Registercase`,{
            user_uuid: id,
            case_name_entered_by_user : caseName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((e) => {
          console.log(e);
          //setCurrentUser(e.data);
        });
  }

  async function register(email, password, firstname, lastname){
    axios.post("http://203.110.240.168/api/surginxt/user/registration",{
      email: email,
      password : password,
      first_name: firstname,
      last_name: lastname,
    })
    .then((e) => {
      console.log("AXIOS:", e);
      // localStorage.setItem("auth_token", e.data?.token);
      // localStorage.setItem("user_id", e.data?.id);
      console.log(e.config.data);
    })
  }

  async function login(email, password) {
    axios
      .post(process.env.REACT_APP_API + "/login", {
        email: email,
        password: password,
      })
      .then((e) => {
        console.log("AXIOS:", e);
        localStorage.setItem("auth_token", e.data?.token);
        localStorage.setItem("user_id", e.data?.id);
        setCurrentUser(e.data);
        console.log(currentUser);
      });
  }
  //console.log(currentUser.UserDetails["group"]);

  async function logout() {}

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    // setCurrentUser();
    if (currentUser === null && loading) {
      checkLogin();
    }

    // });

    // return unsubscribe;
  }, []);

  const checkLogin = async () => {
    if (
      localStorage.getItem("auth_token") !== null &&
      localStorage.getItem("user_id") !== null
    ) {
      axios
        .get(
          `${process.env.REACT_APP_API}/users/${localStorage.getItem(
            "user_id"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((e) => {
          console.log(e.data);
          setCurrentUser(e.data);
        });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        login: login,
        register: register,
        show: show,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
