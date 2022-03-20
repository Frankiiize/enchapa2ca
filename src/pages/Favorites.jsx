import React, { useContext, useEffect } from "react";
import { favoritesContext } from "../context/favoritesContext";
import { ProductsCard } from "../components/ProductsCard.jsx";
import { SectionProducts } from "../layouts/SectionProducts.jsx";
import { ProductsList } from "../components/ProductsList.jsx";
import { productsContext } from "../context/productsContext";


const Favorites = () => {
  const { newProducts } = useContext(productsContext);
  const { favorites, favLoading, getFavorites } = useContext(favoritesContext);
  useEffect(async() => {
    await getFavorites();
  },[newProducts]);
 
  return ( 
    <>
      <h1>fav page</h1>
      
      <SectionProducts  sectionClass={"Products"} button={false}>
        <ProductsList 
          sectionClass={"Products__grid"} 
          products={favorites} 
          productsLoading={favLoading}  
        />
      </SectionProducts>
     
     
    </>
  );
}

export { Favorites }; 