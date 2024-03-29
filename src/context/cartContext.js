import React, { createContext } from "react";
import { useCart } from "../hooks/useCart";
import { useProviderAuth } from "../hooks/useProviderAuth";

const cartContex = createContext({});

const CartProvider = ({children}) => {
  const cart = useCart();
  return ( 
    <cartContex.Provider value={cart}>
      {children}
    </cartContex.Provider>
  )
}

export { CartProvider, cartContex } ;