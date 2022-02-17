import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const PrivateRoutes = ({children}) => {
  const { isAuth, userState } = useContext(authContext);
  

  let location = useLocation()
  if(!isAuth){
    if(userState.currentUser === null ){
      return <Navigate to="/login" state={{from:location}} replace />
    }
  }
  if(isAuth){
    return children
  }
}

export { PrivateRoutes };