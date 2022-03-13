import React, { createContext } from "react";
import { useFavorites } from "../hooks/useFavorites";

const favoritesContext = createContext({});

const FavoritesProvider = ({children}) => {
  const favorites = useFavorites()
  return ( 
    <favoritesContext.Provider value={favorites}>
      {children}
    </favoritesContext.Provider>
  )
}

export { FavoritesProvider, favoritesContext } ;