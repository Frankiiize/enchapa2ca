import React from "react";
import '../styles/components/productCard.css'
import shoppingCart from '../assets/icons/shoppingCart.svg'


const ProductsCard = ({product}) => {
  return(
    <li className="Products__item" >
      <img className="Products__item-img" src={product.img}/>
      <h3>{product.name}</h3>
      <div className="Products__item-description">
        <span>precio</span>
        <span><span>$</span>{product.price}</span>
      </div> 
      <img className="Products__item-cart" src={shoppingCart} alt="shopping cart"/>
    </li>
  )

}

export { ProductsCard }; 