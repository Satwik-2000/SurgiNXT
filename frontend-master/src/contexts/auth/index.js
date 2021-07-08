import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(username, email, password) {}

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
      });
  }

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
        signup: signup,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
