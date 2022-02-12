import React from "react";
import {fireBaseApp} from '../services/firebaseConfig.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Header } from "./Header.jsx";
import { CreateAccount } from "../pages/CreateAccount.jsx";
import { Login } from "../pages/Login.jsx";

const App = () => {
  return(
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createAccount" element={<CreateAccount/>} />
            <Route path="/login" element={<Login/>} />

            <Route path="/favorites" element={<h1>FAVORITOS</h1>}/>
            <Route path="/cart" element={<h1>CART</h1>} />

            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export { App };