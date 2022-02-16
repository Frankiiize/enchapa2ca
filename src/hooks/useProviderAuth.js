import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';


const useProviderAuth = () => {
  const [ user, setUser ] = useState(null);
  const auth = getAuth();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user 
        ? (setUser(user.auth.currentUser)) 
        : (setUser(null))
    })
  },[user])


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
    logOut
  }

}

export { useProviderAuth }; 