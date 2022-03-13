import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc , setDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
const useProviderAuth = () => {
  const auth = getAuth();
  const [ userState, setUserState ] = useState({
    currentUser: null,
    db:null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user ) {
       await getUserData(user);
        
      }
      else {
        setUserState({
          currentUser:null
        })
      }
      return () => {
        setUserState(null)
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
 
  const singIn = async (email, password,callback) => {
    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        getUserData(user)
      }).then(() =>{
        callback()
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
        console.log(auth)
        setUserState({
          currentUser: null,
        })
      })
    }
    catch(error){
      console.log(`ERROR ${error}`)
    }
  }
  const registerUser = async (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then( async (userCredential) => {
        // Signed in
        try {
        let {password,c_password,...dataToDb} = data;
      
        console.log(dataToDb)
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
    getUserData,
    registerUser,
    updateUserData
  }

}

export { useProviderAuth }; 