import React,{ useContext, useState} from "react";
//STYLES
import '../styles/pages/productDetails.css'
//----STYLES
import { useParams } from "react-router-dom";
import { ProductsCard } from "../components/ProductsCard.jsx";
import { productsContext } from "../context/productsContext";



const ProductDetails = () => {
  const { newProducts } = useContext(productsContext);
  const params = useParams();
  console.log(params.id)
  const detailProduct = newProducts.find(item => item.id === parseInt(params.id));
  console.log(detailProduct)
  return(
    <section className="productDetails">
      <ProductsCard 
        product={detailProduct}
      />
    </section>
  );
}

export { ProductDetails };