import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
const useProviderAuth = () => {
  const auth = getAuth();
  const localstorageUserDb = JSON.parse(localStorage.getItem('userDataBase'))
  const [ userState, setUserState ] = useState({
    sinInUser: null,
    currentUser: null,
    userDataBase: localstorageUserDb,
  });
  const [ isAuth, setIsAuth ] = useState(false);
  console.log(localstorageUserDb)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && userState.userDataBase === null) {
        console.log('paso por userDataBase === undefined')
        setUserState({
          currentUser: user.auth.currentUser,
          userDataBase: getUserData(user.auth.currentUser),
        }),
        setIsAuth(true)
      }else if(user){
        console.log('hay userDataBase en localstorage ')
        setUserState({
          ...userState,
          currentUser: user.auth.currentUser,
        })
        setIsAuth(true)

      }
      else {
        setUserState({
          ...userState,
          currentUser:null
        }),
        setIsAuth(false)
        
      }
 
       
    })
  },[])

  const getUserData = async (user) => {
    console.log('getData')
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserState({
        currentUser: user,
        userDataBase: docSnap.data(),
      })
      localStorage.setItem('userDataBase', JSON.stringify(docSnap.data()) )
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
        getUserData(user)
        setIsAuth(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage})
      });
     
  }

  const logOut = async () => {
    try{
      await signOut(auth).then(() => {
        
        setIsAuth(false)
        console.log(auth)
        localStorage.removeItem('userDataBase')

      })
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