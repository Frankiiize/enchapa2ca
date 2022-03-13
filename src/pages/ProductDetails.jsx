import React,{ useContext, useState} from "react";
//STYLES
import '../styles/pages/productDetails.css'
//----STYLES
import { Navigate, useParams } from "react-router-dom";
import { ProducDetailsCard } from "../components/ProducDetailsCard.jsx";
import { productsContext } from "../context/productsContext";
import { Main } from "../layouts/Main.jsx";



const ProductDetails = () => {
  const { newProducts } = useContext(productsContext);
  const params = useParams();
  console.log(params.id)
  const detailProduct = newProducts.find(item => item.id === params.id);
  console.log(detailProduct)
  if(!detailProduct){
    const [ detailsPersintence, setDetailsPersintence ] = useState(JSON.parse(localStorage.getItem('detailsProduct')))
    return (
    <Main sectionClass={"main-userOn"}>
      <section className="productDetails">
        <ProducDetailsCard 
          product={detailsPersintence}
        />
      </section>
    </Main>
    )
  }
  return(
    <Main sectionClass={"main-userOn"}>
      <section className="productDetails">
        <ProducDetailsCard 
          product={detailProduct}
        />
      </section>
    </Main>
  );
}

export { ProductDetails };