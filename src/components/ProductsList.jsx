import React from "react";
import { LoaderElipsis } from "./loaders/loaderElipsis.jsx";
import { ProductsCard } from "./ProductsCard.jsx";

const ProductsList = ({products, sectionClass, productsLoading}) => {
  return(
    <>
    {
      productsLoading 
      ? <LoaderElipsis />
      : <ul className={sectionClass}>
          {products.map((product,index) => (
            <ProductsCard key={product.id ? product.id : product[index]} product={product} />
          ))}
      </ul>
    }
      
    </>
  )
}

export { ProductsList };