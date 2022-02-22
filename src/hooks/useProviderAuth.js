import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc , setDoc } from "firebase/firestore";
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
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const datos = {
          ...userState,
          currentUser:user,
          db: docSnap.data()
        }
        setUserState(datos)
        localStorage.setItem('userDb', JSON.stringify(datos))
        
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
  const registerUser = async (data) => {
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then( async (userCredential) => {
        // Signed in
        try {
        const dataToDb = {...data}
        dataToDb.c_password = false;
        const user = userCredential.user;
        const docRef = await setDoc(doc(db, "users", user.uid), dataToDb);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
   
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage})
        // ..
      });
  }
  const updateUserData = async (data) => {
    const userDataBaseRef = doc(db, "users", userState.currentUser.uid);
    debugger
    // Set the "capital" field of the city 'DC'
    await updateDoc(userDataBaseRef, {
      name: data.name,
      lastName:data.lastName ,
      phone: data.phone ,
      address: data.address 
    });
  }
 
  
  return {
    userState,
    setUserState,
    singIn,
    logOut,
    isAuth,
    setIsAuth,
    getUserData,
    registerUser,
    updateUserData
  }

}

export { useProviderAuth }; 