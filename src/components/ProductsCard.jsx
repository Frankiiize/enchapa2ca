import React, { useCallback, useContext } from "react";
import '../styles/components/productCard.css'
import shoppingCart from '../assets/icons/shoppingCart.svg'
import { cartContex } from "../context/cartContext";


const ProductsCard = ({product}) => {
  const { handleCart } = useContext(cartContex);
  

  return(
    <li className="Products__item" >
      <img className="Products__item-img" src={product.img}/>
      <h3>{product.name}</h3>
      <div className="Products__item-description">
        <div className="Products__item-descriptionDetails">
          <span>precio</span>
          <span>${product.price}</span>
        </div>
        <p>{product.description}</p>
      </div>
      <button onClick={() => handleCart({...product})}>
        <img className="Products__item-cart" src={shoppingCart} alt="shopping cart"/>
      </button> 
    </li>
  )

}

export { ProductsCard }; 