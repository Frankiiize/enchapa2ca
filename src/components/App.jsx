import React from "react";
import {fireBaseApp} from '../services/firebaseConfig.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Header } from "./Header.jsx";
const App = () => {
  console.log(fireBaseApp)
  return(
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favoritos" element={<h1>FAVORITOS</h1>} />
            <Route path="/cart" element={<h1>CART</h1>} />
            <Route path="/login" element={<h1>Login</h1>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export { App };