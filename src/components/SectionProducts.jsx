import React from "react";
import { ProductsList } from "./ProductsList.jsx";
import '../styles/components/ProductList.css'

const SectionProducts = ({products, title}) => {
  return(
    <section className="Products">
      <div className="Products__title">
        <h2>{title}</h2>
        <button>ver todos</button>
      </div>
      <ProductsList newProducts={products} /> 
  </section>
  )
}

export { SectionProducts };