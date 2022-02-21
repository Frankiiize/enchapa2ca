import React, {createContext} from "react";
import { useGetProducts } from "../hooks/useGetProducts";


const productsContext = createContext({});

const ProductsProvider  = ({children}) => {
 
  const getProducts = useGetProducts()
  return(
    <productsContext.Provider value = {getProducts}
    >
      {children}
    </productsContext.Provider>
  );
}

export  { ProductsProvider , productsContext }; 