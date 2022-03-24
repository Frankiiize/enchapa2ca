import React, { useEffect, useRef } from "react";
import { SkeletonProductGrid } from "./loaders/SkeletonProductGrid.jsx";
import { ProductsCard } from "./ProductsCard.jsx";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ProductsList = ({products, sectionClass, productsLoading, arrowControls = false}) => {

  const ulRef = useRef(null);
  const handleScrollRigth = () =>{
    console.log(ulRef)
    ulRef.current.scrollLeft += 250;
  }
  const handleScrollLeft = () => {
    ulRef.current.scrollLeft -= 250;
  }
  
  return(
    <>
    {
      productsLoading 
      ? <SkeletonProductGrid sectionSkeletonClass={`${sectionClass}-skeleton`} />
      : <ul ref={ulRef} className={sectionClass}>
          {products.map((product,index) => (
            <ProductsCard key={product.id ? product.id : product[index]} product={product} />
          ))}
      </ul>
    }
    {
      arrowControls &&
        <div className="Products__controls">
          <button className="Products__controls-left" onClick={handleScrollLeft}>
            <MdKeyboardArrowLeft  
              size={40} 
              color={"#4F4F4F"}
              />
          </button>
          <button  className="Products__controls-rigth" onClick={handleScrollRigth}>
            <MdKeyboardArrowRight  
              size={40} 
              color={"#4F4F4F"}
              />
          </button>
        </div>
    }
      
    </>
  )
}

export { ProductsList };