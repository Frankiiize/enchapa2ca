import React, { useContext, useState } from "react";
import { fireBaseApp }  from '../services/firebaseConfig.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "../components/Header.jsx";
import { PrivateRoutes, Redirect } from "../layouts/PrivateRoutes.js";
import { AdminRoutes } from "../layouts/PrivateRoutes.js";

//---CONTEXT-----//
import { ProviderAuth } from "../context/AuthContext.js";
import { CartProvider } from "../context/cartContext.js";
import { ProductsProvider } from "../context/productsContext.js";
import { BuyProvider } from "../context/buyContext.js";
import { AdminProvider } from "../context/adminContext.js";
import { FavoritesProvider } from "../context/favoritesContext.js";
//---CONTEXT-----//

//---PAGES-----//
import { PaySucess } from "../pages/PaySucess.jsx";
import { Adminpage } from "../pages/admin/AdminPage.jsx";
import { Home } from "../pages/Home.jsx";
import { CreateAccount } from "../pages/CreateAccount.jsx";
import { Login } from "../pages/Login.jsx";
import { PasswordRecovery } from "../pages/PasswordRecovery.jsx";
import { Profile } from "../pages/Profile.jsx";
import { ProductDetails } from "../pages/ProductDetails.jsx";
import { Checkout } from "../pages/Checkout.jsx";
import { OrderHistory } from "../pages/OrderHistory.jsx";
import { Favorites } from "../pages/Favorites.jsx";
//---PAGES-----//


const App = () => {
  return(
    <>
    <ProductsProvider>
      <ProviderAuth>
        <CartProvider>
        <BuyProvider>
        <AdminProvider>
        <FavoritesProvider>
            <BrowserRouter>
              <Header/>
                <Routes>
                  <Route path="/" >
                    <Route index element={<Home/>} />
                    <Route path="/detalles/:id" element={<ProductDetails />}/>
                  </Route>
                  <Route path="/createAccount" element={<CreateAccount/>} />
                  <Route path="/login" element={
                    <Redirect>
                      <Login/>
                    </Redirect>
                  } />
                  <Route path="/recuperarCuenta" element={<PasswordRecovery/>}/>

                  
                  <Route path="/checkout" > 
                    <Route index element={<Checkout />} />
                    <Route path="checkoutSucess" element={ <PaySucess /> }/>
                  </Route>
                  
                  
                  <Route path="/favoritos" element={
                    <PrivateRoutes>
                      <Favorites />
                    </PrivateRoutes>
                  }/>

                  <Route path="/carrito" element={
                    <PrivateRoutes>
                      <h1>cart</h1>
                    </PrivateRoutes>
                  } />
                  
                  <Route path="/perfil">
                      <Route index element={ 
                        <PrivateRoutes> 
                          <Profile/> 
                        </PrivateRoutes>
                      }/>
                      <Route path="historialOrdenes" element={
                        <PrivateRoutes>
                          <OrderHistory/> 
                        </PrivateRoutes>
                      }/>
                  </Route>
            
                
                  <Route path="/adminEnchapados" element={
                      <AdminRoutes>
                        <Adminpage />
                      </AdminRoutes>
                  }/>

                  <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                </Routes>
            </BrowserRouter>
        </FavoritesProvider>
        </AdminProvider>
        </BuyProvider>
        </CartProvider>
      </ProviderAuth>
    </ProductsProvider>
    </>
  )
}

export { App };