import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from "react-router-dom";


const useProviderAuth = () => {
  const [ user, setUser ] = useState(null);
  const [ isAuth, setIsAuth ] = useState(false);

  const auth = getAuth();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user
        ? (setUser(user.auth.currentUser),setIsAuth(true), console.log(user.auth.currentUser)) 
        : (setUser(null),setIsAuth(false))
       
    })
  },[isAuth])


  const singIn = async (email, password) => {
    try{
      const response = await signInWithEmailAndPassword(auth, email,password);
      const user = await response.userCredential.user
      setUser(user.auth.currentUser)
    }
    catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({errorCode, errorMessage})
    }
  
  }

  const logOut = async () => {
    try{
      const response = await signOut(auth);
      setIsAuth(false)
      console.log(auth)
    }
    catch(error){
      console.log(`ERROR ${error}`)
    }
  }
  return {
    user,
    setUser,
    singIn,
    logOut,
    isAuth,
    setIsAuth
  }

}

export { useProviderAuth }; 