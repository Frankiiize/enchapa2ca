import React, { useContext, useState } from "react";
import { fireBaseApp }  from '../services/firebaseConfig.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home.jsx";
import { Header } from "../components/Header.jsx";
import { CreateAccount } from "../pages/CreateAccount.jsx";
import { Login } from "../pages/Login.jsx";
import { ProviderAuth } from "../context/AuthContext.js";
import { PasswordRecovery } from "../pages/PasswordRecovery.jsx";
import { PrivateRoutes, Redirect } from "../layouts/PrivateRoutes.js";
import { AdminRoutes } from "../layouts/PrivateRoutes.js";
import { Profile } from "../pages/Profile.jsx";
import { CartProvider } from "../context/cartContext.js";
import { ProductDetails } from "../pages/ProductDetails.jsx";
import { ProductsProvider } from "../context/productsContext.js";
import { Checkout } from "../pages/Checkout.jsx";
import { PaySucess } from "../pages/PaySucess.jsx";
import { BuyProvider } from "../context/buyContext.js";
import { OrderHistory } from "../pages/OrderHistory.jsx";
import { Adminpage } from "../pages/admin/AdminPage.jsx";
import { AdminProvider } from "../context/adminContext.js";
import { MyCart } from "../components/MyCart.jsx";

const App = () => {
  return(
    <>
    <ProductsProvider>
      <ProviderAuth>
        <CartProvider>
        <BuyProvider>
        <AdminProvider>
            <BrowserRouter>
              <Header/>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/createAccount" element={<CreateAccount/>} />
                  <Route path="/login" element={
                    <Redirect>
                      <Login/>
                    </Redirect>
                  } />
                  <Route path="/recuperarCuenta" element={<PasswordRecovery/>}/>
                  <Route path="/detalles/:id" element={<ProductDetails />}/>

                  
                  <Route path="/checkout" > 
                    <Route index element={<Checkout />} />
                    <Route path="checkoutSucess" element={ <PaySucess /> }/>
                  </Route>
                  
                  
                  <Route path="/favoritos" element={
                    <PrivateRoutes>
                      <h1>favos</h1>
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
        </AdminProvider>
        </BuyProvider>
        </CartProvider>
      </ProviderAuth>
    </ProductsProvider>
    </>
  )
}

export { App };