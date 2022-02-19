import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
const useProviderAuth = () => {
  const auth = getAuth();
  const [ userState, setUserState ] = useState({
    sinInUser: null,
    currentUser: null,
    userDB: null,
  });
  const [ isAuth, setIsAuth ] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user ) {
        setUserState({
          currentUser: user.auth.currentUser,
          db: getUserData(user.auth.currentUser)
        }),
        
        setIsAuth(true)
      }
      else {
        setUserState({
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
        console.log(docSnap.data()) 
        setUserState({
          ...userState,
          currentUser:user,
          db: docSnap.data()
        })
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  
    }
 


  

  const singIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(dataDb)
        setUserState({
          sinInUser: user,
          currentUser: user,
          userDB: getUserData(user)
        });
       
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
        setUserState({
          sinInUser: null,
          currentUser: null,
        })
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
    setIsAuth,
    getUserData
  }

}

export { useProviderAuth }; 