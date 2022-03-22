import React, { useState, useContext, useEffect }  from "react";
import { doc, getDoc, arrayUnion, arrayRemove, updateDoc , setDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig'
import { authContext } from "../context/AuthContext";
import { productsContext } from "../context/productsContext";
import { async } from "@firebase/util";

const useFavorites = () => {
  const { userState } = useContext(authContext);
  const { newProducts } = useContext(productsContext);
  const [ favorites, setFavorites ] = useState([]);
  const [ favLoading, setFavLoading ] = useState(false);

  
  const getFavorites = async () => {
    try{
      setFavLoading(true)
      const docRef = doc(db, "favorites", userState?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
          const userFavs = [];
          const favorites = docSnap.data();
          favorites.favs.map((fav) => {
          const favsFound =  newProducts.filter((product) => product.id === fav);
          userFavs.push(favsFound)
        });

        setFavorites(userFavs.flat());
        setFavLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
 
      }
    }catch(error) {
      console.log(error.name)
      console.log(error.message)
    }
  }
  
  const addFavorites = async (product) => {
    const favoritesRef = doc(db, "favorites", userState.currentUser.uid);
    try{
      setFavorites([
        ...favorites,
        product
      ])
      await updateDoc(favoritesRef,{
        favs: arrayUnion(product.id)
      })
      console.log('añadr' + product.id)
    }catch(error){
      debugger
      console.log(error)
    }
  }


  const removeFavorites = async (product) =>{
    const favoritesRef = doc(db, "favorites", userState.currentUser.uid);
    try{
      setFavorites([
        favorites.filter((fav) => fav.id !== product.id )
      ])
      await updateDoc(favoritesRef, {
        favs: arrayRemove(product.id)
      })
      console.log('remove' + product.id)
    }catch(error){
      console.log(error)
    }



  }


 
  return {
    favorites,
    favLoading,
    getFavorites,
    addFavorites,
    removeFavorites
    
  }
}

export { useFavorites }; 