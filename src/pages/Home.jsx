import React, { useContext } from "react";

import { Header } from "../components/Header.jsx";
import { authContext } from "../context/AuthContext.js";

const Home  = () => {
  const { logOut } = useContext(authContext);
  //LOGOUTH REMOVER BOTTON
  const handleLogOut = () => {
    logOut();
  }
  //LOGOUTH REMOVER BOTTON
  return(
    <>
      <h1>home</h1>
      <p>Te va a salir en 2000 dolaritos la pagina :D</p>
      <button onClick={handleLogOut}>salir</button>
    </>
  )
};

export { Home };