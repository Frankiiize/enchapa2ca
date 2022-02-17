import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
const useProviderAuth = () => {
  const auth = getAuth();

  const [ userState, setUserState ] = useState({
    sinInUser: null,
    currentUser: null,
    userDataBase: null,
  });
  const [ isAuth, setIsAuth ] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user
        ? (
          setUserState({
            ...userState,
            currentUser: user.auth.currentUser,
            userDataBase: getUserData(user.auth.currentUser)
          }),
          setIsAuth(true)
          ) 
        : (
          setUserState({
            ...userState,
            currentUser:null
          }),
          setIsAuth(false)
          )
       
    })
  },[])
  console.log({db})

  const getUserData = async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserState({
          ...user,
          userDataBase: docSnap.data(),
        })
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  }
  

  const singIn = async (email, password) => {
    
   await signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserState({
          ...userState,
          sinInUser: user,
          currentUser: user,
        });
        return user;
      }).then( (user) => {
         getUserData(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage})
      });
     
  }

  const logOut = async () => {
    try{
      await signOut(auth);
      setIsAuth(false)
      console.log(auth)
    }
    catch(error){
      console.log(`ERROR ${error}`)
    }
  }
  
 
  
  return {
    userState,
    setUserState,
    singIn,
    logOut,
    isAuth,
    setIsAuth
  }

}

export { useProviderAuth }; 