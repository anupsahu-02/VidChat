import { children, createContext, useContext, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:3000/api/v1/users"
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState();
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      } 
    } catch (e) {
        console.log(e)
      throw e;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      } 
    } catch (e) {
      throw e;
    }
  };

  const data = {
    userData: userData,
    setUserData: setUserData,
    handleLogin: handleLogin,
    handleRegister: handleRegister,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
