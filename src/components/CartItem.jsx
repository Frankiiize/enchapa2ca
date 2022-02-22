import React, { useState } from "react";
import '../styles/components/cartItem.css'
import productFAKE from '../assets/images/produtcFAKE.jpg';
import { MdClose } from "react-icons/md";
import { ShopCartQuantityBtn } from "./ShopCartQuantityBtn.jsx";
const CartItem = ({handleCart, product, handleIncrement, cart, handleDecrement }) => {
  return(
    <div className="shopping-cart">
      <figure>
        <img src={product.img} alt='foto producto' />
      </figure>
      <div 
        className="shopping-cart__closeIcon"
        onClick={() => handleCart(product)}
        >
        <MdClose
          size={32}
          color={'gray'}
        />
      </div>

      <div className="shopping-cart__details">
        <p>{product.name}</p>
        <p>x<span>{ product.quantity}</span></p>
        <p>${product.price}</p>
      </div>
      
     <ShopCartQuantityBtn
        cart={cart}
        product={product}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
     />
    </div>
  )
}

export { CartItem }; 