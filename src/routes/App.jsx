import React, { useContext, useState } from "react";
import {fireBaseApp} from '../services/firebaseConfig.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Header } from "../components/Header.jsx";
import { CreateAccount } from "../pages/CreateAccount.jsx";
import { Login } from "../pages/Login.jsx";
import { ProviderAuth } from "../context/AuthContext.js";
import { Nav } from "../components/Nav.jsx";
import { PasswordRecovery } from "../pages/PasswordRecovery.jsx";
import { useApiCountries } from "../hooks/useApiCountries.js";

const App = () => {
  return(
    <>
    <ProviderAuth>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createAccount" element={<CreateAccount/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/recuperarCuenta" element={<PasswordRecovery/>}/>
 
 
            <Route path="/favorites" element={<h1>FAVORITOS</h1>}/>
            <Route path="/cart" element={<h1>CART</h1>} />

            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
          </Routes>
         <Nav/> 
      </BrowserRouter>
    </ProviderAuth>
    </>
  )
}

export { App };