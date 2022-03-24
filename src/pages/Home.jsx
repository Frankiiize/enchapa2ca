import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../context/AuthContext.js";

import { Main } from "../layouts/Main.jsx";
import { Categories } from "../components/Categories.jsx";
import { SectionProducts } from "../layouts/SectionProducts.jsx";
import { Footer } from "../components/Footer.jsx";
import { Hero } from "../components/Hero.jsx";
import { SearchInput } from "../components/SearchInput.jsx";



import '../styles/pages/home.css'
import { ProductsList } from "../components/ProductsList.jsx";
import { productsContext } from "../context/productsContext.js";




const Home  = () => {
  /* const [ categories, setCategories ] = useState(categorias); */
  const { newProducts, getAvailableStock, productsLoading, searchOn, searchedProducts, handleSearch } = useContext(productsContext);
/*   useEffect(async () => {
     getAvailableStock();
  },[]); */


  
  
  return(
    <Main sectionClass={"main"}>
     <Hero />
     <SearchInput  
          handleSearch={handleSearch}
          placeholder={"buscar productos"}
        /> 

      {/* <Categories categories={categories} /> */}
      

      <SectionProducts  sectionClass={"Products"} button={false}>
        {
          !searchOn 
            ? <ProductsList 
              sectionClass={"Products__grid"} 
              products={newProducts} 
              productsLoading={productsLoading}  
            />
            : <ProductsList 
                sectionClass={"Products__grid"} 
                products={searchedProducts} 
                productsLoading={productsLoading}  
            />
        }
      </SectionProducts>
      
      <SectionProducts 
        sectionClass={'Products'} 
        title={'Nuevos Lanzamientos'} 
        button={true} 
        >
          <ProductsList 
            sectionClass={"Products__list"}  
            products={newProducts}  
            productsLoading={productsLoading}  
            arrowControls={true}
          />
      </SectionProducts>

      {/* <SectionProducts  title={'nuevos productos'} sectionClass={'Products'} button={true}>
        <ProductsList sectionClass={"Products__list"} products={[]} />
      </SectionProducts> */}
    
      <Footer/>
    </Main>
  )
};

export { Home };