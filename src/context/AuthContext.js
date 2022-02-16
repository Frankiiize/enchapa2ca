import React, { createContext } from "react";
import { useProviderAuth } from "../hooks/useProviderAuth";

const authContext = createContext({});

const ProviderAuth = ({children}) => {
  const auth =  useProviderAuth();
  //debugger
  return ( 
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export { ProviderAuth, authContext } ;