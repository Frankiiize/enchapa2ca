import React, { createContext } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useProviderAuth } from "../hooks/useProviderAuth";

const adminContext = createContext({});

const AdminProvider = ({children}) => {
  const adminFuncs =  useAdmin();
  //debugger
  return ( 
    <adminContext.Provider value={adminFuncs}>
      {children}
    </adminContext.Provider>
  )
}

export { AdminProvider, adminContext } ;