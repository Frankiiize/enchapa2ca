import React, { createContext, useContext } from "react";
import { useBuy } from "../hooks/useBuy";

const buyContext = createContext({});

const BuyProvider = ({children}) => {
  const buy = useBuy();
  return(
    <buyContext.Provider value={buy}>
      {children}
    </buyContext.Provider>
  )
}

export { BuyProvider, buyContext };