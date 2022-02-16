import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { useProviderAuth } from "../hooks/useProviderAuth";

const PrivateRoutes = ({children}) => {
  const { isAuth, user } = useContext(authContext);

  let location = useLocation()
  if(!isAuth){
    if(user === null){
      return <Navigate to="/login" state={{from:location}} replace />
    }
  }
  return children
}

export { PrivateRoutes };