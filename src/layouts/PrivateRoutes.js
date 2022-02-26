import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const PrivateRoutes = ({children}) => {
  const { userState } =  useContext(authContext);
  let location = useLocation()
  
  if(userState.currentUser === null ){
    return <Navigate to="/login" state={{from:location}} replace />
  }
  return <>{children}</>

  
}
const Redirect = ({children}) => {
  const { userState } =  useContext(authContext);
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  if(userState.currentUser){
    return <Navigate to={from} state={{from:location}} replace />
  }
  return <>{children}</>

  
}


const AdminRoutes = ({children}) => {
  const { userState } = useContext(authContext);
  let location = useLocation()
    if(userState.currentUser !== null ){
      if(userState.db.admin){
        return <>{children}</>
      }else {
        return <Navigate to={location} state={{from:location}} replace />

      }
    }else {

      return <Navigate to='/' replace />
    }

  
  

    
    /*   try {
        debugger
        if(!userState.loading && !userState.db.admin ){
          return <Navigate to="/" state={{from:location}} replace />
        }
        else{
          return children
        }
      }catch(error){
        console.log(error)
        return <Navigate to="/"  replace />
      } */

  
}

export { PrivateRoutes, AdminRoutes, Redirect };