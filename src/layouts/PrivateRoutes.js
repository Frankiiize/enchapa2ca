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
  return children

  
}


const AdminRoutes = ({children}) => {
  const { userState } = useContext(authContext);
    let location = useLocation()
    if(!userState.userDataBase.admin){
      return <Navigate to="/" state={{from:location}} replace />
    }
    else{

      return children
    }
  

  
}

export { PrivateRoutes, AdminRoutes };