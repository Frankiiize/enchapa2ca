import React, { useCallback, useContext } from "react";
import '../styles/components/productCard.css'
import shoppingCart from '../assets/icons/shoppingCart.svg'
import { cartContex } from "../context/cartContext";


const ProductsCard = ({product}) => {
  const { cartState, dispatchCart } = useContext(cartContex);
  const handleCart = (item) => {
    item.add = true,
    dispatchCart({type:'ADD_TO_CART', payload: item})
  }
  console.log(cartState)
  return(
    <li className="Products__item" >
      <img className="Products__item-img" src={product.img}/>
      <h3>{product.name}</h3>
      <div className="Products__item-description">
        <span>precio</span>
        <span><span>$</span>{product.price}</span>
      </div>
      <button onClick={() => handleCart(product)}>
        <img className="Products__item-cart" src={shoppingCart} alt="shopping cart"/>
      </button> 
    </li>
  )

}

export { ProductsCard }; 