import React, { useState, useContext, useEffect }  from "react";
import { doc, getDoc, updateDoc , setDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import { authContext } from "../context/AuthContext";

const useFavorites = () => {
  const { userState } = useContext(authContext);
  const [ favorites, setFavorites ] = useState([]);
  const [ favLoading, setFavLoading ] = useState(false);



  const UpdateFavorites = async (favorito) => {
    setFavLoading(true);
    const { id } = favorito;
    const userDataBaseRef = doc(db, "users", userState.currentUser.uid);
    try{
      await updateDoc(userDataBaseRef,{
        favorites: [id]
      }).then(() => {
        setFavLoading(false);
      })
    }catch(error){
      console.log(error);
    }

  }

  const handleAddFav = async (product) => {
    setFavorites([
      ...favorites,
      product,
    ])
   
  }
  console.log(favorites)
  return {
    favorites,
    setFavorites,
    handleAddFav,
    favLoading
  }
}

export { useFavorites }; 