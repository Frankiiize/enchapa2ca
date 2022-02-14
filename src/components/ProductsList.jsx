import React from "react";
import { ProductsCard } from "./ProductsCard.jsx";

const ProductsList = ({products, sectionClass}) => {
  return(
      <ul className={sectionClass}>
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
      </ul>
  )
}

export { ProductsList };